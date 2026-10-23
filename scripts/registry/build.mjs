import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { collectSourceFiles, exportIndex, sourcePackages } from "./lib/collect.mjs";
import { demoDescriptions } from "./lib/descriptions.mjs";
import { skillItem } from "./lib/items/skill.mjs";
import { themeItem } from "./lib/items/theme.mjs";
import { pageBundles } from "./lib/page-bundles.mjs";
import { rewriteSource } from "./lib/rewrite.mjs";
import { versionResolver } from "./lib/versions.mjs";

const root = new URL("../..", import.meta.url).pathname;
const outDir = join(root, "apps/design/public/r");
const baseUrl = (process.env.REGISTRY_BASE_URL ?? "https://design.locusgraph.com").replace(
  /\/$/,
  ""
);
const schema = "https://ui.shadcn.com/schema/registry-item.json";

const minorWords = new Set(["and", "or", "of", "to", "in", "on", "for", "with"]);

const titleWord = (word, position) =>
  position > 0 && minorWords.has(word) ? word : word.charAt(0).toUpperCase() + word.slice(1);

const titleOf = (name) => name.split("-").map(titleWord).join(" ");

function buildItems() {
  const files = collectSourceFiles(root);
  const filesByPath = new Map(files.map((file) => [file.path, file]));
  const exportsByPackage = exportIndex(files);
  const versionOf = versionResolver(root, sourcePackages);
  const descriptions = demoDescriptions(root);
  const items = files.map((file) => {
    const { content, needs } = rewriteSource(file, filesByPath, exportsByPackage);
    const extension = file.path.endsWith(".tsx") ? "tsx" : "ts";
    const registryDependencies = [
      ...(needs.utils ? ["utils"] : []),
      `${baseUrl}/r/theme.json`,
      ...[...needs.items].sort().map((name) => `${baseUrl}/r/${name}.json`),
    ];
    return {
      $schema: schema,
      name: file.name,
      type: "registry:component",
      title: titleOf(file.name),
      description:
        descriptions.get(file.name) ??
        `${titleOf(file.name)} from @locusgraph/${file.packageName}.`,
      dependencies: [...needs.npm].sort().map(versionOf),
      registryDependencies,
      files: [
        {
          path: `locus/${file.packageName}/${file.relativePath}`,
          type: "registry:component",
          target: `@components/locus/${file.name}.${extension}`,
          content,
        },
      ],
      categories: [file.packageName],
    };
  });
  const bundles = pageBundles(root, exportsByPackage, new Set(items.map((item) => item.name))).map(
    (bundle) => ({
      $schema: schema,
      name: bundle.name,
      type: "registry:item",
      title: titleOf(bundle.name),
      description:
        descriptions.get(bundle.name) ?? `Everything the ${titleOf(bundle.name)} page uses.`,
      registryDependencies: [
        `${baseUrl}/r/theme.json`,
        ...bundle.items.map((name) => `${baseUrl}/r/${name}.json`),
      ],
      files: [],
      categories: ["page"],
    })
  );
  return [
    { $schema: schema, ...themeItem(root, versionOf) },
    { $schema: schema, ...skillItem(root, baseUrl) },
    ...items,
    ...bundles,
  ];
}

function catalogEntry(item) {
  const { $schema: _schema, files, ...rest } = item;
  return { ...rest, files: files.map(({ content: _content, ...file }) => file) };
}

const items = buildItems();
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
for (const item of items)
  writeFileSync(join(outDir, `${item.name}.json`), `${JSON.stringify(item, null, 2)}\n`);
const catalog = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "locus",
  homepage: baseUrl,
  items: items.map(catalogEntry),
};
writeFileSync(join(outDir, "registry.json"), `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`registry: ${items.length} items in ${outDir}`);

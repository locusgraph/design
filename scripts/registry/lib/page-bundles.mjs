import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

const packageNames = new Map([
  ["@locusgraph/components", "components"],
  ["@locusgraph/blocks", "blocks"],
  ["@locusgraph/loop", "loop"],
  ["@locusgraph/brand", "brand"],
  ["@locusgraph/utils", "utils"],
]);
const packageImport = /import\s+(?:type\s+)?\{([^}]*)\}\s+from\s+"(@locusgraph\/[a-z-]+)";/g;

function demoFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === "brand" ? [] : demoFiles(path);
    return entry.name.endsWith(".demo.tsx") ? [path] : [];
  });
}

function importedItems(source, exportsByPackage) {
  const items = new Set();
  for (const [, clause = "", specifier = ""] of source.matchAll(packageImport)) {
    const names = exportsByPackage.get(packageNames.get(specifier) ?? "") ?? new Map();
    for (const part of clause.split(",")) {
      const name = part
        .replace(/^\s*type\s+/, "")
        .split(/\s+as\s+/)[0]
        ?.trim();
      if (name && names.has(name)) items.add(names.get(name));
    }
  }
  return items;
}

export function pageBundles(root, exportsByPackage, existingNames) {
  const bundles = [];
  for (const file of demoFiles(join(root, "apps/design/src/demos"))) {
    const name = basename(file, ".demo.tsx");
    if (existingNames.has(name)) continue;
    const items = importedItems(readFileSync(file, "utf8"), exportsByPackage);
    if (items.size > 0) bundles.push({ name, items: [...items].sort() });
  }
  return bundles;
}

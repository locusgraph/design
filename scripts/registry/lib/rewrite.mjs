import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const internalPackages = new Map([
  ["@locusgraph/components", "components"],
  ["@locusgraph/utils", "utils"],
  ["@locusgraph/brand", "brand"],
  ["@locusgraph/blocks", "blocks"],
  ["@locusgraph/loop", "loop"],
]);
const platformPackages = new Set(["react", "react-dom"]);
const fromStatement = /^(import|export)(\s+type)?\s+([\s\S]*?)\s+from\s+"([^"]+)";/gm;
export const itemImportBase = "@/components/locus";

function resolveRelative(fromFile, specifier) {
  const base = resolve(dirname(fromFile), specifier);
  const candidates = [`${base}.ts`, `${base}.tsx`, `${base}/index.ts`, base];
  return candidates.find((candidate) => existsSync(candidate) && /\.(ts|tsx)$/.test(candidate));
}

function isLocalCn(path) {
  return path?.endsWith("packages/components/src/cn/index.ts") ?? false;
}

function npmPackageOf(specifier) {
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

function splitSpecifiers(clause) {
  return clause
    .replace(/^\{|\}$/g, "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function importedName(specifier) {
  return specifier
    .replace(/^type\s+/, "")
    .split(/\s+as\s+/)[0]
    .trim();
}

function rewriteInternalImport(keyword, typeOnly, clause, packageName, exportsByPackage, needs) {
  const names = exportsByPackage.get(packageName) ?? new Map();
  const groups = new Map();
  for (const specifier of splitSpecifiers(clause.trim())) {
    const name = importedName(specifier);
    const target = name === "cn" ? "@/lib/utils" : `${itemImportBase}/${names.get(name)}`;
    if (name === "cn") needs.utils = true;
    else if (names.has(name)) needs.items.add(names.get(name));
    else throw new Error(`${packageName} does not export ${name}`);
    groups.set(target, [...(groups.get(target) ?? []), specifier]);
  }
  return [...groups]
    .map(([target, list]) => `${keyword}${typeOnly ?? ""} { ${list.join(", ")} } from "${target}";`)
    .join("\n");
}

export function rewriteSource(file, filesByPath, exportsByPackage) {
  const needs = { items: new Set(), npm: new Set(), utils: false };
  const content = file.source.replace(
    fromStatement,
    (statement, keyword, typeOnly, clause, specifier) => {
      if (specifier.startsWith(".")) {
        const resolved = resolveRelative(file.path, specifier);
        if (isLocalCn(resolved)) {
          needs.utils = true;
          return `${keyword}${typeOnly ?? ""} ${clause} from "@/lib/utils";`;
        }
        const target = filesByPath.get(resolved);
        if (!target) throw new Error(`${file.path}: cannot resolve ${specifier}`);
        needs.items.add(target.name);
        return `${keyword}${typeOnly ?? ""} ${clause} from "${itemImportBase}/${target.name}";`;
      }
      if (specifier === "cn") {
        needs.utils = true;
        return `${keyword}${typeOnly ?? ""} ${clause} from "@/lib/utils";`;
      }
      const internal = internalPackages.get(specifier);
      if (internal) {
        return rewriteInternalImport(keyword, typeOnly, clause, internal, exportsByPackage, needs);
      }
      const npmPackage = npmPackageOf(specifier);
      if (!platformPackages.has(npmPackage)) needs.npm.add(npmPackage);
      return statement;
    }
  );
  needs.items.delete(file.name);
  return { content, needs };
}

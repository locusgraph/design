import { readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";

export const sourcePackages = ["utils", "brand", "components", "blocks", "loop"];

function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === "tests" ? [] : sourceFiles(path);
    const isSource = /\.(ts|tsx)$/.test(entry.name) && !/\.d\.ts$/.test(entry.name);
    return isSource && entry.name !== "index.ts" ? [path] : [];
  });
}

function kebabName(path) {
  return basename(path).replace(/\.(ts|tsx)$/, "");
}

function uniqueNames(files) {
  const counts = new Map();
  for (const file of files)
    counts.set(kebabName(file.path), (counts.get(kebabName(file.path)) ?? 0) + 1);
  const taken = new Set();
  for (const file of files) {
    const base = kebabName(file.path);
    const folder = dirname(file.relativePath).replaceAll("/", "-");
    const prefix = folder === "." ? file.packageName : folder;
    let name = counts.get(base) > 1 ? `${prefix}-${base}` : base;
    if (taken.has(name)) name = `${file.packageName}-${name}`;
    taken.add(name);
    file.name = name;
  }
}

const definition =
  /export\s+(?:default\s+)?(?:declare\s+)?(?:async\s+)?(?:function|const|let|class|type|interface|enum)\s+([A-Za-z_$][\w$]*)/g;
const namedExports = /export\s+(?:type\s+)?\{([^}]*)\}(?!\s*from)/g;

export function definedExports(source) {
  const names = [...source.matchAll(definition)].map((match) => match[1]);
  for (const match of source.matchAll(namedExports)) {
    for (const part of match[1].split(",")) {
      const alias = part
        .replace(/^\s*type\s+/, "")
        .split(/\s+as\s+/)
        .pop()
        ?.trim();
      if (alias) names.push(alias);
    }
  }
  return names;
}

export function collectSourceFiles(root) {
  const files = sourcePackages.flatMap((packageName) => {
    const srcDir = join(root, "packages", packageName, "src");
    return sourceFiles(srcDir).map((path) => ({
      packageName,
      path,
      relativePath: relative(srcDir, path),
      source: readFileSync(path, "utf8"),
    }));
  });
  uniqueNames(files);
  return files;
}

export function exportIndex(files) {
  const byPackage = new Map();
  for (const file of files) {
    const names = byPackage.get(file.packageName) ?? new Map();
    for (const name of definedExports(file.source))
      if (!names.has(name)) names.set(name, file.name);
    byPackage.set(file.packageName, names);
  }
  return byPackage;
}

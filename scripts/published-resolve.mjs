import { readFileSync } from "node:fs";

const scope = /^@locusgraph\/([a-z-]+)(\/.+)?$/;

function publishedTarget(folder, subpath) {
  const manifestUrl = new URL(`../packages/${folder}/package.json`, import.meta.url);
  const exportsMap = JSON.parse(readFileSync(manifestUrl, "utf8")).publishConfig?.exports ?? {};
  const entry = exportsMap[subpath ? `.${subpath}` : "."];
  const file = typeof entry === "string" ? entry : entry?.default;
  return file ? new URL(file, manifestUrl).href : null;
}

export async function resolve(specifier, context, nextResolve) {
  const match = specifier.match(scope);
  const target = match ? publishedTarget(match[1], match[2]) : null;
  return target ? { url: target, shortCircuit: true } : nextResolve(specifier, context);
}

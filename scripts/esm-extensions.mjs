import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const relativeSpecifier = /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(["'])(\.{1,2}\/[^"']+)\2/g;
const alreadySpecified = /\.(m?js|cjs|json|css)$/;

function fullySpecified(file, specifier) {
  if (alreadySpecified.test(specifier)) return specifier;
  const target = resolve(dirname(file), specifier);
  if (existsSync(`${target}.js`)) return `${specifier}.js`;
  if (existsSync(join(target, "index.js"))) return `${specifier}/index.js`;
  throw new Error(`${file}: cannot resolve ${specifier}`);
}

function builtFiles(folder) {
  return readdirSync(folder).flatMap((name) => {
    const path = join(folder, name);
    if (statSync(path).isDirectory()) return builtFiles(path);
    return path.endsWith(".js") || path.endsWith(".d.ts") ? [path] : [];
  });
}

const dist = resolve(process.argv[2] ?? "dist");
let rewritten = 0;
for (const file of builtFiles(dist)) {
  const source = readFileSync(file, "utf8");
  const output = source.replace(
    relativeSpecifier,
    (_match, keyword, quote, specifier) =>
      `${keyword}${quote}${fullySpecified(file, specifier)}${quote}`
  );
  if (output !== source) {
    writeFileSync(file, output);
    rewritten += 1;
  }
}
console.log(`esm-extensions: ${rewritten} files in ${dist}`);

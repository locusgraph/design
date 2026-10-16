import { readFileSync } from "node:fs";
import { join } from "node:path";

function catalogVersions(root) {
  const yaml = readFileSync(join(root, "pnpm-workspace.yaml"), "utf8");
  const block = yaml.split(/^catalog:\s*$/m)[1]?.split(/^\S/m)[0] ?? "";
  const versions = new Map();
  for (const line of block.split("\n")) {
    const match = line.match(/^\s+"?([^":]+(?::[^":]+)?)"?:\s*(\S+)/);
    if (match) versions.set(match[1], match[2]);
  }
  return versions;
}

function declaredVersions(root, packages) {
  const declared = new Map();
  for (const packageName of packages) {
    const manifest = JSON.parse(
      readFileSync(join(root, "packages", packageName, "package.json"), "utf8")
    );
    for (const field of ["dependencies", "peerDependencies", "devDependencies"]) {
      for (const [name, range] of Object.entries(manifest[field] ?? {})) {
        if (!declared.has(name)) declared.set(name, range);
      }
    }
  }
  return declared;
}

export function versionResolver(root, packages) {
  const catalog = catalogVersions(root);
  const declared = declaredVersions(root, [...packages, "tokens"]);
  return (name) => {
    const range = declared.get(name);
    const version = range === "catalog:" ? catalog.get(name) : range;
    return version && !version.startsWith("workspace") ? `${name}@${version}` : name;
  };
}

import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

function demoFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return demoFiles(path);
    return entry.name.endsWith(".demo.tsx") ? [path] : [];
  });
}

const descriptionField = /description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/;

export function demoDescriptions(root) {
  const descriptions = new Map();
  for (const file of demoFiles(join(root, "apps/design/src/demos"))) {
    const match = readFileSync(file, "utf8").match(descriptionField);
    if (match) descriptions.set(basename(file, ".demo.tsx"), match[1].replaceAll("`", ""));
  }
  return descriptions;
}

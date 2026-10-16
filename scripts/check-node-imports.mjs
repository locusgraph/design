import { readFileSync } from "node:fs";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("./published-resolve.mjs", import.meta.url);

const packages = ["tokens", "utils", "brand", "components", "blocks", "agent-ui", "email"];

function publishedEntry(folder) {
  const manifest = JSON.parse(
    readFileSync(new URL(`../packages/${folder}/package.json`, import.meta.url), "utf8")
  );
  const entry = manifest.publishConfig.exports["."];
  return new URL(`../packages/${folder}/${entry.default}`, import.meta.url);
}

const failures = [];
for (const folder of packages) {
  const entry = publishedEntry(folder);
  try {
    const exports = await import(pathToFileURL(entry.pathname).href);
    console.log(`ok   @locusgraph/${folder} (${Object.keys(exports).length} exports)`);
  } catch (error) {
    failures.push(folder);
    console.log(`FAIL @locusgraph/${folder}: ${error instanceof Error ? error.message : error}`);
  }
}
if (failures.length > 0) process.exit(1);

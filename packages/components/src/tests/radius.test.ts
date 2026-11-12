import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const packagesRoot = join(import.meta.dirname, "..", "..", "..");
const themedPackages = ["components", "blocks", "loop"];

function sources(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return entry.name === "tests" ? [] : sources(path);
    return entry.name.endsWith(".tsx") ? [path] : [];
  });
}

const files = themedPackages.flatMap((name) => sources(join(packagesRoot, name, "src")));

function filesMatching(pattern: RegExp) {
  return files
    .filter((path) => pattern.test(readFileSync(path, "utf8")))
    .map((path) => relative(packagesRoot, path));
}

describe("radius classes", () => {
  it("draws pills with rounded-pill so a theme can change them", () => {
    expect(filesMatching(/\brounded-([lrtbse]{1,2}-)?full\b/)).toEqual([]);
  });

  it("never fixes a radius in pixels or rem", () => {
    expect(filesMatching(/\brounded-([lrtbse]{1,2}-)?\[\d/)).toEqual([
      "components/src/overlay/tooltip.tsx",
    ]);
  });
});

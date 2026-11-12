import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const sourceRoot = resolve(import.meta.dirname, "..");
const relativeImport = /^@import\s+"(\.[^"]+)";\s*$/gm;

function inlined(file: string): string {
  const css = readFileSync(file, "utf8");
  return css.replace(relativeImport, (_line, path: string) =>
    inlined(resolve(dirname(file), path))
  );
}

function entry(name: string) {
  return inlined(resolve(sourceRoot, name));
}

describe("stylesheet entries", () => {
  it("builds the theme from fonts, core and document, in that order", () => {
    const theme = readFileSync(resolve(sourceRoot, "theme.css"), "utf8");
    expect(theme.match(relativeImport)?.map((line) => line.trim())).toEqual([
      '@import "./fonts.css";',
      '@import "./core.css";',
      '@import "./base/document.css";',
    ]);
  });

  it("keeps fonts, the root size and the global cursor out of core", () => {
    const core = entry("core.css");
    expect(core).not.toContain("@fontsource");
    expect(core).not.toMatch(/font-size:\s*17px/);
    expect(core).not.toContain("cursor: pointer");
  });

  it("puts the root size and the cursor in document", () => {
    const document = entry("base/document.css");
    expect(document).toMatch(/html\s*\{\s*font-size:\s*17px;/);
    expect(document).toContain("cursor: pointer");
  });

  it("loads every font package from fonts only", () => {
    const fonts = entry("fonts.css");
    for (const font of ["ibm-plex-sans", "archivo", "ibm-plex-mono"]) {
      expect(fonts).toContain(font);
    }
  });

  it("reads the shadcn variables first in plain CSS, like the Tailwind colors", () => {
    const core = entry("core.css");
    const shadcnFirst = /var\(--[\w-]+, var\(--locus-[\w-]+\)\)/;
    for (const rule of ["\nbody {", "@utility locus-eyebrow", "@utility locus-focus-ring {"]) {
      const block = core.slice(core.indexOf(rule), core.indexOf("}", core.indexOf(rule)) + 60);
      expect(block, rule).toMatch(shadcnFirst);
    }
  });
});

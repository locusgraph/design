import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function read(name: string) {
  return readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
}

function definedNames(css: string) {
  return [...css.matchAll(/^\s*(--[\w-]+):/gm)].map((match) => match[1] ?? "");
}

const palette = read("palette.css");
const shadcn = read("shadcn.css");

describe("theme variables", () => {
  it("prefixes every palette variable with --locus-", () => {
    const unprefixed = definedNames(palette).filter((name) => !name.startsWith("--locus-"));
    expect(unprefixed).toEqual([]);
  });

  it("maps every shadcn alias to a palette variable that exists", () => {
    const paletteNames = new Set(definedNames(palette));
    const targets = [...shadcn.matchAll(/var\((--[\w-]+)\)/g)].map((match) => match[1]);
    expect(targets.length).toBeGreaterThan(0);
    for (const target of targets) expect(paletteNames.has(target ?? ""), target).toBe(true);
  });

  it("defines the shadcn names only in shadcn.css", () => {
    const aliases = definedNames(shadcn);
    expect(aliases).toContain("--muted-foreground");
    expect(aliases.every((name) => !name.startsWith("--locus-"))).toBe(true);
  });
});

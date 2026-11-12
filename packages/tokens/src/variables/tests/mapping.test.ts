import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const mapping = readFileSync(new URL("../mapping.css", import.meta.url), "utf8");
const shadcn = readFileSync(new URL("../shadcn.css", import.meta.url), "utf8");

function mapped(name: string) {
  return mapping.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1]?.trim();
}

const shadcnColorNames = [...shadcn.matchAll(/^\s*--([\w-]+):/gm)]
  .map((match) => match[1] ?? "")
  .filter((name) => name !== "radius" && !name.startsWith("chart-"));

describe("Tailwind mapping", () => {
  it("reads every shadcn color variable first and falls back to the Locus value", () => {
    for (const name of shadcnColorNames) {
      expect(mapped(`color-${name}`), name).toMatch(
        new RegExp(`^var\\(--${name}, var\\(--locus-[\\w-]+\\)\\)$`)
      );
    }
  });

  it("derives every radius step from --radius, which is 0 by default", () => {
    for (const step of ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"]) {
      expect(mapped(`radius-${step}`), step).toContain("var(--radius, var(--locus-radius))");
      expect(mapped(`radius-${step}`), step).not.toMatch(/[+-]\s*\d/);
    }
  });

  it("gives pills their own overridable radius", () => {
    expect(mapping).toMatch(/@theme\s*\{\s*--radius-pill: 9999px;\s*\}/);
  });
});

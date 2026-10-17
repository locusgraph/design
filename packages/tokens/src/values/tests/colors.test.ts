import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { darkColors, hairline, lightColors } from "../colors";

const palette = readFileSync(new URL("../../variables/palette.css", import.meta.url), "utf8");

function cssBlock(selector: string) {
  const start = palette.indexOf(`${selector} {`);
  return palette.slice(start, palette.indexOf("}", start));
}

function cssValue(block: string, name: string) {
  return block.match(new RegExp(`--locus-${name}:\\s*([^;]+);`))?.[1]?.trim();
}

const cssNames = {
  surface: "surface",
  background: "background",
  foreground: "foreground",
  muted: "muted",
  faint: "faint",
  btn: "btn",
  btnInk: "btn-ink",
  ghost: "ghost",
  good: "good",
  bad: "bad",
  info: "info",
  warn: "warn",
} as const;

describe("color values", () => {
  it("match the light palette in palette.css", () => {
    const block = cssBlock(":root");
    for (const [key, css] of Object.entries(cssNames)) {
      expect(cssValue(block, css), key).toBe(lightColors[key as keyof typeof cssNames]);
    }
  });

  it("match the dark palette in palette.css", () => {
    const block = cssBlock(".dark");
    for (const [key, css] of Object.entries(cssNames)) {
      expect(cssValue(block, css), key).toBe(darkColors[key as keyof typeof cssNames]);
    }
  });

  it("mixes the hairline from foreground over surface", () => {
    expect(hairline(lightColors)).toBe("#e9e9e9");
    expect(hairline({ ...lightColors, foreground: "#000000", surface: "#ffffff" })).toBe("#e8e8e8");
  });
});

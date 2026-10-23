import { describe, expect, it } from "vitest";
import { darkColors, lightColors, type Palette } from "../colors";

const minimumTextContrast = 4.5;

const textRoles = [
  "foreground",
  "mutedForeground",
  "faint",
  "interactive",
  "memory",
  "good",
  "warn",
  "destructive",
] as const;

const fillRoles = ["background", "surface", "muted"] as const;

function relativeLuminance(hex: string) {
  const [red, green, blue] = [0, 1, 2].map((index) => {
    const channel = Number.parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(first: string, second: string) {
  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort(
    (a, b) => b - a
  );
  return (lighter + 0.05) / (darker + 0.05);
}

function expectReadableText(palette: Palette) {
  for (const text of textRoles) {
    for (const fill of fillRoles) {
      const ratio = contrastRatio(palette[text], palette[fill]);
      expect(ratio, `${text} on ${fill}`).toBeGreaterThanOrEqual(minimumTextContrast);
    }
  }
}

describe("text contrast", () => {
  it("meets WCAG AA for every text role on every light fill", () => {
    expectReadableText(lightColors);
  });

  it("meets WCAG AA for every text role on every dark fill", () => {
    expectReadableText(darkColors);
  });

  it("keeps faint quieter than muted foreground", () => {
    for (const palette of [lightColors, darkColors]) {
      const faint = contrastRatio(palette.faint, palette.background);
      const muted = contrastRatio(palette.mutedForeground, palette.background);
      expect(faint).toBeLessThan(muted);
    }
  });
});

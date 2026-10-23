import type * as React from "react";

export type ThemeMode = "light" | "dark";
export type RingMode = "blue" | "brand";
export type ContrastMode = "standard" | "high";
export type BrandColors = { primary: string; primaryInk: string };
export type ThemePreset = { id: string; name: string; light: BrandColors; dark: BrandColors };
export type ResolvedTheme = BrandColors & { ring: string };

const blueRing: Record<ThemeMode, string> = { light: "#1b66c4", dark: "#5b9df0" };

export const neutralPreset: ThemePreset = {
  id: "neutral",
  name: "Neutral",
  light: { primary: "#18181b", primaryInk: "#fafafa" },
  dark: { primary: "#ededed", primaryInk: "#0a0a0a" },
};

export const themePresets: ThemePreset[] = [
  neutralPreset,
  {
    id: "blue",
    name: "Blue",
    light: { primary: "#1f6fd1", primaryInk: "#ffffff" },
    dark: { primary: "#2a78d6", primaryInk: "#ffffff" },
  },
  {
    id: "violet",
    name: "Violet",
    light: { primary: "#6d28d9", primaryInk: "#ffffff" },
    dark: { primary: "#7c3aed", primaryInk: "#ffffff" },
  },
  {
    id: "green",
    name: "Green",
    light: { primary: "#15803d", primaryInk: "#ffffff" },
    dark: { primary: "#22c55e", primaryInk: "#052e16" },
  },
  {
    id: "orange",
    name: "Orange",
    light: { primary: "#c2410c", primaryInk: "#ffffff" },
    dark: { primary: "#f97316", primaryInk: "#1c0a00" },
  },
  {
    id: "rose",
    name: "Rose",
    light: { primary: "#e11d48", primaryInk: "#ffffff" },
    dark: { primary: "#e11d48", primaryInk: "#ffffff" },
  },
];

export function findThemePreset(id: string) {
  return themePresets.find((preset) => preset.id === id) ?? neutralPreset;
}

export function pickOtherPreset(currentId: string) {
  const others = themePresets.filter((preset) => preset.id !== currentId);
  return others[Math.floor(Math.random() * others.length)] ?? neutralPreset;
}

export function resolveTheme(preset: ThemePreset, mode: ThemeMode, ring: RingMode): ResolvedTheme {
  const colors = preset[mode];
  return { ...colors, ring: ring === "brand" ? colors.primary : blueRing[mode] };
}

function cssBlock(selector: string, theme: ResolvedTheme) {
  return [
    `${selector} {`,
    `  --btn: ${theme.primary};`,
    `  --btn-ink: ${theme.primaryInk};`,
    `  --interactive: ${theme.ring};`,
    "}",
  ].join("\n");
}

const derivedStatesCss = [
  ":root {",
  "  --btn-hover: color-mix(in oklch, var(--btn) 84%, var(--background));",
  "  --btn-active: color-mix(in oklch, var(--btn) 72%, var(--background));",
  "  --btn-subtle: color-mix(in oklch, var(--btn) 12%, transparent);",
  "}",
].join("\n");

const seeThroughGreysCss = [
  ":root {",
  "  --grey-a1: color-mix(in oklch, var(--foreground) 4%, transparent);",
  "  --grey-a2: color-mix(in oklch, var(--foreground) 8%, transparent);",
  "  --grey-a3: color-mix(in oklch, var(--foreground) 14%, transparent);",
  "  --grey-a4: color-mix(in oklch, var(--foreground) 24%, transparent);",
  "}",
].join("\n");

const highContrastCss = [
  '[data-contrast="high"] {',
  "  --border: color-mix(in oklch, var(--foreground) 34%, var(--surface));",
  "  --input: color-mix(in oklch, var(--foreground) 58%, var(--surface));",
  "  --muted: color-mix(in oklch, var(--foreground) 84%, var(--surface));",
  "}",
].join("\n");

export function themeCss(preset: ThemePreset, ring: RingMode, contrast: ContrastMode) {
  return [
    cssBlock(":root", resolveTheme(preset, "light", ring)),
    cssBlock(".dark", resolveTheme(preset, "dark", ring)),
    derivedStatesCss,
    seeThroughGreysCss,
    ...(contrast === "high" ? [highContrastCss] : []),
  ].join("\n\n");
}

export function themeStyle(theme: ResolvedTheme) {
  return {
    "--btn": theme.primary,
    "--btn-ink": theme.primaryInk,
    "--interactive": theme.ring,
  } as React.CSSProperties;
}

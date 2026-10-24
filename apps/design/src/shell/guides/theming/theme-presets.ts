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
    `  --locus-btn: ${theme.primary};`,
    `  --locus-btn-ink: ${theme.primaryInk};`,
    `  --locus-interactive: ${theme.ring};`,
    "}",
  ].join("\n");
}

function mixDeclaration(name: string, color: string, amount: number, base: string) {
  return [
    `  ${name}: color-mix(`,
    "    in oklch,",
    `    var(${color}) ${amount}%,`,
    `    ${base}`,
    "  );",
  ];
}

function ruleBlock(selector: string, declarations: string[][]) {
  return [`${selector} {`, ...declarations.flat(), "}"].join("\n");
}

const derivedStatesCss = ruleBlock(":root", [
  mixDeclaration("--btn-hover", "--locus-btn", 84, "var(--locus-background)"),
  mixDeclaration("--btn-active", "--locus-btn", 72, "var(--locus-background)"),
  mixDeclaration("--btn-subtle", "--locus-btn", 12, "transparent"),
]);

const seeThroughGreysCss = ruleBlock(":root", [
  mixDeclaration("--grey-a1", "--locus-foreground", 4, "transparent"),
  mixDeclaration("--grey-a2", "--locus-foreground", 8, "transparent"),
  mixDeclaration("--grey-a3", "--locus-foreground", 14, "transparent"),
  mixDeclaration("--grey-a4", "--locus-foreground", 24, "transparent"),
]);

const highContrastCss = ruleBlock('[data-contrast="high"]', [
  mixDeclaration("--locus-border", "--locus-foreground", 34, "var(--locus-surface)"),
  mixDeclaration("--locus-input", "--locus-foreground", 58, "var(--locus-surface)"),
  mixDeclaration("--locus-muted-foreground", "--locus-foreground", 84, "var(--locus-surface)"),
  mixDeclaration("--locus-faint", "--locus-foreground", 66, "var(--locus-surface)"),
]);

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
    "--locus-btn": theme.primary,
    "--locus-btn-ink": theme.primaryInk,
    "--locus-interactive": theme.ring,
  } as React.CSSProperties;
}

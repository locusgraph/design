import type * as React from "react";

export type ThemeColors = { primary: string; primaryInk: string; ring: string };

export type ThemePreset = {
  id: string;
  name: string;
  light: ThemeColors;
  dark: ThemeColors;
};

export const neutralPreset: ThemePreset = {
  id: "neutral",
  name: "Neutral",
  light: { primary: "#18181b", primaryInk: "#fafafa", ring: "#2a78d6" },
  dark: { primary: "#ededed", primaryInk: "#0a0a0a", ring: "#3987e5" },
};

export const themePresets: ThemePreset[] = [
  neutralPreset,
  {
    id: "blue",
    name: "Blue",
    light: { primary: "#1f6fd1", primaryInk: "#ffffff", ring: "#1f6fd1" },
    dark: { primary: "#2a78d6", primaryInk: "#ffffff", ring: "#3987e5" },
  },
  {
    id: "violet",
    name: "Violet",
    light: { primary: "#6d28d9", primaryInk: "#ffffff", ring: "#7c3aed" },
    dark: { primary: "#7c3aed", primaryInk: "#ffffff", ring: "#9085e9" },
  },
  {
    id: "green",
    name: "Green",
    light: { primary: "#15803d", primaryInk: "#ffffff", ring: "#16a34a" },
    dark: { primary: "#22c55e", primaryInk: "#052e16", ring: "#22c55e" },
  },
  {
    id: "orange",
    name: "Orange",
    light: { primary: "#c2410c", primaryInk: "#ffffff", ring: "#ea580c" },
    dark: { primary: "#f97316", primaryInk: "#1c0a00", ring: "#f97316" },
  },
  {
    id: "rose",
    name: "Rose",
    light: { primary: "#e11d48", primaryInk: "#ffffff", ring: "#e11d48" },
    dark: { primary: "#e11d48", primaryInk: "#ffffff", ring: "#f43f5e" },
  },
];

export function findThemePreset(id: string) {
  return themePresets.find((preset) => preset.id === id) ?? neutralPreset;
}

function cssBlock(selector: string, colors: ThemeColors) {
  return [
    `${selector} {`,
    `  --btn: ${colors.primary};`,
    `  --btn-ink: ${colors.primaryInk};`,
    `  --s1: ${colors.ring};`,
    "}",
  ].join("\n");
}

export function themePresetCss(preset: ThemePreset) {
  return [
    '@import "tailwindcss";',
    '@import "@locusgraph/components/theme.css";',
    "",
    cssBlock(":root", preset.light),
    "",
    cssBlock(".dark", preset.dark),
  ].join("\n");
}

export function themePresetStyle(preset: ThemePreset, mode: "light" | "dark") {
  const colors = preset[mode];
  return {
    "--btn": colors.primary,
    "--btn-ink": colors.primaryInk,
    "--s1": colors.ring,
  } as React.CSSProperties;
}

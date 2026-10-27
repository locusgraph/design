export type ColorName =
  | "surface"
  | "background"
  | "foreground"
  | "mutedForeground"
  | "faint"
  | "btn"
  | "btnInk"
  | "muted"
  | "interactive"
  | "memory"
  | "good"
  | "warn"
  | "destructive"
  | "brandGlow";

export type Palette = Record<ColorName, string>;

export const lightColors: Palette = {
  surface: "#ffffff",
  background: "#f4f4f5",
  foreground: "#09090b",
  mutedForeground: "#52525b",
  faint: "#636369",
  btn: "#18181b",
  btnInk: "#fafafa",
  muted: "#ebebed",
  interactive: "#1b66c4",
  memory: "#4a3aa7",
  good: "#137a39",
  warn: "#a84b07",
  destructive: "#c81e1e",
  brandGlow: "#0099ff",
};

export const darkColors: Palette = {
  surface: "#111113",
  background: "#0c0c0d",
  foreground: "#ededed",
  mutedForeground: "#a1a1aa",
  faint: "#85858e",
  btn: "#ededed",
  btnInk: "#0a0a0a",
  muted: "#1b1b1d",
  interactive: "#5b9df0",
  memory: "#9085e9",
  good: "#0ca30c",
  warn: "#e0a400",
  destructive: "#e66767",
  brandGlow: "#0099ff",
};

export const hairlineMix = 0.09;

export function hairline(palette: Palette): string {
  return mixHex(palette.foreground, palette.surface, hairlineMix);
}

function mixHex(top: string, base: string, amount: number): string {
  const channel = (hex: string, index: number) =>
    Number.parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16);
  const mixed = [0, 1, 2].map((index) =>
    Math.round(channel(top, index) * amount + channel(base, index) * (1 - amount))
  );
  return `#${mixed.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

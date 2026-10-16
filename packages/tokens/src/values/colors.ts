export type ColorName =
  | "surface"
  | "background"
  | "foreground"
  | "muted"
  | "faint"
  | "btn"
  | "btnInk"
  | "ghost"
  | "good"
  | "bad"
  | "info"
  | "warn"
  | "brandGlow";

export type Palette = Record<ColorName, string>;

export const lightColors: Palette = {
  surface: "#ffffff",
  background: "#fafafa",
  foreground: "#09090b",
  muted: "#71717a",
  faint: "#a1a1aa",
  btn: "#18181b",
  btnInk: "#fafafa",
  ghost: "#f4f4f5",
  good: "#006300",
  bad: "#d03b3b",
  info: "#1f6fd1",
  warn: "#a15c00",
  brandGlow: "#0099ff",
};

export const darkColors: Palette = {
  surface: "#111113",
  background: "#0c0c0d",
  foreground: "#ededed",
  muted: "#a1a1aa",
  faint: "#71717a",
  btn: "#ededed",
  btnInk: "#0a0a0a",
  ghost: "#1b1b1d",
  good: "#0ca30c",
  bad: "#e66767",
  info: "#5b9df0",
  warn: "#e0a400",
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

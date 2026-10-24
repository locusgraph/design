import { darkColors, lightColors, type Palette } from "@locusgraph/tokens";

export const colorGroups = ["base", "status", "chart", "surfaces"] as const;

export type ColorGroup = (typeof colorGroups)[number];

export type ColorValue = { css: string; label: string };

export type PaletteColor = {
  name: string;
  token: string;
  usage: string;
  light: ColorValue;
  dark: ColorValue;
};

function solid(hex: string): ColorValue {
  return { css: hex, label: hex };
}

function foregroundMix(palette: Palette, percent: number): ColorValue {
  return {
    css: `color-mix(in oklch, ${palette.foreground} ${percent}%, ${palette.surface})`,
    label: `fg ${percent}%`,
  };
}

function fromPalettes(name: string, token: string, usage: string, key: keyof Palette) {
  return { name, token, usage, light: solid(lightColors[key]), dark: solid(darkColors[key]) };
}

function chartSeries(index: number, light: string, dark: string): PaletteColor {
  return {
    name: `s${index}`,
    token: `var(--locus-s${index})`,
    usage: `Chart series ${index}`,
    light: solid(light),
    dark: solid(dark),
  };
}

export const paletteColors: Record<ColorGroup, PaletteColor[]> = {
  base: [
    fromPalettes("background", "bg-background", "Page background", "background"),
    fromPalettes("surface", "bg-card", "Cards, panels and grid cells", "surface"),
    fromPalettes("foreground", "text-foreground", "Body text and headings", "foreground"),
    fromPalettes(
      "muted-foreground",
      "text-muted-foreground",
      "Secondary text, labels",
      "mutedForeground"
    ),
    fromPalettes("faint", "text-faint", "Hints, meta, timestamps, placeholders", "faint"),
    {
      name: "border",
      token: "border-border",
      usage: "Rules, dividers, container rings",
      light: foregroundMix(lightColors, 9),
      dark: foregroundMix(darkColors, 10),
    },
    {
      name: "input",
      token: "border-input",
      usage: "Field outlines",
      light: foregroundMix(lightColors, 26),
      dark: foregroundMix(darkColors, 24),
    },
  ],
  status: [
    fromPalettes(
      "interactive",
      "text-interactive",
      "Hover on clickable text, links, focus ring",
      "interactive"
    ),
    fromPalettes("memory", "text-memory", "Anything the agent remembers or recalls", "memory"),
    fromPalettes("good", "text-good", "Success, healthy quota, paid", "good"),
    fromPalettes("warn", "text-warn", "Waiting, low balance, nearing a limit", "warn"),
    fromPalettes(
      "destructive",
      "text-destructive",
      "Errors, failures, destructive actions",
      "destructive"
    ),
  ],
  chart: [
    chartSeries(1, "#2a78d6", "#3987e5"),
    chartSeries(2, "#eb6834", "#d95926"),
    chartSeries(3, "#1baf7a", "#199e70"),
    chartSeries(4, "#eda100", "#c98500"),
    chartSeries(5, "#e87ba4", "#d55181"),
    chartSeries(6, "#008300", "#2a9d2a"),
    chartSeries(7, "#4a3aa7", "#9085e9"),
    chartSeries(8, "#e34948", "#e66767"),
  ],
  surfaces: [
    fromPalettes("btn", "bg-primary", "Primary button fill", "btn"),
    fromPalettes("btn-ink", "text-primary-foreground", "Text on a primary button", "btnInk"),
    fromPalettes("muted", "bg-muted", "Hover rows, fills, secondary buttons", "muted"),
    {
      name: "popover",
      token: "bg-popover",
      usage: "Menus, popovers, dialogs",
      light: solid(lightColors.surface),
      dark: solid("#18181a"),
    },
    {
      name: "skeleton",
      token: "bg-skeleton",
      usage: "Loading placeholders",
      light: foregroundMix(lightColors, 9),
      dark: foregroundMix(darkColors, 11),
    },
    fromPalettes(
      "brand-glow",
      "var(--locus-brand-glow)",
      "Halo behind the brand grid",
      "brandGlow"
    ),
  ],
};

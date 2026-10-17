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
  const token = index <= 3 ? `bg-s${index}` : `var(--locus-s${index})`;
  return {
    name: `s${index}`,
    token,
    usage: `Chart series ${index}`,
    light: solid(light),
    dark: solid(dark),
  };
}

export const paletteColors: Record<ColorGroup, PaletteColor[]> = {
  base: [
    fromPalettes("surface", "bg-background", "Page and card background", "surface"),
    fromPalettes("foreground", "text-foreground", "Body text and headings", "foreground"),
    fromPalettes("muted", "text-muted-foreground", "Secondary text, labels", "muted"),
    fromPalettes("faint", "text-faint", "Placeholders, disabled text", "faint"),
    {
      name: "border",
      token: "border-border",
      usage: "Rules, dividers, container rings",
      light: foregroundMix(lightColors, 13),
      dark: foregroundMix(darkColors, 13),
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
    fromPalettes("good", "text-good", "Success, healthy quota, paid", "good"),
    fromPalettes("bad", "text-destructive", "Errors, destructive actions", "bad"),
    fromPalettes("info", "text-info", "Neutral notices, links in copy", "info"),
    fromPalettes("warn", "text-warn", "Low balance, nearing a limit", "warn"),
  ],
  chart: [
    chartSeries(1, "#2a78d6", "#3987e5"),
    chartSeries(2, "#eb6834", "#d95926"),
    chartSeries(3, "#1baf7a", "#199e70"),
    chartSeries(4, "#eda100", "#c98500"),
    chartSeries(5, "#e87ba4", "#d55181"),
    chartSeries(6, "#008300", "#008300"),
    chartSeries(7, "#4a3aa7", "#9085e9"),
    chartSeries(8, "#e34948", "#e66767"),
  ],
  surfaces: [
    fromPalettes("btn", "bg-primary", "Primary button fill", "btn"),
    fromPalettes("btn-ink", "text-primary-foreground", "Text on a primary button", "btnInk"),
    fromPalettes("ghost", "bg-muted", "Hover rows, secondary buttons", "ghost"),
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

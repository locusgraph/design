import type * as React from "react";

export type BrandTheme = "dark" | "light";

export type BrandThemeColors = {
  background: string;
  foreground: string;
  muted: string;
  hairline: string;
  dot: string;
};

export const brandGlow = "#0099ff";

export const brandThemes: Record<BrandTheme, BrandThemeColors> = {
  dark: {
    background: "#101011",
    foreground: "#ededed",
    muted: "#a1a1aa",
    hairline: "rgba(237, 237, 237, 0.13)",
    dot: "rgba(237, 237, 237, 0.14)",
  },
  light: {
    background: "#ffffff",
    foreground: "#09090b",
    muted: "#71717a",
    hairline: "rgba(9, 9, 11, 0.13)",
    dot: "rgba(9, 9, 11, 0.12)",
  },
};

export function dotGridStyle(theme: BrandTheme, spacing = 24): React.CSSProperties {
  const colors = brandThemes[theme];
  return {
    backgroundColor: colors.background,
    backgroundImage: `radial-gradient(circle, ${colors.dot} 1.5px, transparent 1.5px)`,
    backgroundSize: `${spacing}px ${spacing}px`,
    color: colors.foreground,
  };
}

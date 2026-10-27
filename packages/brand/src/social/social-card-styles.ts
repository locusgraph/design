import type * as React from "react";
import { type BrandTheme, brandGlow, brandThemes, dotGridStyle } from "../themes/brand-themes";

export const socialCardSize = { width: 1200, height: 630 } as const;

export const socialCardFonts = {
  brand: '"Archivo Variable", Archivo, ui-sans-serif, system-ui, sans-serif',
  body: '"Inter Variable", Inter, ui-sans-serif, system-ui, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, monospace',
} as const;

export function socialCardStyles(theme: BrandTheme) {
  const colors = brandThemes[theme];
  const root: React.CSSProperties = {
    ...dotGridStyle(theme, 32),
    width: socialCardSize.width,
    height: socialCardSize.height,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 72,
    fontFamily: socialCardFonts.body,
  };
  const brandRow: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 16,
    fontFamily: socialCardFonts.brand,
    fontSize: 36,
    color: colors.foreground,
  };
  const body: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    maxWidth: 960,
  };
  const title: React.CSSProperties = {
    display: "flex",
    fontFamily: socialCardFonts.brand,
    fontSize: 76,
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: -1.5,
    color: colors.foreground,
  };
  const description: React.CSSProperties = {
    display: "flex",
    fontSize: 32,
    lineHeight: 1.35,
    color: colors.muted,
  };
  const footer: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: `1px solid ${colors.hairline}`,
    paddingTop: 28,
    fontFamily: socialCardFonts.mono,
    fontSize: 22,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: colors.muted,
  };
  const productLabel: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 14,
    color: colors.foreground,
  };
  const productDot: React.CSSProperties = {
    width: 12,
    height: 12,
    backgroundColor: brandGlow,
  };
  return { root, brandRow, body, title, description, footer, productLabel, productDot };
}

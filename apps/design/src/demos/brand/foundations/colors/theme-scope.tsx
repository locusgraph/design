import { cn } from "@locusgraph/components";
import { darkColors, lightColors, type Palette } from "@locusgraph/tokens";
import type { CSSProperties, ReactNode } from "react";

export type Theme = "light" | "dark";

const palettes: Record<Theme, Palette> = { light: lightColors, dark: darkColors };
const skeletonPercent: Record<Theme, number> = { light: 9, dark: 11 };
const inputPercent: Record<Theme, number> = { light: 26, dark: 24 };

function themeVariables(theme: Theme): CSSProperties {
  const palette = palettes[theme];
  return {
    "--locus-surface": palette.surface,
    "--locus-background": palette.surface,
    "--locus-foreground": palette.foreground,
    "--locus-muted": palette.muted,
    "--locus-faint": palette.faint,
    "--locus-btn": palette.btn,
    "--locus-btn-ink": palette.btnInk,
    "--locus-ghost": palette.ghost,
    "--locus-good": palette.good,
    "--locus-bad": palette.bad,
    "--locus-info": palette.info,
    "--locus-warn": palette.warn,
    "--locus-border": "color-mix(in oklch, var(--locus-foreground) 13%, var(--locus-surface))",
    "--locus-input": `color-mix(in oklch, var(--locus-foreground) ${inputPercent[theme]}%, var(--locus-surface))`,
    "--locus-skeleton": `color-mix(in oklch, var(--locus-foreground) ${skeletonPercent[theme]}%, var(--locus-surface))`,
    "--locus-popover": theme === "dark" ? "#18181a" : palette.surface,
  } as CSSProperties;
}

type ThemeScopeProps = { theme: Theme; className?: string; children: ReactNode };

export function ThemeScope({ theme, className, children }: ThemeScopeProps) {
  return (
    <div
      data-theme-scope={theme}
      className={cn(theme === "dark" && "dark", "bg-background text-foreground", className)}
      style={themeVariables(theme)}
    >
      {children}
    </div>
  );
}

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
    "--surface": palette.surface,
    "--background": palette.surface,
    "--foreground": palette.foreground,
    "--muted": palette.muted,
    "--faint": palette.faint,
    "--btn": palette.btn,
    "--btn-ink": palette.btnInk,
    "--ghost": palette.ghost,
    "--good": palette.good,
    "--bad": palette.bad,
    "--info": palette.info,
    "--warn": palette.warn,
    "--border": "color-mix(in oklch, var(--foreground) 13%, var(--surface))",
    "--input": `color-mix(in oklch, var(--foreground) ${inputPercent[theme]}%, var(--surface))`,
    "--skeleton": `color-mix(in oklch, var(--foreground) ${skeletonPercent[theme]}%, var(--surface))`,
    "--popover": theme === "dark" ? "#18181a" : palette.surface,
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

import type { ResolvedTheme } from "../theme-presets";

export function themePrompt(light: ResolvedTheme, dark: ResolvedTheme, brandName: string) {
  return [
    `Give this app the ${brandName} brand color from Locus Design.`,
    "",
    "In the global CSS, after the @locusgraph/components/theme.css import, set:",
    `- :root { --locus-btn: ${light.primary}; --locus-btn-ink: ${light.primaryInk}; --locus-interactive: ${light.ring}; }`,
    `- .dark { --locus-btn: ${dark.primary}; --locus-btn-ink: ${dark.primaryInk}; --locus-interactive: ${dark.ring}; }`,
    "",
    "Change nothing else. Hover and selected states, surfaces, borders, text and status colors stay as they are.",
    "Use bg-primary for the primary action and the locus-focus-ring utility for focus, never a raw color.",
    "Keep one primary action per view.",
  ].join("\n");
}

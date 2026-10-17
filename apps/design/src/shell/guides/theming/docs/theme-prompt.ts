import type { ResolvedTheme } from "../theme-presets";

export function themePrompt(light: ResolvedTheme, dark: ResolvedTheme, brandName: string) {
  return [
    `Give this app the ${brandName} brand color from Locus Design.`,
    "",
    "In the global CSS, after the @locusgraph/components/theme.css import, set:",
    `- :root { --btn: ${light.primary}; --btn-ink: ${light.primaryInk}; --s1: ${light.ring}; }`,
    `- .dark { --btn: ${dark.primary}; --btn-ink: ${dark.primaryInk}; --s1: ${dark.ring}; }`,
    "",
    "Change nothing else. Hover and selected states, surfaces, borders, text and status colors stay as they are.",
    "Use bg-primary and ring-ring in new code, never a raw color.",
    "Keep one primary action per view.",
  ].join("\n");
}

import type { ResolvedTheme } from "../theme-presets";

function hexComponents(hex: string) {
  const digits = hex.replace("#", "");
  return [0, 2, 4].map(
    (start) => Math.round((Number.parseInt(digits.slice(start, start + 2), 16) / 255) * 1000) / 1000
  );
}

function colorToken(hex: string, description: string) {
  return {
    $type: "color",
    $description: description,
    $value: { colorSpace: "srgb", components: hexComponents(hex), hex },
  };
}

export function dtcgTokens(theme: ResolvedTheme) {
  return JSON.stringify(
    {
      btn: colorToken(theme.primary, "Primary action, checked controls, progress"),
      "btn-ink": colorToken(theme.primaryInk, "Text and icons on the primary color"),
      s1: colorToken(theme.ring, "Focus ring and the first chart series"),
    },
    null,
    2
  );
}

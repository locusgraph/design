import { readFileSync } from "node:fs";

function shadcnAliases(shadcnPath) {
  const css = readFileSync(shadcnPath, "utf8");
  return Object.fromEntries(
    [...css.matchAll(/^\s*--([\w-]+):\s*([^;]+);/gm)].map((match) => [match[1], match[2].trim()])
  );
}

export function shadcnCssVars(shadcnPath) {
  const aliases = shadcnAliases(shadcnPath);
  return {
    theme: {
      "font-sans": '"IBM Plex Sans Variable", ui-sans-serif, system-ui, sans-serif',
      "font-heading": '"Archivo Variable", ui-sans-serif, system-ui, sans-serif',
      "font-mono": '"IBM Plex Mono", ui-monospace, monospace',
    },
    light: aliases,
    dark: aliases,
  };
}

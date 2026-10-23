import { readFileSync } from "node:fs";

function blockVariables(css, selector) {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) return [];
  const body = css.slice(start, css.indexOf("}", start));
  return [...body.matchAll(/^\s*(--[\w-]+):/gm)].map((match) => match[1]);
}

export function paletteVariables(palettePath) {
  const css = readFileSync(palettePath, "utf8");
  const names = new Set([...blockVariables(css, ":root"), ...blockVariables(css, ".dark")]);
  return [...names].filter((name) => !name.startsWith("--font-") && name !== "--radius");
}

export function prefixVariables(css, names) {
  return names.reduce(
    (result, name) =>
      result.replace(new RegExp(`(?<![\\w-])${name}(?![\\w-])`, "g"), `--locus-${name.slice(2)}`),
    css
  );
}

const shadcnToLocus = {
  background: "background",
  foreground: "foreground",
  card: "surface",
  "card-foreground": "foreground",
  popover: "popover",
  "popover-foreground": "foreground",
  primary: "btn",
  "primary-foreground": "btn-ink",
  secondary: "muted",
  "secondary-foreground": "foreground",
  muted: "muted",
  "muted-foreground": "muted-foreground",
  accent: "muted",
  "accent-foreground": "foreground",
  destructive: "destructive",
  "destructive-foreground": "destructive-foreground",
  border: "border",
  input: "input",
  ring: "interactive",
  sidebar: "surface",
  "sidebar-foreground": "foreground",
  "sidebar-primary": "btn",
  "sidebar-primary-foreground": "btn-ink",
  "sidebar-accent": "muted",
  "sidebar-accent-foreground": "foreground",
  "sidebar-border": "border",
  "sidebar-ring": "interactive",
};

export function assertShadcnMapping(paletteNames) {
  const missing = Object.values(shadcnToLocus).filter(
    (locus) => !paletteNames.includes(`--${locus}`)
  );
  if (missing.length > 0) {
    throw new Error(
      `Theme maps shadcn variables to missing palette variables: ${missing.join(", ")}`
    );
  }
}

const sharedVariables = Object.fromEntries(
  Object.entries(shadcnToLocus).map(([name, locus]) => [name, `var(--locus-${locus})`])
);

const squareRadius = Object.fromEntries(
  ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"].map((size) => [`radius-${size}`, "0px"])
);

export const shadcnCssVars = {
  theme: {
    "font-sans": '"Inter Variable", ui-sans-serif, system-ui, sans-serif',
    "font-heading": '"Archivo Variable", ui-sans-serif, system-ui, sans-serif',
    "font-mono": '"Fira Code Variable", ui-monospace, monospace',
    ...squareRadius,
  },
  light: { ...sharedVariables, radius: "0px" },
  dark: { ...sharedVariables, radius: "0px" },
};

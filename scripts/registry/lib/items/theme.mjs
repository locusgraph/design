import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { shadcnCssVars } from "./theme-vars.mjs";

const localImport = /^@import\s+"(\.[^"]+)";\s*$/gm;

function inlineImports(file) {
  const css = readFileSync(file, "utf8");
  return css.replace(localImport, (_line, path) => inlineImports(resolve(dirname(file), path)));
}

export function themeItem(root, versionOf) {
  const tokens = join(root, "packages/tokens/src");
  const content = [
    inlineImports(join(tokens, "theme.css")),
    inlineImports(join(tokens, "typeset.css")),
  ]
    .join("\n")
    .trim();
  return {
    name: "theme",
    type: "registry:theme",
    title: "Locus theme",
    description:
      "The LocusGraph tokens: palette for light and dark, square radius, control borders, overlay shadow, the locus-eyebrow label and brand patterns, with Inter, Archivo and IBM Plex Mono.",
    dependencies: [
      "@fontsource-variable/inter",
      "@fontsource-variable/archivo",
      "@fontsource/ibm-plex-mono",
    ].map(versionOf),
    cssVars: shadcnCssVars(join(tokens, "variables/shadcn.css")),
    files: [
      {
        path: "locus/locus.css",
        type: "registry:file",
        target: "~/styles/locus.css",
        content: `${content}\n`,
      },
    ],
    docs: 'Add @import "../styles/locus.css"; under @import "tailwindcss"; in your global CSS (adjust the path to where your global CSS lives).',
  };
}

import { mkdirSync, writeFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { GitHubMark, GoogleMark, LocusGraphIcon, LocusGraphMark } from "../dist/index.js";

const outDir = new URL("../dist/svg/", import.meta.url);
mkdirSync(outDir, { recursive: true });

const marks = {
  "locusgraph-mark.svg": LocusGraphMark,
  "google-mark.svg": GoogleMark,
  "github-mark.svg": GitHubMark,
};

const iconFiles = {
  "locusgraph-icon-dark.svg": () => createElement(LocusGraphIcon, { size: 512, variant: "dark" }),
  "locusgraph-icon-light.svg": () => createElement(LocusGraphIcon, { size: 512, variant: "light" }),
  "locusgraph-icon-brand.svg": () => createElement(LocusGraphIcon, { size: 512, variant: "brand" }),
};

function withNamespace(markup) {
  return markup.includes("xmlns=")
    ? markup
    : markup.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
}

for (const [file, Mark] of Object.entries(marks)) {
  writeFileSync(
    new URL(file, outDir),
    `${withNamespace(renderToStaticMarkup(createElement(Mark)))}\n`
  );
}

for (const [file, renderIcon] of Object.entries(iconFiles)) {
  writeFileSync(new URL(file, outDir), `${renderToStaticMarkup(renderIcon())}\n`);
}

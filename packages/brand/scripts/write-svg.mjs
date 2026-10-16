import { mkdirSync, writeFileSync } from "node:fs";
import { register } from "node:module";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

register("./resolve-js.mjs", import.meta.url);
const { GitHubMark, GoogleMark, LocusGraphMark } = await import("../dist/index.js");

const outDir = new URL("../dist/svg/", import.meta.url);
mkdirSync(outDir, { recursive: true });

const marks = {
  "locusgraph-mark.svg": LocusGraphMark,
  "google-mark.svg": GoogleMark,
  "github-mark.svg": GitHubMark,
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

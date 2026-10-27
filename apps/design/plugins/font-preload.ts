import type { HtmlTagDescriptor, Plugin } from "vite";

const aboveTheFoldFonts = [
  /archivo-latin-wght-normal.*\.woff2$/,
  /ibm-plex-sans-latin-wght-normal.*\.woff2$/,
];

function preloadTag(href: string): HtmlTagDescriptor {
  return {
    tag: "link",
    attrs: { rel: "preload", as: "font", type: "font/woff2", href, crossorigin: "" },
    injectTo: "head",
  };
}

export function fontPreload(): Plugin {
  return {
    name: "locus-font-preload",
    apply: "build",
    transformIndexHtml(_html, context) {
      const files = Object.keys(context.bundle ?? {});
      return aboveTheFoldFonts
        .map((pattern) => files.find((file) => pattern.test(file)))
        .filter((file): file is string => Boolean(file))
        .map((file) => preloadTag(`/${file}`));
    },
  };
}

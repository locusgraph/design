import { SocialCard } from "@locusgraph/brand";
import { darkColors } from "@locusgraph/tokens";
import { createElement, Fragment } from "react";
import { loadAllDemoEntries } from "../../registry/load-demos";
import { sitePages } from "../page-meta";
import {
  iconFiles,
  siteName,
  siteOrigin,
  siteShortName,
  siteTagline,
  themeColors,
} from "../site-meta";

export async function buildSitePages() {
  return sitePages(await loadAllDemoEntries());
}

export function iconSvg(size: number) {
  const diamond = `<path d="M32 13 51 32 32 51 13 32Z" fill="${darkColors.foreground}"/>`;
  const page = `<rect width="64" height="64" fill="${darkColors.background}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">${page}${diamond}</svg>\n`;
}

function locusDesignWordmark() {
  const square = createElement("div", {
    style: {
      width: 24,
      height: 24,
      backgroundColor: darkColors.foreground,
      transform: "rotate(45deg)",
    },
  });
  const diamond = createElement(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        marginRight: 14,
      },
    },
    square
  );
  const name = createElement(
    "div",
    { style: { display: "flex" } },
    createElement("span", { style: { fontWeight: 700 } }, "locus"),
    createElement("span", { style: { fontWeight: 300 } }, "design")
  );
  return createElement(Fragment, null, diamond, name);
}

export function webManifest() {
  const manifest = {
    name: siteName,
    short_name: siteShortName,
    description: siteTagline,
    start_url: "/",
    scope: "/",
    display: "standalone",
    theme_color: themeColors.light,
    background_color: themeColors.light,
    icons: [
      { src: `/${iconFiles.svg}`, sizes: "any", type: "image/svg+xml" },
      { src: `/${iconFiles.appleTouch}`, sizes: "180x180", type: "image/png" },
      { src: `/${iconFiles.maskable}`, sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

export function socialCardElement() {
  return createElement(SocialCard, {
    title: siteTagline,
    description: "Components, blocks and Loop, the agent UI, in light and dark.",
    product: siteName,
    url: siteOrigin.replace(/^https:\/\//, ""),
    theme: "dark",
    brand: locusDesignWordmark(),
  });
}

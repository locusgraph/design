import { LocusGraphIcon, SocialCard } from "@locusgraph/brand";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
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
  return `${renderToStaticMarkup(createElement(LocusGraphIcon, { size, variant: "brand" }))}\n`;
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
    description: "Components, product blocks and Loop for LocusGraph apps. In light and dark.",
    product: siteName,
    url: siteOrigin.replace(/^https:\/\//, ""),
    theme: "dark",
  });
}

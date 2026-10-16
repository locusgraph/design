import { darkColors, lightColors } from "@locusgraph/tokens";
import { siteOrigin } from "../agent-docs/design-index";

export { siteOrigin };

export const siteName = "Locus Design";

export const siteShortName = "Locus";

export const siteTagline = "Design that keeps humans in the loop";

export const defaultTitle = `${siteName} — ${siteTagline}`;

export const defaultDescription =
  "Components, product blocks and Loop, the agent UI with the human in the loop, for LocusGraph apps. Square, ruled and quiet, in light and dark. Install from npm or copy with shadcn.";

export const themeColors = { light: lightColors.surface, dark: darkColors.surface };

export const socialImage = { path: "/og.png", width: 1200, height: 630 };

export const iconFiles = {
  svg: "favicon.svg",
  ico: "favicon.ico",
  appleTouch: "apple-touch-icon.png",
  maskable: "icon-512.png",
  manifest: "site.webmanifest",
};

export const descriptionLimit = 160;

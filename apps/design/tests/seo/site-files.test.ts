import { darkColors, lightColors } from "@locusgraph/tokens";
import { describe, expect, it } from "vitest";
import { iconSvg, socialCardElement, webManifest } from "../../src/seo/build/site-files";
import { iconFiles, themeColors } from "../../src/seo/site-meta";

describe("site icons", () => {
  it("draws the brand LocusGraph icon at the asked size", () => {
    const svg = iconSvg(64);
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain('viewBox="0 0 64 64"');
    expect(svg).toContain(lightColors.brandGlow);
  });
});

describe("webManifest", () => {
  it("names the site and lists the icons with token colors", () => {
    const manifest = JSON.parse(webManifest());
    expect(manifest.name).toBe("Locus Design");
    expect(manifest.short_name).toBe("Locus");
    expect(manifest.theme_color).toBe(lightColors.surface);
    expect(manifest.background_color).toBe(lightColors.surface);
    const sources = manifest.icons.map((icon: { src: string }) => icon.src);
    expect(sources).toEqual([
      `/${iconFiles.svg}`,
      `/${iconFiles.appleTouch}`,
      `/${iconFiles.maskable}`,
    ]);
  });

  it("takes the light and dark theme colors from the tokens", () => {
    expect(themeColors).toEqual({ light: lightColors.surface, dark: darkColors.surface });
  });
});

describe("socialCardElement", () => {
  it("renders the dark social card with the tagline", () => {
    const element = socialCardElement();
    expect(element.props).toMatchObject({
      title: "Design that keeps humans in the loop",
      theme: "dark",
      url: "design.locusgraph.com",
    });
  });
});

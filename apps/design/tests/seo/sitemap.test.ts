import { describe, expect, it } from "vitest";
import { sitemapXml } from "../../src/seo/build/sitemap";
import { sitePages } from "../../src/seo/page-meta";

describe("sitemapXml", () => {
  it("lists every page by its canonical URL in a sitemap urlset", () => {
    const xml = sitemapXml(sitePages([]));
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain("<loc>https://design.locusgraph.com/</loc>");
    expect(xml).toContain("<loc>https://design.locusgraph.com/installation</loc>");
    expect(xml.trimEnd().endsWith("</urlset>")).toBe(true);
  });

  it("escapes characters that would break the XML", () => {
    expect(sitemapXml([{ canonical: "https://x.test/a&b" }])).toContain(
      "<loc>https://x.test/a&amp;b</loc>"
    );
  });
});

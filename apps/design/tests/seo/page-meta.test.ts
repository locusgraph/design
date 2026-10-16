import { describe, expect, it } from "vitest";
import { loadAllDemoEntries } from "../../src/registry/load-demos";
import { canonicalUrl, fitDescription, sitePages, staticPagePaths } from "../../src/seo/page-meta";
import { defaultDescription, defaultTitle, siteOrigin } from "../../src/seo/site-meta";
import { currentPageMeta } from "../../src/seo/use-page-head";

const loadAllPagesTimeout = 30_000;

describe("sitePages", () => {
  it(
    "gives every route a unique title, a short description and its canonical URL",
    async () => {
      const entries = await loadAllDemoEntries();
      const pages = sitePages(entries);
      expect(pages).toHaveLength(entries.length + staticPagePaths.length);
      expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length);
      expect(new Set(pages.map((page) => page.path)).size).toBe(pages.length);
      for (const page of pages) {
        expect(page.title.endsWith("Locus Design") || page.title === defaultTitle).toBe(true);
        expect(page.description.length).toBeGreaterThan(0);
        if (page.description !== defaultDescription) {
          expect(page.description.length).toBeLessThanOrEqual(160);
        }
        expect(page.canonical).toBe(`${siteOrigin}/${page.path}`);
      }
    },
    loadAllPagesTimeout
  );

  it(
    "uses the demo description for demo pages",
    async () => {
      const entries = await loadAllDemoEntries();
      const pages = sitePages(entries);
      for (const entry of entries) {
        const page = pages.find((item) => item.path === entry.path);
        expect(page?.description).toBe(fitDescription(entry.demo.description));
      }
    },
    loadAllPagesTimeout
  );
});

describe("page titles", () => {
  it("names the site, the libraries and the guides", () => {
    expect(currentPageMeta("", undefined).title).toBe(
      "Locus Design — Design that keeps humans in the loop"
    );
    expect(currentPageMeta("loop", undefined).title).toBe("Loop · Locus Design");
    expect(currentPageMeta("installation", undefined).title).toBe("Installation · Locus Design");
    expect(currentPageMeta("shells", undefined).title).toBe("Shells · Locus Design");
  });

  it("names a demo page after the page and its library before the demo loads", () => {
    const page = currentPageMeta("loop/approval/approval", undefined);
    expect(page.title).toBe("Approval · Loop · Locus Design");
    expect(page.description).toBe(defaultDescription);
    expect(page.canonical).toBe(canonicalUrl("loop/approval/approval"));
  });

  it("falls back to the site defaults for an unknown path", () => {
    expect(currentPageMeta("no/such/page", undefined).title).toBe(defaultTitle);
  });
});

describe("fitDescription", () => {
  it("keeps a short description and cuts a long one at a word", () => {
    expect(fitDescription("  Short   text. ")).toBe("Short text.");
    const long = "word ".repeat(60);
    const fitted = fitDescription(long);
    expect(fitted.length).toBeLessThanOrEqual(160);
    expect(fitted.endsWith("word…")).toBe(true);
  });
});

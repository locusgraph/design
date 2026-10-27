import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { escapeHtml, headTags, pageHtmlFileName, withPageHead } from "../../src/seo/head-tags";
import type { PageMeta } from "../../src/seo/page-meta";
import { staticPageMeta } from "../../src/seo/page-meta";

const indexHtml = readFileSync(new URL("../../index.html", import.meta.url), "utf8");

const approval: PageMeta = {
  path: "loop/approval/approval",
  title: "Approval · Loop · Locus Design",
  description: 'Pauses a tool call & shows "what" it will do.',
  canonical: "https://design.locusgraph.com/loop/approval/approval",
};

function count(html: string, pattern: RegExp) {
  return html.match(pattern)?.length ?? 0;
}

describe("withPageHead", () => {
  const html = withPageHead(indexHtml, approval);

  it("replaces the default tags with exactly one set for the page", () => {
    expect(count(html, /<title>/g)).toBe(1);
    expect(count(html, /name="description"/g)).toBe(1);
    expect(count(html, /rel="canonical"/g)).toBe(1);
    expect(count(html, /property="og:title"/g)).toBe(1);
    expect(count(html, /name="twitter:card"/g)).toBe(1);
    expect(html).toContain("<title>Approval · Loop · Locus Design</title>");
    expect(html).toContain(`href="${approval.canonical}"`);
  });

  it("escapes text and keeps the icons, manifest and app script", () => {
    expect(html).toContain("&amp; shows &quot;what&quot;");
    expect(html).toContain('rel="manifest"');
    expect(html).toContain('href="/favicon.svg"');
    expect(html).toContain('src="/src/main.tsx"');
  });

  it("writes Open Graph and Twitter tags with the default image", () => {
    const tags = headTags(approval).join("\n");
    for (const key of ["og:title", "og:description", "og:url", "og:type", "og:site_name"]) {
      expect(tags).toContain(`property="${key}"`);
    }
    expect(tags).toContain('content="https://design.locusgraph.com/og.png"');
    expect(tags).toContain('content="summary_large_image"');
  });

  it("matches the head index.html ships for the landing page", () => {
    const landing = staticPageMeta("") as PageMeta;
    for (const tag of headTags(landing)) {
      expect(indexHtml).toContain(tag.replace(" />", ""));
    }
  });
});

describe("index.html", () => {
  it("declares the language, viewport, theme colors and app title", () => {
    expect(indexHtml).toContain('<html lang="en" class="dark" style="color-scheme: dark">');
    expect(indexHtml).toContain('name="viewport"');
    expect(indexHtml).toContain('<meta name="theme-color" content="#0c0c0d" />');
    expect(indexHtml).toContain('name="apple-mobile-web-app-title"');
    expect(indexHtml).toContain('rel="apple-touch-icon"');
  });
});

describe("pageHtmlFileName", () => {
  it("serves the landing from index.html and every other route from <path>.html", () => {
    expect(pageHtmlFileName("")).toBe("index.html");
    expect(pageHtmlFileName("loop/approval/approval")).toBe("loop/approval/approval.html");
  });

  it("escapes markup characters", () => {
    expect(escapeHtml(`<a href="x">&</a>`)).toBe("&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;");
  });
});

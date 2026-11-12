import { escapeHtml } from "../head-tags";
import type { PageMeta } from "../page-meta";

export function sitemapXml(pages: Pick<PageMeta, "canonical">[]) {
  const urls = pages.map((page) => `  <url><loc>${escapeHtml(page.canonical)}</loc></url>`);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

import type { PageMeta } from "./page-meta";
import { siteName, siteOrigin, socialImage } from "./site-meta";

export function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function metaTag(attribute: "name" | "property", key: string, content: string | number) {
  return `<meta ${attribute}="${key}" content="${escapeHtml(String(content))}" />`;
}

export function headTags(page: PageMeta) {
  const image = `${siteOrigin}${socialImage.path}`;
  return [
    `<title>${escapeHtml(page.title)}</title>`,
    metaTag("name", "description", page.description),
    `<link rel="canonical" href="${escapeHtml(page.canonical)}" />`,
    metaTag("property", "og:type", "website"),
    metaTag("property", "og:site_name", siteName),
    metaTag("property", "og:title", page.title),
    metaTag("property", "og:description", page.description),
    metaTag("property", "og:url", page.canonical),
    metaTag("property", "og:image", image),
    metaTag("property", "og:image:width", socialImage.width),
    metaTag("property", "og:image:height", socialImage.height),
    metaTag("property", "og:image:alt", siteName),
    metaTag("name", "twitter:card", "summary_large_image"),
    metaTag("name", "twitter:title", page.title),
    metaTag("name", "twitter:description", page.description),
    metaTag("name", "twitter:image", image),
  ];
}

const pageSpecificTag =
  /\s*<(title>[\s\S]*?<\/title|meta (name="(description|twitter:[^"]+)"|property="og:[^"]+")[^>]*|link rel="canonical"[^>]*)>/g;

export function withPageHead(html: string, page: PageMeta) {
  const stripped = html.replace(pageSpecificTag, "");
  const tags = headTags(page)
    .map((tag) => `    ${tag}`)
    .join("\n");
  return stripped.replace(/\s*<\/head>/, `\n${tags}\n  </head>`);
}

export function pageHtmlFileName(path: string) {
  return path === "" ? "index.html" : `${path}.html`;
}

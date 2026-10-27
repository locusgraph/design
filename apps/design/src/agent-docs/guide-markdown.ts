import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { guidePageMeta } from "../seo/page-meta";
import { guidePages } from "../shell/guides/guide-pages";
import { siteOrigin } from "./design-index";

const htmlEntities: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#x27;": "'",
  "&#39;": "'",
  "&nbsp;": " ",
};

function decodeEntities(text: string) {
  return text.replace(
    /&(?:amp|lt|gt|quot|nbsp|#x27|#39);/g,
    (entity) => htmlEntities[entity] ?? entity
  );
}

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, "");
}

function absoluteHref(href: string) {
  return href.startsWith("/") ? `${siteOrigin}${href}` : href;
}

function fencedCode(inner: string) {
  return `\n\n\`\`\`\n${decodeEntities(stripTags(inner)).trimEnd()}\n\`\`\`\n\n`;
}

export function htmlToMarkdown(html: string) {
  const codeBlocks: string[] = [];
  const withoutCode = html
    .replace(/<button\b[\s\S]*?<\/button>/g, "")
    .replace(/<svg\b[\s\S]*?<\/svg>/g, "")
    .replace(/<pre\b[^>]*>([\s\S]*?)<\/pre>/g, (_, inner: string) => {
      codeBlocks.push(fencedCode(inner));
      return `\u0000${codeBlocks.length - 1}\u0000`;
    });
  const markdown = withoutCode
    .replace(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g, "\n\n# $1\n\n")
    .replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g, "\n\n## $1\n\n")
    .replace(/<h3\b[^>]*>([\s\S]*?)<\/h3>/g, "\n\n### $1\n\n")
    .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (_, href: string, text: string) => {
      return `[${stripTags(text)}](${absoluteHref(href)})`;
    })
    .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/g, "`$1`")
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/g, "**$2**")
    .replace(/<li\b[^>]*>/g, "\n- ")
    .replace(/<\/(p|ul|ol|header|section|div)>/g, "\n\n")
    .replace(/<\/span>\s*<span\b[^>]*>/g, " ");
  const restored = decodeEntities(stripTags(markdown)).replace(
    /\u0000(\d+)\u0000/g,
    (_, index: string) => codeBlocks[Number(index)] ?? ""
  );
  return restored
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export type GuideDoc = { path: string; title: string; description: string; markdown: string };

export function guideDocs(): GuideDoc[] {
  return Object.entries(guidePages).map(([path, guide]) => ({
    path,
    title: guidePageMeta[path]?.title ?? path,
    description: guidePageMeta[path]?.description ?? "",
    markdown: htmlToMarkdown(renderToStaticMarkup(createElement(guide.Page))),
  }));
}

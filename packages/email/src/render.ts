import type * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

export type RenderedEmail = { subject: string; html: string; text: string };

function plainText(html: string): string {
  return html
    .replace(/<div style="display:none[^>]*>[\s\S]*?<\/div>/, "")
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, "$2: $1")
    .replace(/<\/(p|h1|tr|table)>/g, "\n")
    .replace(/<\/td>/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n\n")
    .trim();
}

export function renderEmail(subject: string, email: React.ReactElement): RenderedEmail {
  const html = `<!DOCTYPE html>${renderToStaticMarkup(email)}`;
  return { subject, html, text: plainText(html) };
}

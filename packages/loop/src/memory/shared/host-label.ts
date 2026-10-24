import type { Citation, SourceUrlPart } from "../../types";

export function hostLabel(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export type SourceItem = Citation | SourceUrlPart;

function isSourceUrlPart(item: SourceItem): item is SourceUrlPart {
  return "type" in item && item.type === "source-url";
}

export function toCitation(item: SourceItem, position: number, firstIndex = 1): Citation {
  if (!isSourceUrlPart(item)) return item;
  return {
    index: firstIndex + position,
    title: item.title ?? hostLabel(item.url) ?? item.url,
    url: item.url,
  };
}

export function sourceKey(item: SourceItem, position: number): string {
  return isSourceUrlPart(item) ? item.sourceId : `${item.index}:${position}`;
}

function siteNameOf(host: string): string {
  const labels = host.split(".");
  return labels.length > 2 ? labels.slice(-2).join(".") : host;
}

export function sourceInitial(citation: Citation): string {
  const host = hostLabel(citation.url);
  const name = host ? siteNameOf(host) : citation.title;
  return name.trim().charAt(0).toUpperCase() || "?";
}

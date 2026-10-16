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

export function toCitation(item: SourceItem, position: number): Citation {
  if (!isSourceUrlPart(item)) return item;
  return {
    index: position + 1,
    title: item.title ?? hostLabel(item.url) ?? item.url,
    url: item.url,
  };
}

export function sourceKey(item: SourceItem, position: number): string {
  return isSourceUrlPart(item) ? item.sourceId : `${item.index}:${position}`;
}

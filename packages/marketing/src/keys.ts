import type { MarketingLink } from "./types";

export function withUniqueKeys<Item>(
  items: readonly Item[],
  keyOf: (item: Item) => string
): { key: string; item: Item }[] {
  const seen = new Map<string, number>();
  return items.map((item) => {
    const base = keyOf(item);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    return { key: count === 1 ? base : `${base}~${count}`, item };
  });
}

export function linkKey(link: MarketingLink) {
  return `${link.label} ${link.href}`;
}

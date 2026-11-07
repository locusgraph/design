import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProductWordmark, productNames, SpendGraphMark, SpendGraphWordmark } from "../index";

describe("SpendGraph mark", () => {
  it("draws the tally stick as one path in the current text color, hidden from screen readers", () => {
    const html = renderToStaticMarkup(<SpendGraphMark className="size-5" />);
    expect(html).toContain('viewBox="0 0 32 32"');
    expect(html).toContain('fill="currentColor"');
    expect(html).toContain('fill-rule="evenodd"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('class="size-5"');
    expect(html.match(/<path/g)).toHaveLength(1);
    expect(html).not.toContain("<mask");
  });

  it("cuts every notch through both halves at the same height", () => {
    const html = renderToStaticMarkup(<SpendGraphMark />);
    const path = html.match(/ d="([^"]+)"/)?.[1] ?? "";
    const [left, right] = path.split("Z").filter(Boolean);
    const notchArcEnds = (half: string) =>
      [...half.matchAll(/A1 1 0 0 0 \d+ (\d+)/g)].map((match) => Number(match[1]));
    const leftCenters = notchArcEnds(left).map((y) => y - 1);
    const rightCenters = notchArcEnds(right).map((y) => y + 1);
    expect(leftCenters).toEqual([9, 13, 17, 21]);
    expect([...rightCenters].reverse()).toEqual(leftCenters);
  });
});

describe("product wordmarks", () => {
  it("spells SpendGraph with a bold spend and a light graph, mark optional", () => {
    const plain = renderToStaticMarkup(<SpendGraphWordmark />);
    expect(plain).toContain('<span class="font-bold">spend</span>');
    expect(plain).toContain('<span class="font-light">graph</span>');
    expect(plain).toContain("font-brand");
    expect(plain).not.toContain("<svg");
    expect(renderToStaticMarkup(<SpendGraphWordmark withMark />)).toContain('viewBox="0 0 32 32"');
  });

  it("picks the wordmark of the named product", () => {
    expect(renderToStaticMarkup(<ProductWordmark product="spendgraph" />)).toContain(
      'data-slot="spendgraph-wordmark"'
    );
    expect(renderToStaticMarkup(<ProductWordmark product="locusgraph" withMark />)).toContain(
      'data-slot="locusgraph-wordmark"'
    );
  });

  it("names each product in title case", () => {
    expect(productNames).toEqual({ locusgraph: "LocusGraph", spendgraph: "SpendGraph" });
  });
});

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProductWordmark, productNames, SpendGraphWordmark } from "../index";

describe("product wordmarks", () => {
  it("spells SpendGraph with a bold spend and a light graph, mark optional", () => {
    const plain = renderToStaticMarkup(<SpendGraphWordmark />);
    expect(plain).toContain('<span class="font-bold">spend</span>');
    expect(plain).toContain('<span class="font-light">graph</span>');
    expect(plain).toContain("font-brand");
    expect(plain).not.toContain("<svg");
    expect(renderToStaticMarkup(<SpendGraphWordmark withMark />)).toContain('viewBox="0 0 29 26"');
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

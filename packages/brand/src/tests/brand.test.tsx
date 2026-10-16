import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GitHubMark, GoogleMark, LocusGraphMark, LocusGraphWordmark } from "../index";

describe("brand marks", () => {
  it("draws the LocusGraph mark in the current text color and hides it from screen readers", () => {
    const html = renderToStaticMarkup(<LocusGraphMark className="size-5" />);
    expect(html).toContain('viewBox="0 0 29 26"');
    expect(html).toContain('fill="currentColor"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('class="size-5"');
  });

  it("keeps Google's own colors and lets GitHub follow the text color", () => {
    expect(renderToStaticMarkup(<GoogleMark />)).toContain("#4285F4");
    expect(renderToStaticMarkup(<GitHubMark />)).toContain('fill="currentColor"');
  });

  it("spells the wordmark with a bold locus and a light graph, mark optional", () => {
    const plain = renderToStaticMarkup(<LocusGraphWordmark />);
    expect(plain).toContain('<span class="font-bold">locus</span>');
    expect(plain).toContain('<span class="font-light">graph</span>');
    expect(plain).not.toContain("<svg");
    expect(renderToStaticMarkup(<LocusGraphWordmark withMark />)).toContain("<svg");
  });
});

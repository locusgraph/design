import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Pulse, pulseVariants } from "../index";

describe("Pulse", () => {
  it("renders typing dots with a screen reader label", () => {
    const html = renderToStaticMarkup(<Pulse />);
    expect(html).toContain('role="status"');
    expect(html).toContain('data-variant="dots"');
    expect(html).toContain('<span class="sr-only">Thinking…</span>');
  });

  it("renders a shimmer label", () => {
    const html = renderToStaticMarkup(<Pulse variant="shimmer" label="Searching memory…" />);
    expect(html).toContain('role="status"');
    expect(html).toContain("motion-safe:locus-shimmer");
    expect(html).toContain("Searching memory…");
  });

  it.each(pulseVariants)("renders the %s variant as a labelled status", (variant) => {
    const html = renderToStaticMarkup(<Pulse variant={variant} label="Working" />);
    expect(html).toContain('role="status"');
    expect(html).toContain(`data-variant="${variant}"`);
    expect(html).toContain("Working");
  });

  it("draws the LocusGraph mark for the locus variant", () => {
    const html = renderToStaticMarkup(<Pulse variant="locus" />);
    expect(html).toContain('data-slot="pulse-locus"');
    expect(html).toContain("<path");
  });

  it("hides a label the variant shows by default when showLabel is false", () => {
    const html = renderToStaticMarkup(
      <Pulse variant="glyph" label="Pondering" showLabel={false} />
    );
    expect(html).toContain('<span class="sr-only">Pondering</span>');
    expect(html).toContain("✻");
  });
});

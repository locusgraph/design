import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Loader, loaderVariants } from "../index";

describe("Loader", () => {
  it("renders typing dots with a screen reader label", () => {
    const html = renderToStaticMarkup(<Loader />);
    expect(html).toContain('role="status"');
    expect(html).toContain('data-variant="dots"');
    expect(html).toContain('<span class="sr-only">Thinking…</span>');
  });

  it("renders a shimmer label", () => {
    const html = renderToStaticMarkup(<Loader variant="shimmer" label="Searching memory…" />);
    expect(html).toContain('role="status"');
    expect(html).toContain("motion-safe:shimmer");
    expect(html).toContain("Searching memory…");
  });

  it.each(loaderVariants)("renders the %s variant as a labelled status", (variant) => {
    const html = renderToStaticMarkup(<Loader variant={variant} label="Working" />);
    expect(html).toContain('role="status"');
    expect(html).toContain(`data-variant="${variant}"`);
    expect(html).toContain("Working");
  });

  it("draws the LocusGraph mark for the locus variant", () => {
    const html = renderToStaticMarkup(<Loader variant="locus" />);
    expect(html).toContain('data-slot="loader-locus"');
    expect(html).toContain("<path");
  });

  it("hides a label the variant shows by default when showLabel is false", () => {
    const html = renderToStaticMarkup(
      <Loader variant="glyph" label="Pondering" showLabel={false} />
    );
    expect(html).toContain('<span class="sr-only">Pondering</span>');
    expect(html).toContain("✻");
  });
});

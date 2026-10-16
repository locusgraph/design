import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Loader } from "../index";

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
});

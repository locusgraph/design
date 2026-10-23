import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SkeletonRuleGrid } from "../layouts/skeleton-rule-grid";
import { SkeletonTable } from "../layouts/skeleton-table";
import { SkeletonAvatar } from "../shapes/skeleton-avatar";
import { SkeletonButton } from "../shapes/skeleton-button";
import { SkeletonText } from "../shapes/skeleton-text";

function count(html: string, pattern: string) {
  return html.split(pattern).length - 1;
}

function expectAnnouncedOnce(html: string, slot: string) {
  expect(html).toContain(`data-slot="${slot}"`);
  expect(count(html, 'aria-busy="true"')).toBe(1);
  expect(count(html, 'role="status"')).toBe(1);
  expect(count(html, "Loading…")).toBe(1);
  expect(html).toContain('class="sr-only"');
}

describe("SkeletonText", () => {
  it("renders one bar per line with a shorter last line", () => {
    const html = renderToStaticMarkup(<SkeletonText lines={4} />);
    expectAnnouncedOnce(html, "skeleton-text");
    expect(count(html, 'data-slot="skeleton-text-line"')).toBe(4);
    expect(count(html, "w-3/5")).toBe(1);
  });

  it("keeps a single line full width and takes a custom label", () => {
    const html = renderToStaticMarkup(<SkeletonText lines={1} label="Loading usage" />);
    expect(count(html, 'data-slot="skeleton-text-line"')).toBe(1);
    expect(html).not.toContain("w-3/5");
    expect(html).toContain("Loading usage");
  });
});

describe("SkeletonAvatar and SkeletonButton", () => {
  it("renders a round avatar at the chosen size", () => {
    const html = renderToStaticMarkup(<SkeletonAvatar size="lg" />);
    expectAnnouncedOnce(html, "skeleton-avatar");
    expect(html).toContain('data-size="lg"');
    expect(html).toContain("rounded-full");
    expect(html).toContain("size-10");
  });

  it("renders a pill matching the button height", () => {
    const html = renderToStaticMarkup(<SkeletonButton size="sm" />);
    expectAnnouncedOnce(html, "skeleton-button");
    expect(html).toContain("rounded-full");
    expect(html).toContain("h-control-sm");
  });
});

describe("SkeletonTable", () => {
  it("renders the requested rows and columns", () => {
    const html = renderToStaticMarkup(<SkeletonTable rows={3} columns={5} />);
    expectAnnouncedOnce(html, "skeleton-table");
    expect(count(html, 'data-slot="skeleton-table-row"')).toBe(3);
    expect(count(html, 'data-slot="table-head"')).toBe(5);
    expect(count(html, 'data-slot="table-cell"')).toBe(15);
  });
});

describe("SkeletonRuleGrid", () => {
  it("renders cells with a label bar and a value bar", () => {
    const html = renderToStaticMarkup(<SkeletonRuleGrid cells={4} columns={2} />);
    expectAnnouncedOnce(html, "skeleton-rule-grid");
    expect(html).toContain('data-columns="2"');
    expect(count(html, 'data-slot="skeleton-rule-grid-cell"')).toBe(4);
    expect(count(html, 'data-slot="skeleton"')).toBe(8);
  });

  it("hides every bar from assistive technology and respects reduced motion", () => {
    const html = renderToStaticMarkup(<SkeletonRuleGrid cells={1} />);
    expect(html).toContain("motion-reduce:animate-none");
    expect(html).not.toMatch(/data-slot="skeleton"(?![^>]*aria-hidden="true")[^>]*>/);
  });
});

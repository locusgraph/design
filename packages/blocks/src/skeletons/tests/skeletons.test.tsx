import { RuleGrid } from "@locusgraph/components";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  KeysSkeleton,
  PlansSkeleton,
  TopUpSkeleton,
  UsageSkeleton,
  WalletSkeleton,
} from "../../index";

function count(html: string, pattern: string) {
  return html.split(pattern).length - 1;
}

function expectAnnouncedOnce(html: string, slot: string) {
  expect(html).toContain(`data-slot="${slot}"`);
  expect(count(html, 'aria-busy="true"')).toBe(1);
  expect(count(html, 'role="status"')).toBe(1);
  expect(count(html, 'class="sr-only"')).toBe(1);
}

describe("UsageSkeleton", () => {
  it("renders one meter per quota inside a single rule grid cell", () => {
    const html = renderToStaticMarkup(<UsageSkeleton quotas={3} />);
    expectAnnouncedOnce(html, "usage-skeleton");
    expect(html).toContain('data-columns="1"');
    expect(count(html, 'data-slot="quota-skeleton"')).toBe(3);
    expect(html).toContain("Loading usage…");
  });
});

describe("WalletSkeleton and TopUpSkeleton", () => {
  it("share a rule grid row as two cells", () => {
    const html = renderToStaticMarkup(
      <RuleGrid columns={2}>
        <WalletSkeleton grants={2} />
        <TopUpSkeleton packs={4} />
      </RuleGrid>
    );
    expect(count(html, "ring-border")).toBe(2);
    expect(count(html, 'aria-busy="true"')).toBe(2);
    expect(count(html, 'data-slot="wallet-grant-skeleton"')).toBe(2);
    expect(count(html, 'data-slot="credit-pack-skeleton"')).toBe(4);
    expect(html).toContain("Prepaid credits");
    expect(html).toContain("Buy credits");
  });

  it("each announce loading once", () => {
    expectAnnouncedOnce(renderToStaticMarkup(<WalletSkeleton />), "wallet-skeleton");
    expectAnnouncedOnce(renderToStaticMarkup(<TopUpSkeleton />), "top-up-skeleton");
  });
});

describe("PlansSkeleton", () => {
  it("uses the same column count as Plans", () => {
    const two = renderToStaticMarkup(<PlansSkeleton plans={2} />);
    expectAnnouncedOnce(two, "plans-skeleton");
    expect(two).toContain('data-columns="2"');
    expect(count(two, 'data-slot="plan-skeleton"')).toBe(2);
    const three = renderToStaticMarkup(<PlansSkeleton plans={4} />);
    expect(three).toContain('data-columns="3"');
    expect(count(three, 'data-slot="plan-skeleton"')).toBe(4);
  });
});

describe("KeysSkeleton", () => {
  it("renders the key table headers and the requested rows", () => {
    const html = renderToStaticMarkup(<KeysSkeleton rows={4} />);
    expectAnnouncedOnce(html, "keys-skeleton");
    expect(count(html, 'data-slot="keys-skeleton-row"')).toBe(4);
    expect(count(html, 'data-slot="table-head"')).toBe(6);
    expect(html).toContain("Created by");
    expect(html).toContain("Loading API keys…");
  });
});

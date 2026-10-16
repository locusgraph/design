import { RuleGrid } from "@locusgraph/components";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  CreditPacksSkeleton,
  KeysTableSkeleton,
  PlanOptionsSkeleton,
  UsageSummarySkeleton,
  WalletPanelSkeleton,
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

describe("UsageSummarySkeleton", () => {
  it("renders one meter per quota inside a single rule grid cell", () => {
    const html = renderToStaticMarkup(<UsageSummarySkeleton quotas={3} />);
    expectAnnouncedOnce(html, "usage-summary-skeleton");
    expect(html).toContain('data-columns="1"');
    expect(count(html, 'data-slot="quota-meter-skeleton"')).toBe(3);
    expect(html).toContain("Loading usage…");
  });
});

describe("WalletPanelSkeleton and CreditPacksSkeleton", () => {
  it("share a rule grid row as two cells", () => {
    const html = renderToStaticMarkup(
      <RuleGrid columns={2}>
        <WalletPanelSkeleton grants={2} />
        <CreditPacksSkeleton packs={4} />
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
    expectAnnouncedOnce(renderToStaticMarkup(<WalletPanelSkeleton />), "wallet-panel-skeleton");
    expectAnnouncedOnce(renderToStaticMarkup(<CreditPacksSkeleton />), "credit-packs-skeleton");
  });
});

describe("PlanOptionsSkeleton", () => {
  it("uses the same column count as PlanOptions", () => {
    const two = renderToStaticMarkup(<PlanOptionsSkeleton plans={2} />);
    expectAnnouncedOnce(two, "plan-options-skeleton");
    expect(two).toContain('data-columns="2"');
    expect(count(two, 'data-slot="plan-option-skeleton"')).toBe(2);
    const three = renderToStaticMarkup(<PlanOptionsSkeleton plans={4} />);
    expect(three).toContain('data-columns="3"');
    expect(count(three, 'data-slot="plan-option-skeleton"')).toBe(4);
  });
});

describe("KeysTableSkeleton", () => {
  it("renders the key table headers and the requested rows", () => {
    const html = renderToStaticMarkup(<KeysTableSkeleton rows={4} />);
    expectAnnouncedOnce(html, "keys-table-skeleton");
    expect(count(html, 'data-slot="keys-table-skeleton-row"')).toBe(4);
    expect(count(html, 'data-slot="table-head"')).toBe(6);
    expect(html).toContain("Created by");
    expect(html).toContain("Loading API keys…");
  });
});

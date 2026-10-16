import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CreditPacks, KeysTable, NoKeys, PlanOptions, WalletPanel } from "../index";

describe("WalletPanel", () => {
  it("shows the balance, grants and a badge only when low or empty", () => {
    const fine = renderToStaticMarkup(
      <WalletPanel
        balanceMicroUsd={21_000_000}
        grants={[
          {
            label: "Pro allowance",
            remainingMicroUsd: 20_000_000,
            expiresAt: "2026-11-15T12:00:00.000Z",
          },
        ]}
      />
    );
    expect(fine).toContain("$21.00");
    expect(fine).toContain("expires Nov 15, 2026");
    expect(fine).not.toContain('data-slot="badge"');
    const empty = renderToStaticMarkup(
      <WalletPanel balanceMicroUsd={-300_000} debtMicroUsd={300_000} grants={[]} />
    );
    expect(empty).toContain("Empty");
    expect(empty).toContain("$0.30 owed");
  });
});

describe("CreditPacks", () => {
  it("adds the price only when it differs from the amount", () => {
    const html = renderToStaticMarkup(
      <CreditPacks
        onBuy={() => {}}
        packs={[
          { id: "p10", priceCents: 1000, amountMicroUsd: 10_000_000 },
          { id: "p50", priceCents: 4500, amountMicroUsd: 50_000_000 },
        ]}
      />
    );
    expect(html).toContain("$10.00");
    expect(html).toContain("for $45.00");
    expect(html.match(/for \$/g)).toHaveLength(1);
  });
});

describe("PlanOptions", () => {
  it("marks the current plan and asks for an action only on the others", () => {
    const html = renderToStaticMarkup(
      <PlanOptions
        plans={[
          { name: "Free", price: "$0", points: ["A free tier"], current: true },
          { name: "Pro", price: "$40.00 per month", points: ["Higher quotas"], current: false },
        ]}
        actionFor={(plan) => <button type="button">Choose {plan.name}</button>}
      />
    );
    expect(html.match(/Current/g)).toHaveLength(1);
    expect(html).toContain("Choose Pro");
    expect(html).not.toContain("Choose Free");
  });
});

describe("keys", () => {
  it("lists keys with never for no expiry", () => {
    const html = renderToStaticMarkup(
      <KeysTable
        keys={[
          {
            id: "k1",
            name: null,
            maskedKey: "lg_…a1b2",
            productLabel: "LocusGraph",
            createdBy: "You",
            createdAt: "2026-10-01T00:00:00.000Z",
            expiresAt: null,
          },
        ]}
      />
    );
    expect(html).toContain("Untitled");
    expect(html).toContain("Never");
    expect(html).toContain("Oct 1, 2026");
  });

  it("offers a new key only when an href is given", () => {
    expect(renderToStaticMarkup(<NoKeys newKeyHref="/keys/new" />)).toContain('href="/keys/new"');
    const readOnly = renderToStaticMarkup(<NoKeys />);
    expect(readOnly).toContain("Ask an owner");
    expect(readOnly).not.toContain("href");
  });
});

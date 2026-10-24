import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MemoryReview, RunBar, SpendGate } from "../index";
import { reviewResult } from "../memory/memory-choices";
import { minimumCapMicroUsd, suggestedCapMicroUsd } from "../spend/spend-math";

const noop = () => {};

describe("SpendGate", () => {
  const spend = { spentMicroUsd: 4_120_000, estimateMicroUsd: 1_350_000, capMicroUsd: 5_000_000 };

  it("warns when the run would pass its cap", () => {
    const html = renderToStaticMarkup(
      <SpendGate
        {...spend}
        balanceMicroUsd={18_000_000}
        onAllowOnce={noop}
        onRaiseCap={noop}
        onStop={noop}
      />
    );
    expect(html).toContain('data-situation="over-cap"');
    expect(html).toContain("Over cap");
    expect(html).toContain("Allow $1.35 once");
    expect(html).toContain('value="6.00"');
    expect(html).toContain("Raise cap to $6.00");
  });

  it("is red and offers credits when out of credits", () => {
    const html = renderToStaticMarkup(
      <SpendGate
        {...spend}
        balanceMicroUsd={200_000}
        onAllowOnce={noop}
        onRaiseCap={noop}
        onStop={noop}
        onBuyCredits={noop}
      />
    );
    expect(html).toContain('data-situation="out-of-credits"');
    expect(html).toContain("Not enough credits to continue");
    expect(html).toContain("Buy credits");
    expect(html).not.toContain("Allow $1.35 once");
    expect(html).not.toContain("Raise cap");
  });
});

describe("MemoryReview", () => {
  const memories = [
    { id: "m1", text: "Acme bills in EUR", kind: "fact" },
    { id: "m2", text: "Maya's phone is +44 7700 900123", kind: "contact", sensitive: true },
  ];

  it("flags sensitive memories and sets them to discard", () => {
    const html = renderToStaticMarkup(<MemoryReview memories={memories} onSubmit={noop} />);
    expect(html).toContain("Sensitive");
    expect(html).toContain('data-choice="discard"');
    expect(html).toContain("Save 1 memory");
  });

  it("splits kept, edited and discarded", () => {
    const result = reviewResult(memories, {
      m1: { choice: "edit", text: "Acme bills in EUR, net 30" },
      m2: { choice: "discard", text: memories[1]?.text ?? "" },
    });
    expect(result.edited.map((memory) => memory.text)).toEqual(["Acme bills in EUR, net 30"]);
    expect(result.discarded.map((memory) => memory.id)).toEqual(["m2"]);
    expect(result.kept).toEqual([]);
  });

  it("says when there is nothing to review", () => {
    expect(renderToStaticMarkup(<MemoryReview memories={[]} onSubmit={noop} />)).toContain(
      "No new memories to review."
    );
  });
});

describe("RunBar", () => {
  const callbacks = { onPause: noop, onResume: noop, onStop: noop, onStep: noop };

  it("offers pause and stop while running", () => {
    const html = renderToStaticMarkup(
      <RunBar status="running" runName="Nightly reconcile" {...callbacks} />
    );
    expect(html).toContain("Pause");
    expect(html).toMatch(/<button(?=[^>]*aria-label="Run one step")(?=[^>]*disabled="")[^>]*>/);
  });

  it("offers resume and step while paused, nothing when done", () => {
    expect(renderToStaticMarkup(<RunBar status="paused" {...callbacks} />)).toContain("Resume");
    const done = renderToStaticMarkup(<RunBar status="done" {...callbacks} />);
    expect(done).not.toContain("<button");
  });
});

describe("raised cap", () => {
  it("must cover the next step, not just pass the current cap", () => {
    expect(minimumCapMicroUsd(5_470_000, 5_000_000)).toBe(5_470_000);
    expect(minimumCapMicroUsd(4_000_000, 5_000_000)).toBe(5_010_000);
    expect(suggestedCapMicroUsd(5_470_000, 5_000_000)).toBe(6_000_000);
  });
});

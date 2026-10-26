import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Usage, UsageAlert } from "../index";

const events = { key: "spendgraph.events", period: "month" as const, used: 10450, included: 10000 };
const graphs = { key: "locusgraph.graphs", period: "lifetime" as const, used: 0, included: 1 };

describe("Usage", () => {
  it("shows a meter per quota with its status", () => {
    const html = renderToStaticMarkup(<Usage quotas={[graphs, events]} />);
    expect(html).toContain("10,450 of 10,000 this month");
    expect(html).toContain('data-status="over"');
    expect(html).toContain('data-status="ok"');
  });

  it("says when nothing is metered", () => {
    expect(renderToStaticMarkup(<Usage quotas={[]} />)).toContain(
      "No plan includes metered usage yet."
    );
  });
});

describe("UsageAlert", () => {
  const links = { buyCreditsHref: "/billing", upgradeHref: "/billing#plans" };

  it("renders nothing when credits are fine and no quota is over", () => {
    const html = renderToStaticMarkup(
      <UsageAlert balanceMicroUsd={5_000_000} quotas={[graphs]} paidPlan={false} {...links} />
    );
    expect(html).toBe("");
  });

  it("names the quotas over the plan and the low balance, with upgrade only on free", () => {
    const free = renderToStaticMarkup(
      <UsageAlert balanceMicroUsd={1_000_000} quotas={[events]} paidPlan={false} {...links} />
    );
    expect(free).toContain("Usage is over your plan");
    expect(free).toContain("spendgraph.events</span>: 10,450 of 10,000 this month.");
    expect(free).toContain("$1.00 of credits left.");
    expect(free).toContain("Upgrade to Pro");
    const paid = renderToStaticMarkup(
      <UsageAlert balanceMicroUsd={1_000_000} quotas={[events]} paidPlan {...links} />
    );
    expect(paid).not.toContain("Upgrade to Pro");
  });

  it("calls a balance low only below the threshold it is given", () => {
    const starterGrant = (lowAtMicroUsd?: number) =>
      renderToStaticMarkup(
        <UsageAlert
          balanceMicroUsd={1_000_000}
          quotas={[graphs]}
          paidPlan={false}
          lowAtMicroUsd={lowAtMicroUsd}
          {...links}
        />
      );
    expect(starterGrant()).toContain("Credits are running low");
    expect(starterGrant(250_000)).toBe("");
  });

  it("says out of credits when the wallet is empty", () => {
    const html = renderToStaticMarkup(
      <UsageAlert balanceMicroUsd={0} quotas={[]} paidPlan {...links} />
    );
    expect(html).toContain("Out of credits");
    expect(html).toContain("Paid usage is paused");
  });
});

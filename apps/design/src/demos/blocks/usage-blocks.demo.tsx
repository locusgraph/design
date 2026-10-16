import { type Quota, UsageAttention, UsageSummary } from "@locusgraph/blocks";
import { defineDemo, select } from "../../registry/define-demo";

const scenarios = ["fine", "near", "over"] as const;

const quotasFor = {
  fine: [{ key: "spendgraph.events", period: "month", used: 18200, included: 100000 }],
  near: [{ key: "spendgraph.events", period: "month", used: 86000, included: 100000 }],
  over: [{ key: "spendgraph.events", period: "month", used: 10450, included: 10000 }],
} satisfies Record<(typeof scenarios)[number], Quota[]>;

const graphs: Quota = { key: "locusgraph.graphs", period: "lifetime", used: 0, included: 1 };

function LowCredits() {
  return (
    <div className="w-full max-w-2xl">
      <UsageAttention
        balanceMicroUsd={1_000_000}
        quotas={quotasFor.over}
        paidPlan={false}
        buyCreditsHref="#billing"
        upgradeHref="#plans"
      />
    </div>
  );
}

function OutOfCredits() {
  return (
    <div className="w-full max-w-2xl">
      <UsageAttention
        balanceMicroUsd={0}
        quotas={[]}
        paidPlan
        buyCreditsHref="#billing"
        upgradeHref="#plans"
      />
    </div>
  );
}

export default defineDemo({
  title: "Usage Blocks",
  description:
    "Usage meters and the one alert that says what needs doing about credits and quotas. From @locusgraph/blocks.",
  controls: { scenario: select(scenarios, "over") },
  playground: ({ scenario }) => (
    <div className="w-full max-w-2xl">
      <UsageSummary quotas={[graphs, ...quotasFor[scenario]]} />
    </div>
  ),
  code: () => "<UsageSummary quotas={quotas} />",
  props: [
    { name: "UsageSummary.quotas", type: "Quota[]" },
    { name: "UsageAttention.balanceMicroUsd", type: "number | null" },
    { name: "UsageAttention.paidPlan", type: "boolean" },
    { name: "UsageAttention.linkComponent", type: 'LinkComponent | "a"', defaultValue: '"a"' },
  ],
  examples: {
    LowCredits: {
      description: "A quota over the plan and low credits, on the free plan.",
      component: LowCredits,
    },
    OutOfCredits: { description: "An empty wallet pauses paid usage.", component: OutOfCredits },
  },
  isNew: true,
});

import { Plans, TopUp, Wallet } from "@locusgraph/blocks";
import { Button, RuleGrid } from "@locusgraph/components";
import { defineDemo, select } from "../../registry/define-demo";

const balances = { fine: 21_000_000, low: 1_000_000, empty: 0 } as const;
const balanceOptions = ["fine", "low", "empty"] as const;

const packs = [
  { id: "credits_10", priceCents: 1000, amountMicroUsd: 10_000_000 },
  { id: "credits_50", priceCents: 5000, amountMicroUsd: 50_000_000 },
  { id: "credits_200", priceCents: 19000, amountMicroUsd: 200_000_000 },
];

const grants = [{ label: "Free start", remainingMicroUsd: 1_000_000, expiresAt: null }];

function ChoosePlan() {
  return (
    <div className="w-full max-w-3xl">
      <Plans
        plans={[
          {
            name: "Free",
            price: "$0",
            amountCents: 0,
            points: ["LocusGraph Free", "SpendGraph Free"],
            current: true,
          },
          {
            name: "Pro",
            price: "$40.00 per month",
            amountCents: 4000,
            interval: "month",
            points: ["Every product on one plan", "Higher monthly quotas"],
            current: false,
          },
        ]}
        actionFor={(plan) => <Button size="sm">Upgrade to {plan.name}</Button>}
      />
    </div>
  );
}

export default defineDemo({
  title: "Billing",
  description:
    "Wallet, TopUp and Plans. Wallet and TopUp are Rule Grid cells, so they share a row. From `@locusgraph/blocks`.",
  controls: { balance: select(balanceOptions, "low") },
  playground: ({ balance }) => (
    <RuleGrid columns={2} className="w-full max-w-3xl">
      <Wallet balanceMicroUsd={balances[balance]} grants={balance === "empty" ? [] : grants} />
      <TopUp
        packs={packs}
        onBuy={() => {}}
        highlightedPackId={balance === "fine" ? undefined : "credits_200"}
      />
    </RuleGrid>
  ),
  code: () =>
    `<RuleGrid columns={2}>\n  <Wallet balanceMicroUsd={wallet.balanceMicroUsd} grants={grants} />\n  <TopUp packs={wallet.packs} onBuy={openCheckout} pendingPackId={pendingPackId} />\n</RuleGrid>`,
  props: [
    { name: "Wallet.balanceMicroUsd", type: "number" },
    { name: "Wallet.grants", type: "WalletGrant[]" },
    { name: "TopUp.onBuy", type: "(packId: string) => void" },
    { name: "TopUp.highlightedPackId", type: "string", defaultValue: "pack to suggest" },
    { name: "TopUp.pendingPackId", type: "string", defaultValue: "shows a spinner" },
    { name: "PlanOffer.amountCents", type: "number", defaultValue: "falls back to price" },
    { name: "Plans.actionFor", type: "(plan: PlanOffer) => ReactNode" },
  ],
  examples: {
    ChoosePlan: {
      description: "The current plan gets a badge; the others get an action.",
      component: ChoosePlan,
    },
  },
  isNew: true,
});

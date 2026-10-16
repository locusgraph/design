import { CreditPacks, PlanOptions, WalletPanel } from "@locusgraph/blocks";
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

function Plans() {
  return (
    <div className="w-full max-w-3xl">
      <PlanOptions
        plans={[
          {
            name: "Free",
            price: "$0",
            points: ["LocusGraph Free", "SpendGraph Free"],
            current: true,
          },
          {
            name: "Pro",
            price: "$40.00 per month",
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
  title: "Billing Blocks",
  description:
    "The wallet, credit packs and plan options. Wallet and packs are Rule Grid cells, so they share a row. From @locusgraph/blocks.",
  controls: { balance: select(balanceOptions, "low") },
  playground: ({ balance }) => (
    <RuleGrid columns={2} className="w-full max-w-3xl">
      <WalletPanel balanceMicroUsd={balances[balance]} grants={balance === "empty" ? [] : grants} />
      <CreditPacks packs={packs} onBuy={() => {}} />
    </RuleGrid>
  ),
  code: () =>
    `<RuleGrid columns={2}>\n  <WalletPanel balanceMicroUsd={wallet.balanceMicroUsd} grants={grants} />\n  <CreditPacks packs={wallet.packs} onBuy={openCheckout} pending={pending} />\n</RuleGrid>`,
  props: [
    { name: "WalletPanel.balanceMicroUsd", type: "number" },
    { name: "WalletPanel.grants", type: "WalletGrant[]" },
    { name: "CreditPacks.onBuy", type: "(packId: string) => void" },
    { name: "PlanOptions.actionFor", type: "(plan: PlanOffer) => ReactNode" },
  ],
  examples: {
    Plans: {
      description: "The current plan gets a badge; the others get an action.",
      component: Plans,
    },
  },
  isNew: true,
});

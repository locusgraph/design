import { BillingPage } from "../../../patterns/pages/billing-page";
import source from "../../../patterns/pages/billing-page.tsx?raw";
import { defineDemo, select } from "../../../registry/define-demo";
import { PatternRules } from "./pattern-rules";

const balanceOptions = ["low", "fine", "empty"] as const;

const balances = { low: 1_000_000, fine: 42_180_000, empty: 0 } as const;

const rules = [
  "UsageAlert sits on top and renders only when credits or quotas need action.",
  "Usage, then credits, then plans, then invoices: what is happening before what to do.",
  "Wallet and TopUp share one RuleGrid row.",
  "Plan actions are outline; the suggested credit pack is the one primary action.",
  "Amounts are tabular-nums; status color stays on the badge.",
  "Each invoice downloads from a ghost icon button with an aria-label.",
];

function Rules() {
  return <PatternRules rules={rules} />;
}

function Healthy() {
  return (
    <div className="w-[56rem] max-w-full">
      <BillingPage
        wallet={{ balanceMicroUsd: balances.fine, grants: [] }}
        quotas={[
          {
            key: "spendgraph.events",
            label: "SpendGraph events",
            period: "month",
            used: 18200,
            included: 100000,
          },
        ]}
        highlightedPackId=""
      />
    </div>
  );
}

export default defineDemo({
  title: "Billing Page",
  description:
    "The billing screen built from @locusgraph/blocks: an alert when needed, usage, wallet and top-up, plans and an invoice table. Pass real data through its props.",
  controls: { balance: select(balanceOptions, "low") },
  playground: ({ balance }) => (
    <div className="w-[56rem] max-w-full">
      <BillingPage
        wallet={{
          balanceMicroUsd: balances[balance],
          grants:
            balance === "empty"
              ? []
              : [{ label: "Free start", remainingMicroUsd: balances[balance], expiresAt: null }],
        }}
      />
    </div>
  ),
  code: () => source,
  props: [
    { name: "quotas", type: "QuotaData[]", defaultValue: "sampleQuotas" },
    { name: "wallet", type: "BillingWallet", defaultValue: "sampleWallet" },
    { name: "packs", type: "CreditPack[]", defaultValue: "samplePacks" },
    { name: "plans", type: "PlanOffer[]", defaultValue: "samplePlans" },
    { name: "invoices", type: "Invoice[]", defaultValue: "sampleInvoices" },
    { name: "highlightedPackId", type: "string", defaultValue: '"credits_200"' },
    { name: "pendingPackId", type: "string" },
    { name: "buyCreditsHref", type: "string", defaultValue: '"#credits"' },
    { name: "upgradeHref", type: "string", defaultValue: '"#plans"' },
    { name: "onBuy", type: "(packId: string) => void" },
    { name: "onChoosePlan", type: "(plan: PlanOffer) => void" },
    { name: "onDownloadInvoice", type: "(invoiceId: string) => void" },
  ],
  examples: {
    Rules: { description: "The rules this pattern follows.", component: Rules },
    Healthy: {
      description: "Credits and quotas are fine, so no alert renders and no pack is suggested.",
      component: Healthy,
    },
  },
  isNew: true,
});

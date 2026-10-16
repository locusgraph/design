import { Usage, Wallet } from "@locusgraph/blocks";
import { RuleGrid } from "@locusgraph/components";

const quotas = [
  {
    key: "locusgraph.recalls",
    label: "Memory recalls",
    period: "month" as const,
    used: 8_620,
    included: 10_000,
  },
  {
    key: "spendgraph.events",
    label: "Spend events",
    period: "month" as const,
    used: 10_450,
    included: 10_000,
  },
];

const grants = [{ label: "Free start", remainingMicroUsd: 1_000_000, expiresAt: null }];

export function BlocksPreview() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Usage quotas={quotas} />
      <RuleGrid columns={1}>
        <Wallet balanceMicroUsd={1_000_000} grants={grants} />
      </RuleGrid>
    </div>
  );
}

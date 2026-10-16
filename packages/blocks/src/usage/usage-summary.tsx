import { RuleGrid, RuleGridCell, RuleGridLabel } from "@locusgraph/components";
import type { Quota } from "../types";
import { QuotaMeter } from "./quota-meter";

type UsageSummaryProps = {
  quotas: Quota[];
  label?: string;
  emptyText?: string;
};

export function UsageSummary({
  quotas,
  label = "Usage",
  emptyText = "No plan includes metered usage yet.",
}: UsageSummaryProps) {
  return (
    <RuleGrid columns={1}>
      <RuleGridCell className="gap-5">
        <RuleGridLabel>{label}</RuleGridLabel>
        {quotas.length > 0 ? (
          quotas.map((quota) => <QuotaMeter key={quota.key} quota={quota} />)
        ) : (
          <p className="text-sm text-muted-foreground">{emptyText}</p>
        )}
      </RuleGridCell>
    </RuleGrid>
  );
}

import { RuleGrid, RuleGridCell, RuleGridLabel } from "@locusgraph/components";
import type { QuotaData } from "../types";
import { Quota } from "./quota";

type UsageProps = {
  quotas: QuotaData[];
  label?: string;
  emptyText?: string;
};

export function Usage({
  quotas,
  label = "Usage",
  emptyText = "No plan includes metered usage yet.",
}: UsageProps) {
  return (
    <RuleGrid columns={1}>
      <RuleGridCell className="gap-5">
        <RuleGridLabel>{label}</RuleGridLabel>
        {quotas.length > 0 ? (
          quotas.map((quota) => <Quota key={quota.key} quota={quota} />)
        ) : (
          <p className="text-sm text-muted-foreground">{emptyText}</p>
        )}
      </RuleGridCell>
    </RuleGrid>
  );
}

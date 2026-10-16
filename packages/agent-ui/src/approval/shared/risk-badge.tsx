import { Badge } from "@locusgraph/components";
import type { RiskLevel } from "../../types";

export const riskLabels: Record<RiskLevel, string> = {
  read: "Read only",
  write: "Writes data",
  destructive: "Destructive",
};

export const riskRing: Record<RiskLevel, string> = {
  read: "ring-border",
  write: "ring-border",
  destructive: "ring-destructive/60",
};

const riskVariant = { read: "outline", write: "secondary", destructive: "destructive" } as const;

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  return (
    <Badge data-slot="risk-badge" data-risk={risk} variant={riskVariant[risk]}>
      {riskLabels[risk]}
    </Badge>
  );
}

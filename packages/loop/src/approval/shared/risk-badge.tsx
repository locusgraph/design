import { Badge } from "@locusgraph/components";
import type { ReactNode } from "react";
import type { PanelTone } from "../../shared/panel";
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

export const riskTone: Record<RiskLevel, PanelTone> = {
  read: "idle",
  write: "waiting",
  destructive: "danger",
};

export const riskCopy: Record<RiskLevel, () => ReactNode> = {
  read: () => "Only reads data. Nothing changes if you approve.",
  write: () => "Makes a change. Check the inputs before you approve.",
  destructive: () => (
    <>
      Permanently deletes or overwrites data.{" "}
      <span className="font-medium text-destructive">This can't be undone.</span>
    </>
  ),
};

const riskVariant = {
  read: "secondary",
  write: "warning",
  destructive: "destructive-soft",
} as const;

export function RiskBadge({ risk, className }: { risk: RiskLevel; className?: string }) {
  return (
    <Badge
      data-slot="risk-badge"
      data-risk={risk}
      variant={riskVariant[risk]}
      className={className}
    >
      {riskLabels[risk]}
    </Badge>
  );
}

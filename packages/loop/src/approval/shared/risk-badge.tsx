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

export const riskCopy: Record<RiskLevel, (tool: string) => ReactNode> = {
  read: (tool) => `${tool} only reads data. Nothing changes if you approve.`,
  write: (tool) => `${tool} wants to make a change. Check the inputs before you approve.`,
  destructive: (tool) => (
    <>
      {tool} will permanently delete or overwrite data.{" "}
      <span className="font-medium text-destructive">This can't be undone.</span>
    </>
  ),
};

const riskVariant = { read: "outline", write: "secondary", destructive: "destructive" } as const;

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  return (
    <Badge data-slot="risk-badge" data-risk={risk} variant={riskVariant[risk]}>
      {riskLabels[risk]}
    </Badge>
  );
}

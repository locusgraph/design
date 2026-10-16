import { Button, cn } from "@locusgraph/components";
import { ShieldAlertIcon, WrenchIcon } from "lucide-react";
import { useState } from "react";
import { type RiskLevel, type ToolPart, type ToolState, toolNameOf } from "../../types";
import { DecisionLine } from "../shared/decision-line";
import { ApprovalPanel, LiveStatus } from "../shared/panel";
import { RiskBadge, riskRing } from "../shared/risk-badge";
import { useFocusOnMount } from "../shared/use-focus-on-mount";
import type { ApprovalDecision } from "../types";
import { DenyForm } from "./deny-form";
import { ToolInputs } from "./tool-inputs";

export type ToolApprovalProps = {
  part: ToolPart;
  risk?: RiskLevel;
  actionLabel?: string;
  description?: string;
  decision?: ApprovalDecision;
  onApprove: () => void;
  onDeny: (reason?: string) => void;
  autoFocus?: boolean;
  className?: string;
};

const riskCopy: Record<RiskLevel, (tool: string) => string> = {
  read: (tool) => `${tool} only reads data. Nothing changes if you approve.`,
  write: (tool) => `${tool} wants to make a change. Check the inputs before you approve.`,
  destructive: (tool) => `${tool} will permanently delete or overwrite data. This can't be undone.`,
};

const settledStateLabels: Partial<Record<ToolState, string>> = {
  "approval-responded": "Response sent. Waiting for the tool to run.",
  "output-available": "Approved and run.",
  "output-error": "Approved, but the tool failed.",
  "output-denied": "Denied. The tool did not run.",
};

function settledLabel(state: ToolState) {
  return settledStateLabels[state] ?? "Waiting for the tool inputs.";
}

export function ToolApproval({
  part,
  risk = "write",
  actionLabel,
  description,
  decision,
  onApprove,
  onDeny,
  autoFocus = true,
  className,
}: ToolApprovalProps) {
  const [denying, setDenying] = useState(false);
  const toolName = toolNameOf(part);
  const awaiting = !decision && part.state === "approval-requested";
  const approveRef = useFocusOnMount<HTMLButtonElement>(autoFocus && awaiting);
  const destructive = risk === "destructive";
  const Icon = destructive ? ShieldAlertIcon : WrenchIcon;
  return (
    <ApprovalPanel
      data-slot="tool-approval"
      data-risk={risk}
      data-state={decision ? (decision.approved ? "approved" : "denied") : part.state}
      aria-label={`Approve ${toolName}`}
      className={cn(riskRing[risk], className)}
    >
      <header className="flex flex-wrap items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-2">
          <Icon
            aria-hidden
            className={cn(
              "size-4 shrink-0",
              destructive ? "text-destructive" : "text-muted-foreground"
            )}
          />
          <span className="truncate font-mono text-sm font-medium">{toolName}</span>
        </span>
        <RiskBadge risk={risk} />
      </header>
      <p className={cn("text-sm", destructive ? "text-destructive" : "text-muted-foreground")}>
        {description ?? riskCopy[risk](toolName)}
      </p>
      <ToolInputs input={part.input} />
      {decision && <DecisionLine decision={decision} />}
      {!decision && !awaiting && (
        <p className="text-sm text-muted-foreground">{settledLabel(part.state)}</p>
      )}
      {awaiting && !denying && (
        <div className="flex flex-wrap gap-2">
          <Button
            ref={approveRef}
            type="button"
            size="sm"
            variant={destructive ? "destructive" : "default"}
            onClick={onApprove}
          >
            {actionLabel ?? `Run ${toolName}`}
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => setDenying(true)}>
            Deny
          </Button>
        </div>
      )}
      {awaiting && denying && <DenyForm onDeny={onDeny} onBack={() => setDenying(false)} />}
      <LiveStatus
        message={
          decision
            ? `${toolName} ${decision.approved ? "approved" : "denied"} by ${decision.by}`
            : awaiting
              ? `${toolName} is waiting for your approval`
              : settledLabel(part.state)
        }
      />
    </ApprovalPanel>
  );
}

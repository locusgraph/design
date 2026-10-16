import { Button, cn } from "@locusgraph/components";
import { ShieldAlertIcon, WrenchIcon } from "lucide-react";
import { useState } from "react";
import {
  ApprovalPanel,
  LiveStatus,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelTitle,
  type PanelTone,
} from "../../shared/panel";
import { type RiskLevel, type ToolPart, type ToolState, toolNameOf } from "../../types";
import { DecisionSummary } from "../shared/decision-line";
import { riskCopy, riskLabels, riskRing } from "../shared/risk-badge";
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

const settledStateLabels: Partial<Record<ToolState, string>> = {
  "approval-responded": "Response sent. Waiting for the tool to run.",
  "output-available": "Approved and run.",
  "output-error": "Approved, but the tool failed.",
  "output-denied": "Denied. The tool did not run.",
};

function settledLabel(state: ToolState) {
  return settledStateLabels[state] ?? "Waiting for the tool inputs.";
}

function headerStatus(
  awaiting: boolean,
  decision?: ApprovalDecision
): { status?: string; tone: PanelTone } {
  if (decision) {
    return decision.approved
      ? { status: "Approved", tone: "done" }
      : { status: "Denied", tone: "danger" };
  }
  return awaiting ? { status: "Waiting for you", tone: "waiting" } : { tone: "idle" };
}

function decidedResult(toolName: string, state: ToolState, decision: ApprovalDecision) {
  return settledStateLabels[state] ?? `${toolName} ${decision.approved ? "approved" : "denied"}`;
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
  const header = headerStatus(awaiting, decision);
  return (
    <ApprovalPanel
      data-slot="tool-approval"
      data-risk={risk}
      data-state={decision ? (decision.approved ? "approved" : "denied") : part.state}
      aria-label={`Approve ${toolName}`}
      className={cn(awaiting && riskRing[risk], className)}
    >
      <PanelHeader
        icon={<Icon aria-hidden />}
        eyebrow={awaiting ? "Approval needed" : "Tool call"}
        aside={riskLabels[risk]}
        status={header.status}
        tone={header.tone}
      />
      <PanelTitle className={cn("truncate font-mono", !awaiting && "text-muted-foreground")}>
        {toolName}
      </PanelTitle>
      {awaiting && (
        <p className="px-5 pt-1 text-sm text-muted-foreground">
          {description ?? riskCopy[risk](toolName)}
        </p>
      )}
      {awaiting && !denying && (
        <>
          <PanelBody>
            <ToolInputs input={part.input} />
          </PanelBody>
          <PanelFooter className="justify-between">
            <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
              The run is paused
            </span>
            <span className="flex flex-wrap gap-2">
              <Button type="button" size="sm" variant="ghost" onClick={() => setDenying(true)}>
                Deny
              </Button>
              <Button
                ref={approveRef}
                type="button"
                size="sm"
                variant={destructive ? "destructive" : "default"}
                onClick={onApprove}
              >
                {actionLabel ?? `Run ${toolName}`}
              </Button>
            </span>
          </PanelFooter>
        </>
      )}
      {awaiting && denying && (
        <>
          <PanelBody className="pb-4">
            <ToolInputs input={part.input} muted />
          </PanelBody>
          <DenyForm onDeny={onDeny} onBack={() => setDenying(false)} />
        </>
      )}
      {!awaiting && (
        <PanelBody className="pt-3">
          {decision ? (
            <DecisionSummary
              decision={decision}
              result={decidedResult(toolName, part.state, decision)}
            />
          ) : (
            <p className="text-sm text-muted-foreground">{settledLabel(part.state)}</p>
          )}
        </PanelBody>
      )}
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

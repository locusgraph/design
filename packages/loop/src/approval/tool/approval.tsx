import { Button, cn } from "@locusgraph/components";
import { useState } from "react";
import { humanToolName } from "../../agent/tool/tool-status";
import { DecisionSummary } from "../../shared/decision-summary";
import { LiveStatus } from "../../shared/live-status";
import { type RiskLevel, type ToolPart, type ToolState, toolNameOf } from "../../types";
import { ApprovalHeadline, SettledLine } from "../shared/approval-line";
import { riskCopy } from "../shared/risk-badge";
import { useFocusOnMount } from "../shared/use-focus-on-mount";
import { useFocusWhenSettled } from "../shared/use-focus-when-settled";
import type { ApprovalDecision } from "../types";
import { DenyForm } from "./deny-form";
import { ToolInputs } from "./tool-inputs";

export type ApprovalProps = {
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
  "approval-responded": "Reply sent. Waiting for the tool to run.",
  "output-available": "Approved and run.",
  "output-error": "Approved, but the tool failed.",
  "output-denied": "Denied. The tool did not run.",
};

function settledLabel(state: ToolState) {
  return settledStateLabels[state] ?? "Waiting for the tool inputs.";
}

function decidedResult(toolName: string, state: ToolState, decision: ApprovalDecision) {
  return settledStateLabels[state] ?? `${toolName} ${decision.approved ? "approved" : "denied"}`;
}

export function Approval({
  part,
  risk = "write",
  actionLabel,
  description,
  decision,
  onApprove,
  onDeny,
  autoFocus = true,
  className,
}: ApprovalProps) {
  const [denying, setDenying] = useState(false);
  const toolName = toolNameOf(part);
  const name = humanToolName(toolName);
  const awaiting = !decision && part.state === "approval-requested";
  const approveRef = useFocusOnMount<HTMLButtonElement>(autoFocus && awaiting);
  const sectionRef = useFocusWhenSettled<HTMLElement>(awaiting);
  const destructive = risk === "destructive";
  return (
    <section
      ref={sectionRef}
      tabIndex={-1}
      data-slot="approval"
      data-risk={risk}
      data-state={decision ? (decision.approved ? "approved" : "denied") : part.state}
      data-tool-name={toolName}
      aria-label={`Approve ${name}`}
      className={cn("flex min-w-0 flex-col outline-none", awaiting && "gap-3", className)}
    >
      {awaiting && (
        <>
          <ApprovalHeadline name={name} risk={risk} />
          <p className="-mt-2 text-sm text-faint">{description ?? riskCopy[risk]()}</p>
          <div>
            <ToolInputs input={part.input} muted={denying} />
          </div>
          {denying ? (
            <DenyForm onDeny={onDeny} onBack={() => setDenying(false)} />
          ) : (
            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                ref={approveRef}
                type="button"
                size="sm"
                variant={destructive ? "destructive" : "default"}
                onClick={onApprove}
              >
                {actionLabel ?? `Run ${name}`}
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setDenying(true)}>
                Deny
              </Button>
            </div>
          )}
        </>
      )}
      {!awaiting && (
        <SettledLine name={name}>
          {decision ? (
            <DecisionSummary
              decision={decision}
              result={decidedResult(name, part.state, decision)}
            />
          ) : (
            <p className="text-sm text-faint">{settledLabel(part.state)}</p>
          )}
        </SettledLine>
      )}
      <LiveStatus
        message={
          decision
            ? `${name} ${decision.approved ? "approved" : "denied"} by ${decision.by}`
            : awaiting
              ? `${name} is waiting for your approval`
              : settledLabel(part.state)
        }
      />
    </section>
  );
}

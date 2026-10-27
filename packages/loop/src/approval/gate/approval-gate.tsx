"use client";

import { Approval } from "../tool/approval";
import type { ApprovalGateController } from "./use-approval-gate";

export type ApprovalGateProps = {
  gate: ApprovalGateController;
  allowForRun?: boolean;
  className?: string;
};

export function ApprovalGate({ gate, allowForRun = true, className }: ApprovalGateProps) {
  if (!gate.open) return null;
  const { part, request } = gate.open;
  return (
    <Approval
      key={part.toolCallId}
      part={part}
      risk={request.risk}
      actionLabel={request.actionLabel}
      description={request.description}
      changes={request.changes}
      decision={gate.decision}
      onApprove={gate.approve}
      onDeny={gate.deny}
      onAllowForRun={allowForRun ? gate.allowForRun : undefined}
      className={className}
    />
  );
}

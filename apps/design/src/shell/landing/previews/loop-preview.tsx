import {
  Approval,
  type ApprovalDecision,
  DecisionLog,
  type DecisionLogEntry,
  type ToolPart,
} from "@locusgraph/loop";
import { useState } from "react";

const invoicePart: ToolPart = {
  type: "tool-send_invoice",
  toolCallId: "call_landing",
  state: "approval-requested",
  input: { to: "ap@northwind.io", invoice: "INV-2041", amount: "$1,240.00" },
};

const minutesAgo = (minutes: number) => Date.now() - minutes * 60_000;

const earlierDecisions: DecisionLogEntry[] = [
  {
    id: "landing-draft",
    title: "Draft INV-2041",
    decision: { approved: true, by: "Maya Chen", at: minutesAgo(6) },
  },
  {
    id: "landing-delete",
    title: "Delete 3 old drafts",
    decision: {
      approved: false,
      by: "Maya Chen",
      at: minutesAgo(4),
      reason: "Archive them instead.",
    },
  },
];

export function LoopPreview() {
  const [decision, setDecision] = useState<ApprovalDecision>();
  const decide = (approved: boolean) => setDecision({ approved, by: "You", at: Date.now() });
  const entries = decision
    ? [...earlierDecisions, { id: "landing-send", title: "Send INV-2041", decision }]
    : earlierDecisions;
  return (
    <div className="flex w-full flex-col divide-y">
      <div className="flex flex-col gap-3 p-8">
        <Approval
          part={decision ? { ...invoicePart, state: "approval-responded" } : invoicePart}
          risk="write"
          actionLabel="Send INV-2041"
          decision={decision}
          autoFocus={false}
          onApprove={() => decide(true)}
          onDeny={() => decide(false)}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-8">
        <span className="locus-eyebrow">Decision log</span>
        <DecisionLog entries={entries} />
        {decision && (
          <button
            type="button"
            onClick={() => setDecision(undefined)}
            className="self-start font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Reset demo
          </button>
        )}
      </div>
    </div>
  );
}

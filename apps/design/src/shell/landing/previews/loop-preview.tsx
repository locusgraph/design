import { Approval, type ApprovalDecision, type ToolPart } from "@locusgraph/loop";
import { useState } from "react";

const invoicePart: ToolPart = {
  type: "tool-send_invoice",
  toolCallId: "call_landing",
  state: "approval-requested",
  input: { to: "ap@northwind.io", invoice: "INV-2041", amount: "$1,240.00" },
};

export function LoopPreview() {
  const [decision, setDecision] = useState<ApprovalDecision>();
  const decide = (approved: boolean) => setDecision({ approved, by: "You", at: Date.now() });
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Approval
        part={decision ? { ...invoicePart, state: "approval-responded" } : invoicePart}
        risk="write"
        actionLabel="Send INV-2041"
        decision={decision}
        autoFocus={false}
        onApprove={() => decide(true)}
        onDeny={() => decide(false)}
      />
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
  );
}

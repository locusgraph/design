import { Approval, type ToolPart } from "@locusgraph/loop";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const riskOptions = ["read", "write", "destructive"] as const;

const parts = {
  read: {
    type: "tool-search_graph",
    toolCallId: "call_read",
    state: "approval-requested",
    input: { graph: "acme-customers", query: "accounts with overdue invoices", limit: 25 },
  },
  write: {
    type: "tool-send_invoice",
    toolCallId: "call_write",
    state: "approval-requested",
    input: { to: "ap@northwind.io", invoice: "INV-2041", amount: "$1,240.00", attachPdf: true },
  },
  destructive: {
    type: "tool-delete_nodes",
    toolCallId: "call_delete",
    state: "approval-requested",
    input: {
      graph: "acme-customers",
      nodeIds: ["cus_4821", "cus_4822", "cus_4907"],
      cascade: true,
    },
  },
} satisfies Record<(typeof riskOptions)[number], ToolPart>;

const actionLabels = {
  read: "Search acme-customers",
  write: "Send INV-2041",
  destructive: "Delete 3 nodes",
} as const;

const decidedAt = Date.UTC(2026, 9, 17, 14, 32);

function Approved() {
  return (
    <div className="w-full max-w-xl">
      <Approval
        part={{ ...parts.write, state: "approval-responded" }}
        decision={{ approved: true, by: "Maya Chen", at: decidedAt }}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    </div>
  );
}

function DeniedWithReason() {
  return (
    <div className="w-full max-w-xl">
      <Approval
        part={{ ...parts.destructive, state: "output-denied" }}
        risk="destructive"
        decision={{
          approved: false,
          by: "Ravi Patel",
          at: decidedAt,
          reason: "Archive them instead of deleting.",
        }}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    </div>
  );
}

export default defineDemo({
  title: "Approval",
  description:
    "Pauses a tool call that writes, pays, sends or deletes and shows exactly what it will do. The approve button names the action; after a decision it shows who decided and when.",
  controls: { risk: select(riskOptions, "destructive"), decided: toggle(false) },
  playground: ({ risk, decided }) => (
    <div className="w-full max-w-xl">
      <Approval
        part={parts[risk]}
        risk={risk}
        actionLabel={actionLabels[risk]}
        decision={decided ? { approved: true, by: "Maya Chen", at: decidedAt } : undefined}
        autoFocus={false}
        onApprove={() => {}}
        onDeny={() => {}}
      />
    </div>
  ),
  code: ({ risk }) =>
    `<Approval\n  part={part}\n  risk="${risk}"\n  actionLabel="${actionLabels[risk]}"\n  decision={decision}\n  onApprove={() => addToolApprovalResponse({ id: part.toolCallId, approved: true })}\n  onDeny={(reason) => addToolApprovalResponse({ id: part.toolCallId, approved: false, reason })}\n/>`,
  props: [
    { name: "part", type: "ToolPart" },
    { name: "risk", type: '"read" | "write" | "destructive"', defaultValue: '"write"' },
    { name: "actionLabel", type: "string", defaultValue: '"Run <tool>"' },
    { name: "description", type: "string" },
    {
      name: "decision",
      type: "{ approved: boolean; by: string; at: number | string | Date; reason?: string }",
    },
    { name: "onApprove", type: "() => void" },
    { name: "onDeny", type: "(reason?: string) => void" },
    { name: "autoFocus", type: "boolean", defaultValue: "true" },
  ],
  examples: {
    Approved: {
      description: "Once decided, the inputs and buttons collapse to who decided and when.",
      component: Approved,
    },
    DeniedWithReason: {
      description: "A denial keeps the reason the agent was given.",
      component: DeniedWithReason,
    },
  },
  isNew: true,
});

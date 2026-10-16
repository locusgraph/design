import type { AgentMessage, ApprovalDecision, ToolPart } from "@locusgraph/agent-ui";

export const archiveCallId = "call_archive";

export const firstMessages: AgentMessage[] = [
  {
    id: "msg_1",
    role: "user",
    parts: [{ type: "text", text: "Which customers have not paid in 90 days?" }],
  },
  {
    id: "msg_2",
    role: "assistant",
    parts: [
      {
        type: "reasoning",
        text: "Search the graph for open invoices older than 90 days.",
        durationMs: 1800,
      },
      {
        type: "tool-search_graph",
        toolCallId: "call_search",
        state: "output-available",
        input: { graph: "acme-customers", query: "invoices overdue > 90 days" },
        output: { matches: 3 },
      },
      { type: "text", text: "Three accounts: **cus_4821**, **cus_4822** and **cus_4907**." },
    ],
  },
];

export function userMessage(id: string, text: string): AgentMessage {
  return { id, role: "user", parts: [{ type: "text", text }] };
}

export function archiveRequest(id: string): AgentMessage {
  return {
    id,
    role: "assistant",
    parts: [
      { type: "text", text: "I can archive those three accounts. This needs your approval." },
      {
        type: "tool-archive_nodes",
        toolCallId: archiveCallId,
        state: "approval-requested",
        input: { graph: "acme-customers", nodeIds: ["cus_4821", "cus_4822", "cus_4907"] },
      },
    ],
  };
}

export function settleArchive(message: AgentMessage, decision: ApprovalDecision): AgentMessage {
  const parts = message.parts.map((part) =>
    "toolCallId" in part && part.toolCallId === archiveCallId
      ? ({
          ...part,
          state: decision.approved ? "output-available" : "output-denied",
          output: decision.approved ? { archived: 3 } : undefined,
        } satisfies ToolPart)
      : part
  );
  const reply = decision.approved
    ? "Archived 3 accounts. They no longer show in reports."
    : `Left them as they are.${decision.reason ? ` Reason noted: ${decision.reason}` : ""}`;
  return { ...message, parts: [...parts, { type: "text", text: reply }] };
}

import type { AgentMessage, ApprovalDecision, RunUsage, ToolPart } from "@locusgraph/loop";

export const approvalCallId = "call_archive";

export const sampleMessages: AgentMessage[] = [
  {
    id: "msg_1",
    role: "user",
    parts: [{ type: "text", text: "Which customers have not paid in 90 days? Archive them." }],
  },
  {
    id: "msg_2",
    role: "assistant",
    parts: [
      {
        type: "reasoning",
        text: "Search the graph for open invoices older than 90 days, then ask before archiving.",
        durationMs: 1800,
      },
      {
        type: "tool-search_graph",
        toolCallId: "call_search",
        state: "output-available",
        input: { graph: "acme-customers", query: "invoices overdue > 90 days" },
        output: { matches: 3 },
      },
      {
        type: "text",
        text: "Three accounts: **cus_4821**, **cus_4822** and **cus_4907**. Archiving them needs your approval.",
      },
      {
        type: "tool-archive_nodes",
        toolCallId: approvalCallId,
        state: "approval-requested",
        input: { graph: "acme-customers", nodeIds: ["cus_4821", "cus_4822", "cus_4907"] },
      },
    ],
  },
];

export const sampleUsage: RunUsage[] = [
  { inputTokens: 18_400, outputTokens: 620, costMicroUsd: 64_500, model: "Sonnet" },
  { inputTokens: 21_900, outputTokens: 410, costMicroUsd: 71_800, model: "Sonnet" },
];

export const sampleContext = { usedTokens: 40_300, limitTokens: 200_000 };

export function userMessage(id: string, text: string): AgentMessage {
  return { id, role: "user", parts: [{ type: "text", text }] };
}

export function assistantMessage(id: string, text: string): AgentMessage {
  return { id, role: "assistant", parts: [{ type: "text", text }] };
}

export function decisionReply(decision: ApprovalDecision) {
  if (decision.approved) {
    return "Archived 3 accounts. They no longer show in reports.";
  }
  return `Left them as they are.${decision.reason ? ` Reason noted: ${decision.reason}` : ""}`;
}

export function settleApproval(message: AgentMessage, decision: ApprovalDecision): AgentMessage {
  const parts = message.parts.map((part) =>
    "toolCallId" in part && part.toolCallId === approvalCallId
      ? ({
          ...part,
          state: decision.approved ? "output-available" : "output-denied",
          output: decision.approved ? { archived: 3 } : undefined,
        } satisfies ToolPart)
      : part
  );
  return { ...message, parts };
}

export function isAwaitingApproval(messages: AgentMessage[]) {
  return messages.some((message) =>
    message.parts.some((part) => "toolCallId" in part && part.state === "approval-requested")
  );
}

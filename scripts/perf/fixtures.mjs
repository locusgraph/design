const replyText = [
  "The research agent spent **$4.12** on this run. Most of it went to re-reading the same papers.",
  "- Recall the summary before reading\n- Store the new summary with the paper id\n- Skip papers older than `30d`",
  "That keeps the context under **12k tokens** and the cost under a cent per paper.",
].join("\n\n");

const thinkingText =
  "The user wants the weekly cost. Group runs by agent, sum cost, then compare with last week.";

function toolPart(index) {
  return {
    type: "tool-query_spend",
    toolCallId: `call_${index}`,
    state: "output-available",
    input: { agent: "research", range: "7d" },
    output: { runs: 318, costMicroUsd: 42_180_000 },
  };
}

function assistantParts(index) {
  const parts = [];
  if (index % 3 === 0) parts.push({ type: "reasoning", text: thinkingText, durationMs: 2400 });
  if (index % 2 === 0) parts.push(toolPart(index));
  parts.push({ type: "text", text: replyText });
  return parts;
}

export function chatMessages(count) {
  return Array.from({ length: count }, (_, index) =>
    index % 2 === 0
      ? {
          id: `msg_${index}`,
          role: "user",
          parts: [{ type: "text", text: `Question ${index}: what did the agent spend?` }],
        }
      : { id: `msg_${index}`, role: "assistant", parts: assistantParts(index) }
  );
}

export const benchNow = new Date(2026, 9, 17, 12).getTime();

export function historyThreads(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: `thr_${index}`,
    title: `Conversation ${index} about agent spend`,
    updatedAt: new Date(benchNow - index * 3_600_000 * 2).toISOString(),
  }));
}

const risks = ["read", "write", "destructive"];

export function inboxItems(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: `apr_${index}`,
    title: `Send invoice INV-${2000 + index}`,
    runName: "Billing agent",
    risk: risks[index % 3],
    requestedAt: benchNow - index * 60_000,
    summary: "$1,240.00 to ops@acme.dev",
  }));
}

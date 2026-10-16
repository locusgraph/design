export type AgentRole = "user" | "assistant" | "system";

export type StreamState = "streaming" | "done";

export type TextPart = { type: "text"; text: string; state?: StreamState };

export type ReasoningPart = {
  type: "reasoning";
  text: string;
  state?: StreamState;
  durationMs?: number;
};

export type ToolState =
  | "input-streaming"
  | "input-available"
  | "approval-requested"
  | "approval-responded"
  | "output-available"
  | "output-error"
  | "output-denied";

export type ToolPart = {
  type: `tool-${string}` | "dynamic-tool";
  toolCallId: string;
  toolName?: string;
  state: ToolState;
  input?: unknown;
  output?: unknown;
  errorText?: string;
};

export type SourceUrlPart = { type: "source-url"; sourceId: string; url: string; title?: string };

export type FilePart = { type: "file"; mediaType: string; url: string; filename?: string };

export type MessagePart = TextPart | ReasoningPart | ToolPart | SourceUrlPart | FilePart;

export type AgentMessage = { id: string; role: AgentRole; parts: MessagePart[] };

export type RiskLevel = "read" | "write" | "destructive";

export type StepStatus = "pending" | "running" | "done" | "failed" | "skipped";

export type AgentStep = { id: string; title: string; status: StepStatus; detail?: string };

export type Citation = { index: number; title: string; url?: string; snippet?: string };

export type MemoryRef = {
  id: string;
  label: string;
  kind?: string;
  relevance?: number;
  snippet?: string;
};

export type RunUsage = {
  inputTokens: number;
  outputTokens: number;
  costMicroUsd: number;
  model?: string;
  failed?: boolean;
};

export function toolNameOf(part: ToolPart): string {
  return part.toolName ?? part.type.replace(/^tool-/, "");
}

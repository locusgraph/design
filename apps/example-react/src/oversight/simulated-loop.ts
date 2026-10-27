export type ToolCall = { runId: string; toolName: string; input: Record<string, unknown> };

export type BeforeToolResult = { wait: { question: string } } | undefined;

export type ResumeAnswer = { answer: "approve" | "deny"; reason?: string };

export type RunEvent = { id: number; text: string };

type SimulatedLoopOptions = {
  beforeTool: (call: ToolCall) => BeforeToolResult;
  onWait: (call: ToolCall, question: string) => void;
  onEvent: (event: RunEvent) => void;
};

export function createSimulatedLoop({ beforeTool, onWait, onEvent }: SimulatedLoopOptions) {
  const pending = new Map<string, ToolCall[]>();
  let eventCount = 0;
  const emit = (text: string) => {
    eventCount += 1;
    onEvent({ id: eventCount, text });
  };

  const next = (runId: string) => {
    const queue = pending.get(runId) ?? [];
    const call = queue[0];
    if (!call) {
      pending.delete(runId);
      emit(`${runId} finished`);
      return;
    }
    const before = beforeTool(call);
    if (before) {
      emit(`${call.toolName} waits for a person`);
      onWait(call, before.wait.question);
      return;
    }
    queue.shift();
    emit(`${call.toolName} ran`);
    next(runId);
  };

  return {
    start(runId: string, calls: ToolCall[]) {
      pending.set(runId, [...calls]);
      emit(`${runId} started`);
      next(runId);
    },
    resume(runId: string, { answer, reason }: ResumeAnswer) {
      const call = pending.get(runId)?.shift();
      if (!call) return;
      emit(
        answer === "approve"
          ? `${call.toolName} ran after approval`
          : `${call.toolName} skipped${reason ? `: ${reason}` : ""}`
      );
      next(runId);
    },
  };
}

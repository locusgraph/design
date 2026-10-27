import { Button } from "@locusgraph/components";
import {
  ApprovalGate,
  type ApprovalRequest,
  DecisionLog,
  type RiskLevel,
  useApprovalGate,
} from "@locusgraph/loop";
import { useEffect, useRef, useState } from "react";
import { createSimulatedLoop, type RunEvent, type ToolCall } from "./simulated-loop";

const risks: Record<string, RiskLevel> = { send_email: "write", delete_drafts: "destructive" };

function reconciliationCalls(runId: string): ToolCall[] {
  return [
    { runId, toolName: "read_invoices", input: { month: "2026-10" } },
    { runId, toolName: "send_email", input: { to: "finance@example.com", subject: "October" } },
    { runId, toolName: "send_email", input: { to: "vendors@example.com", subject: "Reminder" } },
    { runId, toolName: "delete_drafts", input: { count: 12 } },
  ];
}

function approvalFor(call: ToolCall, question: string): ApprovalRequest {
  return {
    toolName: call.toolName,
    input: call.input,
    risk: risks[call.toolName],
    title: question,
  };
}

type Ask = (request: ApprovalRequest) => Promise<{ approved: boolean; reason?: string }>;

function createRun(ask: Ask, onEvent: (event: RunEvent) => void) {
  const loop = createSimulatedLoop({
    beforeTool: (call) =>
      call.toolName in risks ? { wait: { question: `Run ${call.toolName}?` } } : undefined,
    onWait: async (call, question) => {
      const decision = await ask(approvalFor(call, question));
      loop.resume(
        call.runId,
        decision.approved ? { answer: "approve" } : { answer: "deny", reason: decision.reason }
      );
    },
    onEvent,
  });
  return loop;
}

export function SpendGraphPause() {
  const gate = useApprovalGate();
  const askRef = useRef<Ask>(gate.ask);
  useEffect(() => {
    askRef.current = gate.ask;
  });
  const [events, setEvents] = useState<RunEvent[]>([]);
  const [runCount, setRunCount] = useState(0);
  const [loop] = useState(() =>
    createRun(
      (request) => askRef.current(request),
      (event) => setEvents((current) => [...current, event])
    )
  );
  const start = () => {
    const runId = `run_${runCount + 1}`;
    setRunCount(runCount + 1);
    setEvents([]);
    gate.resetRun();
    loop.start(runId, reconciliationCalls(runId));
  };
  return (
    <div className="flex flex-col gap-4">
      <Button size="sm" className="self-start" onClick={start}>
        Start run
      </Button>
      <ol className="flex flex-col gap-1 font-mono text-2xs text-muted-foreground">
        {events.map((event) => (
          <li key={event.id}>{event.text}</li>
        ))}
      </ol>
      <ApprovalGate gate={gate} />
      <DecisionLog entries={gate.log} />
    </div>
  );
}

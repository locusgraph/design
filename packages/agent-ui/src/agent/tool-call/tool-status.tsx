import type { ToolState } from "../../types";
import { StatusDot, type StatusTone } from "../shared/status-dot";

export const toolStateLabels: Record<ToolState, string> = {
  "input-streaming": "Preparing",
  "input-available": "Running",
  "approval-requested": "Waiting for approval",
  "approval-responded": "Approved",
  "output-available": "Done",
  "output-error": "Failed",
  "output-denied": "Denied",
};

const toolStateTones: Record<ToolState, StatusTone> = {
  "input-streaming": "waiting",
  "input-available": "waiting",
  "approval-requested": "waiting",
  "approval-responded": "done",
  "output-available": "done",
  "output-error": "danger",
  "output-denied": "idle",
};

export function isToolBusy(state: ToolState) {
  return state === "input-streaming" || state === "input-available";
}

export function ToolStatus({ state }: { state: ToolState }) {
  return (
    <span
      data-slot="tool-status"
      data-state={state}
      aria-live="polite"
      className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] tracking-wide text-muted-foreground uppercase"
    >
      <StatusDot tone={toolStateTones[state]} />
      {toolStateLabels[state]}
    </span>
  );
}

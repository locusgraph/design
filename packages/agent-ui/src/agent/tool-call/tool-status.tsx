import { Badge, cn } from "@locusgraph/components";
import { LoaderCircleIcon } from "lucide-react";
import type { ToolState } from "../../types";

export const toolStateLabels: Record<ToolState, string> = {
  "input-streaming": "Preparing",
  "input-available": "Running",
  "approval-requested": "Waiting for approval",
  "approval-responded": "Approved",
  "output-available": "Done",
  "output-error": "Failed",
  "output-denied": "Denied",
};

const toolStateTones: Record<ToolState, string> = {
  "input-streaming": "text-warn",
  "input-available": "text-warn",
  "approval-requested": "text-warn",
  "approval-responded": "text-foreground",
  "output-available": "text-foreground",
  "output-error": "text-destructive border-destructive/40",
  "output-denied": "text-muted-foreground",
};

export function isToolBusy(state: ToolState) {
  return state === "input-streaming" || state === "input-available";
}

export function ToolStatus({ state }: { state: ToolState }) {
  return (
    <Badge
      variant="outline"
      data-slot="tool-status"
      data-state={state}
      aria-live="polite"
      className={cn("font-mono text-[11.5px] font-normal", toolStateTones[state])}
    >
      {isToolBusy(state) && <LoaderCircleIcon aria-hidden className="motion-safe:animate-spin" />}
      {toolStateLabels[state]}
    </Badge>
  );
}

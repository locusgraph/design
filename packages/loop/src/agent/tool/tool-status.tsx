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

const visibleStateWordClasses: Partial<Record<ToolState, string>> = {
  "approval-requested": "font-medium text-warn",
  "output-error": "font-medium text-destructive",
  "output-denied": "font-medium text-muted-foreground",
};

export function isToolBusy(state: ToolState) {
  return state === "input-streaming" || state === "input-available";
}

export function showsStateWord(state: ToolState) {
  return state in visibleStateWordClasses;
}

export function humanToolName(name: string) {
  return name.replace(/[._-]+/g, " ").trim();
}

export function ToolStatus({ state }: { state: ToolState }) {
  const visibleClass = visibleStateWordClasses[state];
  return (
    <span
      data-slot="tool-status"
      data-state={state}
      aria-live="polite"
      className={visibleClass ?? "sr-only"}
    >
      {toolStateLabels[state]}
    </span>
  );
}

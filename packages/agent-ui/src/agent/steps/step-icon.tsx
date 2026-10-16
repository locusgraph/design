import { cn } from "@locusgraph/components";
import { CheckIcon, LoaderCircleIcon, MinusIcon, XIcon } from "lucide-react";
import type { StepStatus } from "../../types";

export const stepStatusLabels: Record<StepStatus, string> = {
  pending: "Pending",
  running: "Running",
  done: "Done",
  failed: "Failed",
  skipped: "Skipped",
};

const stepIconFrames: Record<StepStatus, string> = {
  pending: "bg-card ring-1 ring-border ring-inset",
  running: "bg-card text-amber-500",
  done: "bg-emerald-500 text-white dark:text-background",
  failed: "bg-destructive text-white",
  skipped: "bg-muted text-muted-foreground",
};

function StepGlyph({ status }: { status: StepStatus }) {
  if (status === "running") return <LoaderCircleIcon className="size-4 motion-safe:animate-spin" />;
  if (status === "done") return <CheckIcon className="size-2.5" strokeWidth={3} />;
  if (status === "failed") return <XIcon className="size-2.5" strokeWidth={3} />;
  if (status === "skipped") return <MinusIcon className="size-2.5" strokeWidth={3} />;
  return null;
}

export function StepIcon({ status }: { status: StepStatus }) {
  return (
    <span
      aria-hidden
      data-slot="step-icon"
      className={cn(
        "relative z-10 mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
        stepIconFrames[status]
      )}
    >
      <StepGlyph status={status} />
    </span>
  );
}

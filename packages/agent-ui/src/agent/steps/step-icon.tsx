import { cn } from "@locusgraph/components";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleMinusIcon,
  CircleXIcon,
  LoaderCircleIcon,
} from "lucide-react";
import type { StepStatus } from "../../types";

export const stepStatusLabels: Record<StepStatus, string> = {
  pending: "Pending",
  running: "Running",
  done: "Done",
  failed: "Failed",
  skipped: "Skipped",
};

const stepIcons = {
  pending: CircleDashedIcon,
  running: LoaderCircleIcon,
  done: CircleCheckIcon,
  failed: CircleXIcon,
  skipped: CircleMinusIcon,
} satisfies Record<StepStatus, unknown>;

const stepIconTones: Record<StepStatus, string> = {
  pending: "text-muted-foreground",
  running: "text-warn motion-safe:animate-spin",
  done: "text-foreground",
  failed: "text-destructive",
  skipped: "text-muted-foreground",
};

export function StepIcon({ status }: { status: StepStatus }) {
  const Icon = stepIcons[status];
  return (
    <Icon
      aria-hidden
      data-slot="step-icon"
      className={cn("mt-0.5 size-4 shrink-0", stepIconTones[status])}
    />
  );
}

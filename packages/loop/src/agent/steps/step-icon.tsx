import { cn } from "@locusgraph/components";
import {
  Check as CheckIcon,
  CircleNotch as LoaderCircleIcon,
  Minus as MinusIcon,
  X as XIcon,
} from "@phosphor-icons/react/ssr";
import type { StepStatus } from "../../types";

export const stepStatusLabels: Record<StepStatus, string> = {
  pending: "Pending",
  running: "Running",
  done: "Done",
  failed: "Failed",
  skipped: "Skipped",
};

const stepIconTones: Record<StepStatus, string> = {
  pending: "text-faint",
  running: "text-warn",
  done: "text-good",
  failed: "text-destructive",
  skipped: "text-faint",
};

function StepGlyph({ status }: { status: StepStatus }) {
  if (status === "running")
    return <LoaderCircleIcon weight="bold" aria-hidden className="motion-safe:animate-spin" />;
  if (status === "done") return <CheckIcon weight="bold" aria-hidden />;
  if (status === "failed") return <XIcon weight="bold" aria-hidden />;
  if (status === "skipped") return <MinusIcon weight="bold" aria-hidden />;
  return <span className="size-1.5 rounded-full bg-current" />;
}

type StepIconProps = { status: StepStatus; current?: boolean };

export function StepIcon({ status, current = false }: StepIconProps) {
  return (
    <span
      aria-hidden
      data-slot="step-icon"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center [&_svg]:size-3.5",
        stepIconTones[status],
        current && status === "pending" && "text-foreground"
      )}
    >
      <StepGlyph status={status} />
    </span>
  );
}

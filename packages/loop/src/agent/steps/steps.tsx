import { cn } from "@locusgraph/components";
import { ListChecks as ListChecksIcon } from "@phosphor-icons/react/ssr";
import { lineIconClass, lineRowClass } from "../../shared/line";
import type { AgentStep, StepStatus } from "../../types";
import { StepIcon, stepStatusLabels } from "./step-icon";

export type StepsProps = {
  steps: AgentStep[];
  title?: string;
  className?: string;
};

const stepTitleTones: Record<StepStatus, string> = {
  pending: "text-faint",
  running: "font-medium text-foreground",
  done: "text-muted-foreground",
  failed: "font-medium text-foreground",
  skipped: "text-faint line-through decoration-faint",
};

function currentStepId(steps: AgentStep[]) {
  const running = steps.find((step) => step.status === "running");
  if (running) return running.id;
  if (steps.some((step) => step.status === "failed")) return undefined;
  return steps.find((step) => step.status === "pending")?.id;
}

function progressLabel(steps: AgentStep[]) {
  const done = steps.filter((step) => step.status === "done").length;
  return `${done} of ${steps.length} done`;
}

function StepRow({ step, current }: { step: AgentStep; current: boolean }) {
  return (
    <li
      data-slot="step"
      data-status={step.status}
      aria-current={current ? "step" : undefined}
      className="flex gap-2 py-1"
    >
      <span className="flex h-5 items-center">
        <StepIcon status={step.status} current={current} />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span
          className={cn(
            "leading-5",
            stepTitleTones[step.status],
            current && step.status === "pending" && "text-foreground"
          )}
        >
          {step.title}
          <span className="sr-only"> ({stepStatusLabels[step.status]})</span>
        </span>
        {step.detail && (
          <span
            className={cn("text-xs text-faint", step.status === "failed" && "text-destructive")}
          >
            {step.detail}
          </span>
        )}
      </div>
    </li>
  );
}

export function Steps({ steps, title = "Plan", className }: StepsProps) {
  const currentId = currentStepId(steps);
  return (
    <section
      data-slot="steps"
      aria-label={title}
      className={cn("flex min-w-0 flex-col", className)}
    >
      <header className={lineRowClass}>
        <span aria-hidden className={lineIconClass}>
          <ListChecksIcon weight="bold" aria-hidden />
        </span>
        <span className="truncate">{title}</span>
        <span className="shrink-0 text-faint tabular-nums">{progressLabel(steps)}</span>
      </header>
      <ol className="flex min-w-0 flex-col text-sm">
        {steps.map((step) => (
          <StepRow key={step.id} step={step} current={step.id === currentId} />
        ))}
      </ol>
    </section>
  );
}

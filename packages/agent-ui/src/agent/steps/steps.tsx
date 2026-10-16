import { cn } from "@locusgraph/components";
import type { AgentStep, StepStatus } from "../../types";
import { StepIcon, stepStatusLabels } from "./step-icon";

export type StepsProps = {
  steps: AgentStep[];
  title?: string;
  className?: string;
};

const stepTitleTones: Record<StepStatus, string> = {
  pending: "text-muted-foreground",
  running: "text-foreground font-medium",
  done: "text-foreground",
  failed: "text-destructive",
  skipped: "text-muted-foreground line-through",
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

export function Steps({ steps, title = "Plan", className }: StepsProps) {
  const currentId = currentStepId(steps);
  return (
    <section
      data-slot="steps"
      aria-label={title}
      className={cn("flex flex-col rounded-none border border-border", className)}
    >
      <header className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <span aria-live="polite" className="font-mono text-[11.5px] text-muted-foreground">
          {progressLabel(steps)}
        </span>
      </header>
      <ol className="flex flex-col">
        {steps.map((step) => {
          const current = step.id === currentId;
          return (
            <li
              key={step.id}
              data-slot="step"
              data-status={step.status}
              aria-current={current ? "step" : undefined}
              className={cn(
                "flex gap-3 border-b border-border px-3 py-2.5 last:border-b-0",
                current && "bg-muted/50"
              )}
            >
              <StepIcon status={step.status} />
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className={cn("text-sm", stepTitleTones[step.status])}>
                  {step.title}
                  <span className="sr-only"> ({stepStatusLabels[step.status]})</span>
                </span>
                {step.detail && (
                  <span className="text-xs text-muted-foreground">{step.detail}</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

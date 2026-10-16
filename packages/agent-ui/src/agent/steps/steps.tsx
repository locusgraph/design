import { cn } from "@locusgraph/components";
import { ListChecksIcon } from "lucide-react";
import { ApprovalPanel, PanelHeader, type PanelTone } from "../../shared/panel";
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
  failed: "text-destructive font-medium",
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

function progressTone(steps: AgentStep[]): PanelTone {
  if (steps.some((step) => step.status === "failed")) return "danger";
  if (steps.some((step) => step.status === "running")) return "waiting";
  const settled = steps.every((step) => step.status === "done" || step.status === "skipped");
  return steps.length > 0 && settled ? "done" : "idle";
}

function StepRow({ step, current, last }: { step: AgentStep; current: boolean; last: boolean }) {
  return (
    <li
      data-slot="step"
      data-status={step.status}
      aria-current={current ? "step" : undefined}
      className="relative flex gap-3 pb-4 last:pb-0"
    >
      {!last && (
        <span aria-hidden className="absolute top-5 bottom-0.5 left-[7.5px] w-px bg-border" />
      )}
      <StepIcon status={step.status} />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className={cn("text-sm leading-snug", stepTitleTones[step.status])}>
          {step.title}
          <span className="sr-only"> ({stepStatusLabels[step.status]})</span>
        </span>
        {step.detail && (
          <span
            className={cn(
              "font-mono text-xs text-muted-foreground",
              step.status === "failed" && "text-destructive/80"
            )}
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
    <ApprovalPanel data-slot="steps" aria-label={title} className={className}>
      <PanelHeader
        icon={<ListChecksIcon aria-hidden />}
        eyebrow={title}
        status={progressLabel(steps)}
        tone={progressTone(steps)}
      />
      <ol className="flex flex-col px-5 pt-4 pb-5">
        {steps.map((step, position) => (
          <StepRow
            key={step.id}
            step={step}
            current={step.id === currentId}
            last={position === steps.length - 1}
          />
        ))}
      </ol>
    </ApprovalPanel>
  );
}

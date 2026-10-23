import { cn } from "@locusgraph/components";
import { formatMicroUsd } from "@locusgraph/utils";
import type { RunUsage, StepStatus } from "../../types";
import { formatDuration } from "./usage-totals";

export type CostStepStatus = StepStatus | "retried";

export type CostStep = {
  id: string;
  title: string;
  status: CostStepStatus;
  usage: RunUsage;
  durationMs?: number;
};

export function isWastedStep(step: CostStep): boolean {
  return step.status === "failed" || step.usage.failed === true;
}

function barTone(step: CostStep): string {
  if (isWastedStep(step)) return "bg-destructive";
  if (step.status === "retried") return "bg-warn/40";
  if (step.status === "running") return "bg-warn/60 motion-safe:animate-pulse";
  return "bg-primary/35";
}

const statusMark: Partial<Record<CostStepStatus, { text: string; className: string }>> = {
  failed: { text: "Failed", className: "text-destructive" },
  retried: { text: "Retried", className: "text-warn" },
  running: { text: "Running", className: "text-muted-foreground motion-safe:shimmer" },
  skipped: { text: "Skipped", className: "font-normal text-faint" },
};

function barWidth(cost: number, maxCost: number): number {
  if (maxCost <= 0) return 0;
  return Math.max((cost / maxCost) * 100, cost > 0 ? 2 : 0);
}

export function StepCostRow({
  step,
  maxCost,
  totalCost,
}: {
  step: CostStep;
  maxCost: number;
  totalCost: number;
}) {
  const cost = step.usage.costMicroUsd;
  const wasted = isWastedStep(step);
  const share = totalCost > 0 ? Math.round((cost / totalCost) * 100) : 0;
  const mark = wasted ? statusMark.failed : statusMark[step.status];
  return (
    <li
      data-slot="step-cost-row"
      data-status={step.status}
      data-wasted={wasted || undefined}
      aria-label={`${step.title}: ${formatMicroUsd(cost)}, ${share}% of run${mark ? `, ${mark.text.toLowerCase()}` : ""}`}
      className="grid grid-cols-[minmax(0,11rem)_1fr_3.5rem_4.5rem] items-center gap-x-4 gap-y-1.5 px-5 py-1.5 text-sm tabular-nums max-sm:grid-cols-[1fr_auto_auto]"
    >
      <span className="flex min-w-0 items-baseline gap-2">
        <span className={cn("truncate", step.status === "skipped" && "text-faint")}>
          {step.title}
        </span>
        {mark && (
          <span className={cn("shrink-0 text-xs font-medium", mark.className)}>{mark.text}</span>
        )}
      </span>
      <span
        aria-hidden
        className="relative h-1.5 w-full bg-muted-foreground/10 max-sm:col-span-3 max-sm:row-start-2"
      >
        <span
          className={cn(
            "absolute inset-y-0 left-0 transition-[width] duration-300 motion-reduce:transition-none",
            barTone(step)
          )}
          style={{ width: `${barWidth(cost, maxCost)}%` }}
        />
      </span>
      <span className="text-right text-xs text-faint">
        {step.durationMs !== undefined ? formatDuration(step.durationMs) : ""}
      </span>
      <span className={cn("text-right text-xs", wasted && "text-destructive")}>
        {formatMicroUsd(cost)}
      </span>
    </li>
  );
}

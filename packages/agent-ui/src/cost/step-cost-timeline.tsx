import { formatCount, formatMicroUsd, pluralize } from "@locusgraph/utils";
import { ChartNoAxesGanttIcon } from "lucide-react";
import { ApprovalPanel, PanelHeader, type PanelTone } from "../shared/panel";
import { type CostStep, isWastedStep, StepCostRow } from "./shared/step-cost-row";
import { formatDuration, sumUsage } from "./shared/usage-totals";

export type { CostStep, CostStepStatus } from "./shared/step-cost-row";

export type StepCostTimelineProps = {
  steps: CostStep[];
  label?: string;
  emptyText?: string;
  className?: string;
};

export function stepCostTotals(steps: CostStep[]) {
  const totals = sumUsage(steps.map((step) => step.usage));
  const wastedMicroUsd = steps
    .filter(isWastedStep)
    .reduce((sum, step) => sum + step.usage.costMicroUsd, 0);
  const durationMs = steps.reduce((sum, step) => sum + (step.durationMs ?? 0), 0);
  return { ...totals, wastedMicroUsd, durationMs };
}

type StepTotals = ReturnType<typeof stepCostTotals>;

function timelineTone(steps: CostStep[], totals: StepTotals): PanelTone {
  if (steps.some((step) => step.status === "running")) return "waiting";
  if (totals.wastedMicroUsd > 0) return "danger";
  return steps.length > 0 ? "done" : "idle";
}

function Totals({ totals }: { totals: StepTotals }) {
  return (
    <div data-slot="step-cost-totals" className="flex flex-col gap-1 px-5 pt-2 pb-4">
      <span className="text-2xl font-semibold tracking-tight tabular-nums">
        {formatMicroUsd(totals.costMicroUsd)}
      </span>
      <span className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground tabular-nums">
        <span>
          {formatCount(totals.inputTokens)} in · {formatCount(totals.outputTokens)} out
        </span>
        {totals.durationMs > 0 && <span>{formatDuration(totals.durationMs)}</span>}
        {totals.wastedMicroUsd > 0 && (
          <span className="text-destructive">
            Wasted on failures {formatMicroUsd(totals.wastedMicroUsd)}
          </span>
        )}
      </span>
    </div>
  );
}

export function StepCostTimeline({
  steps,
  label = "Cost by step",
  emptyText = "No steps have run yet.",
  className,
}: StepCostTimelineProps) {
  const totals = stepCostTotals(steps);
  const maxCost = Math.max(0, ...steps.map((step) => step.usage.costMicroUsd));
  return (
    <ApprovalPanel data-slot="step-cost-timeline" aria-label={label} className={className}>
      <PanelHeader
        icon={<ChartNoAxesGanttIcon />}
        eyebrow={label}
        status={steps.length > 0 ? pluralize(steps.length, "step") : undefined}
        tone={timelineTone(steps, totals)}
      />
      {steps.length === 0 ? (
        <p className="px-5 pt-2 pb-5 text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <>
          <Totals totals={totals} />
          <ol className="flex flex-col divide-y divide-border border-t border-border">
            {steps.map((step) => (
              <StepCostRow
                key={step.id}
                step={step}
                maxCost={maxCost}
                totalCost={totals.costMicroUsd}
              />
            ))}
          </ol>
        </>
      )}
    </ApprovalPanel>
  );
}

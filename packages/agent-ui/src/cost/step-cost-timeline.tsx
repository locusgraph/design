import { Badge, cn, RuleGrid, RuleGridCell, RuleGridLabel } from "@locusgraph/components";
import { formatCount, formatMicroUsd } from "@locusgraph/utils";
import type { RunUsage, StepStatus } from "../types";
import { formatDuration, sumUsage } from "./shared/usage-totals";

export type CostStepStatus = StepStatus | "retried";

export type CostStep = {
  id: string;
  title: string;
  status: CostStepStatus;
  usage: RunUsage;
  durationMs?: number;
};

export type StepCostTimelineProps = {
  steps: CostStep[];
  label?: string;
  emptyText?: string;
  className?: string;
};

function isWasted(step: CostStep): boolean {
  return step.status === "failed" || step.usage.failed === true;
}

function barTone(step: CostStep): string {
  if (isWasted(step)) return "bg-destructive";
  if (step.status === "retried") return "bg-warn";
  return "bg-primary";
}

const statusMark: Partial<Record<CostStepStatus, { text: string; className: string }>> = {
  failed: { text: "Failed", className: "text-destructive" },
  retried: { text: "Retried", className: "text-warn" },
  running: { text: "Running", className: "text-muted-foreground" },
  skipped: { text: "Skipped", className: "text-muted-foreground" },
};

export function stepCostTotals(steps: CostStep[]) {
  const totals = sumUsage(steps.map((step) => step.usage));
  const wastedMicroUsd = steps
    .filter(isWasted)
    .reduce((sum, step) => sum + step.usage.costMicroUsd, 0);
  const durationMs = steps.reduce((sum, step) => sum + (step.durationMs ?? 0), 0);
  return { ...totals, wastedMicroUsd, durationMs };
}

function StepRow({
  step,
  maxCost,
  totalCost,
}: {
  step: CostStep;
  maxCost: number;
  totalCost: number;
}) {
  const cost = step.usage.costMicroUsd;
  const width = maxCost > 0 ? Math.max((cost / maxCost) * 100, cost > 0 ? 2 : 0) : 0;
  const share = totalCost > 0 ? Math.round((cost / totalCost) * 100) : 0;
  const mark = isWasted(step) ? statusMark.failed : statusMark[step.status];
  return (
    <li
      data-slot="step-cost-row"
      data-status={step.status}
      data-wasted={isWasted(step) || undefined}
      aria-label={`${step.title}: ${formatMicroUsd(cost)}, ${share}% of run${mark ? `, ${mark.text.toLowerCase()}` : ""}`}
      className="grid grid-cols-[minmax(0,10rem)_1fr_auto] items-center gap-x-4 gap-y-1 py-1.5 text-sm max-sm:grid-cols-[1fr_auto]"
    >
      <span className="flex min-w-0 items-center gap-2">
        <span className={cn("truncate", isWasted(step) && "text-destructive")}>{step.title}</span>
        {mark && (
          <Badge variant="outline" className={cn("text-[11px] font-normal", mark.className)}>
            {mark.text}
          </Badge>
        )}
      </span>
      <span
        aria-hidden
        className="relative h-2 w-full bg-muted max-sm:col-span-2 max-sm:row-start-2"
      >
        <span
          className={cn(
            "absolute inset-y-0 left-0 transition-[width] duration-300 motion-reduce:transition-none",
            barTone(step)
          )}
          style={{ width: `${width}%` }}
        />
      </span>
      <span className="flex items-baseline gap-2 text-right tabular-nums">
        {step.durationMs !== undefined && (
          <span className="font-mono text-[11.5px] text-muted-foreground">
            {formatDuration(step.durationMs)}
          </span>
        )}
        <span className={cn(isWasted(step) && "text-destructive")}>{formatMicroUsd(cost)}</span>
      </span>
    </li>
  );
}

function Totals({ totals }: { totals: ReturnType<typeof stepCostTotals> }) {
  return (
    <dl data-slot="step-cost-totals" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      <div className="flex flex-col gap-0.5">
        <dt className="font-mono text-[11.5px] text-muted-foreground">Total</dt>
        <dd className="font-heading text-xl font-semibold tabular-nums">
          {formatMicroUsd(totals.costMicroUsd)}
        </dd>
      </div>
      <div className="flex flex-col gap-0.5">
        <dt className="font-mono text-[11.5px] text-muted-foreground">Tokens</dt>
        <dd className="tabular-nums">
          {formatCount(totals.inputTokens)} in · {formatCount(totals.outputTokens)} out
        </dd>
      </div>
      {totals.durationMs > 0 && (
        <div className="flex flex-col gap-0.5">
          <dt className="font-mono text-[11.5px] text-muted-foreground">Time</dt>
          <dd className="tabular-nums">{formatDuration(totals.durationMs)}</dd>
        </div>
      )}
      {totals.wastedMicroUsd > 0 && (
        <div className="flex flex-col gap-0.5 text-destructive">
          <dt className="font-mono text-[11.5px]">Wasted on failures</dt>
          <dd className="tabular-nums">{formatMicroUsd(totals.wastedMicroUsd)}</dd>
        </div>
      )}
    </dl>
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
    <RuleGrid columns={1} data-slot="step-cost-timeline" className={className}>
      <RuleGridCell className="gap-4">
        <RuleGridLabel>{label}</RuleGridLabel>
        {steps.length === 0 ? (
          <p className="text-sm text-muted-foreground">{emptyText}</p>
        ) : (
          <>
            <Totals totals={totals} />
            <ol className="flex flex-col divide-y divide-border">
              {steps.map((step) => (
                <StepRow
                  key={step.id}
                  step={step}
                  maxCost={maxCost}
                  totalCost={totals.costMicroUsd}
                />
              ))}
            </ol>
          </>
        )}
      </RuleGridCell>
    </RuleGrid>
  );
}

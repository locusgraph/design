import { cn } from "@locusgraph/components";
import { formatMicroUsd } from "@locusgraph/utils";
import { ChartBarHorizontal as ChartNoAxesGanttIcon } from "@phosphor-icons/react/ssr";
import { lineIconClass, lineRowClass } from "../shared/line";
import { type CostStep, isWastedStep, StepCostRow } from "./shared/step-cost-row";
import { formatDuration, formatTokensShort, sumUsage } from "./shared/usage-totals";

export type { CostStep, CostStepStatus } from "./shared/step-cost-row";

export type CostStepsProps = {
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

function Totals({ totals }: { totals: StepTotals }) {
  return (
    <div data-slot="step-cost-totals" className="flex items-baseline gap-3 pb-2 pl-6 tabular-nums">
      <span className="text-xl font-semibold tracking-tight text-foreground">
        {formatMicroUsd(totals.costMicroUsd)}
      </span>
      <span className="text-xs text-faint">
        {formatTokensShort(totals.inputTokens)} in · {formatTokensShort(totals.outputTokens)} out
        {totals.durationMs > 0 && ` · ${formatDuration(totals.durationMs)}`}
      </span>
    </div>
  );
}

export function CostSteps({
  steps,
  label = "Cost by step",
  emptyText = "No steps have run yet.",
  className,
}: CostStepsProps) {
  const totals = stepCostTotals(steps);
  const maxCost = Math.max(0, ...steps.map((step) => step.usage.costMicroUsd));
  const running = steps.some((step) => step.status === "running");
  return (
    <section
      data-slot="cost-steps"
      aria-label={label}
      className={cn("flex min-w-0 flex-col", className)}
    >
      <header className={lineRowClass}>
        <span aria-hidden className={lineIconClass}>
          <ChartNoAxesGanttIcon weight="bold" aria-hidden />
        </span>
        <span className="truncate">{label}</span>
        {running && <span className="shrink-0 text-warn motion-safe:shimmer">Running</span>}
      </header>
      {steps.length === 0 ? (
        <p className="pl-6 text-sm text-faint">{emptyText}</p>
      ) : (
        <>
          <Totals totals={totals} />
          <ol className="flex flex-col pl-6">
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
    </section>
  );
}

import { cn } from "@locusgraph/components";
import { formatCount, formatMicroUsd, pluralize } from "@locusgraph/utils";
import { CoinsIcon } from "lucide-react";
import { ApprovalPanel, PanelHeader } from "../shared/panel";
import type { RunUsage } from "../types";
import { sumUsage, type UsageTotals } from "./shared/usage-totals";

export type RunCostProps = {
  usage: RunUsage | RunUsage[];
  variant?: "compact" | "detailed";
  label?: string;
  className?: string;
};

function attemptsOf(usage: RunUsage | RunUsage[]): RunUsage[] {
  return Array.isArray(usage) ? usage : [usage];
}

function modelsOf(attempts: RunUsage[]): string | undefined {
  const models = [...new Set(attempts.map((attempt) => attempt.model).filter(Boolean))];
  return models.length > 0 ? models.join(", ") : undefined;
}

function WastedNote({ totals }: { totals: UsageTotals }) {
  if (totals.failedAttempts === 0) return null;
  return (
    <span data-slot="run-cost-wasted" className="text-destructive tabular-nums">
      {pluralize(totals.failedAttempts, "failed attempt")} · {formatMicroUsd(totals.wastedMicroUsd)}{" "}
      wasted
    </span>
  );
}

function Dot() {
  return <span aria-hidden>·</span>;
}

function CompactRunCost({
  attempts,
  totals,
  className,
}: {
  attempts: RunUsage[];
  totals: UsageTotals;
  className?: string;
}) {
  const model = modelsOf(attempts);
  return (
    <span
      data-slot="run-cost"
      data-variant="compact"
      data-failed={totals.failedAttempts > 0 || undefined}
      className={cn(
        "inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 font-mono text-[11px] text-muted-foreground tabular-nums",
        className
      )}
    >
      <span className="font-medium text-foreground">{formatMicroUsd(totals.costMicroUsd)}</span>
      <Dot />
      <span>{formatCount(totals.inputTokens)} in</span>
      <Dot />
      <span>{formatCount(totals.outputTokens)} out</span>
      {model && (
        <>
          <Dot />
          <span>{model}</span>
        </>
      )}
      {totals.failedAttempts > 0 && (
        <span className="inline-flex gap-x-1.5 text-destructive">
          <Dot />
          <WastedNote totals={totals} />
        </span>
      )}
    </span>
  );
}

function AttemptRow({ attempt, position }: { attempt: RunUsage; position: number }) {
  return (
    <li
      data-slot="run-cost-attempt"
      data-failed={attempt.failed || undefined}
      className="grid grid-cols-[1fr_auto_4.5rem] items-baseline gap-x-4 px-5 py-2.5 text-sm tabular-nums"
    >
      <span className="flex min-w-0 items-baseline gap-2">
        <span className="font-mono text-[11px] text-muted-foreground">#{position + 1}</span>
        <span className={cn("truncate", attempt.failed && "text-muted-foreground")}>
          {attempt.model ?? "Attempt"}
        </span>
        {attempt.failed && (
          <span className="font-mono text-[11px] tracking-wide text-destructive uppercase">
            Failed
          </span>
        )}
      </span>
      <span className="font-mono text-[11px] text-muted-foreground max-sm:hidden">
        {formatCount(attempt.inputTokens)} in · {formatCount(attempt.outputTokens)} out
      </span>
      <span className={cn("text-right font-mono text-xs", attempt.failed && "text-destructive")}>
        {formatMicroUsd(attempt.costMicroUsd)}
      </span>
    </li>
  );
}

function DetailedRunCost({
  attempts,
  totals,
  label,
  className,
}: {
  attempts: RunUsage[];
  totals: UsageTotals;
  label: string;
  className?: string;
}) {
  const failed = totals.failedAttempts > 0;
  return (
    <ApprovalPanel
      data-slot="run-cost"
      data-variant="detailed"
      data-failed={failed || undefined}
      aria-label={label}
      className={className}
    >
      <PanelHeader
        icon={<CoinsIcon />}
        eyebrow={label}
        status={pluralize(attempts.length, "attempt")}
        tone={failed ? "danger" : "done"}
      />
      <div className="flex flex-col gap-1 px-5 pt-2 pb-4">
        <span className="text-2xl font-semibold tracking-tight tabular-nums">
          {formatMicroUsd(totals.costMicroUsd)}
        </span>
        <span className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground tabular-nums">
          <span>
            {formatCount(totals.inputTokens)} input · {formatCount(totals.outputTokens)} output
            tokens
          </span>
          <WastedNote totals={totals} />
        </span>
      </div>
      <ol className="flex flex-col divide-y divide-border border-t border-border">
        {attempts.map((attempt, position) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: attempts carry no id and keep their order
          <AttemptRow key={position} attempt={attempt} position={position} />
        ))}
      </ol>
    </ApprovalPanel>
  );
}

export function RunCost({
  usage,
  variant = "compact",
  label = "Run cost",
  className,
}: RunCostProps) {
  const attempts = attemptsOf(usage);
  const totals = sumUsage(attempts);
  if (variant === "detailed") {
    return (
      <DetailedRunCost attempts={attempts} totals={totals} label={label} className={className} />
    );
  }
  return <CompactRunCost attempts={attempts} totals={totals} className={className} />;
}

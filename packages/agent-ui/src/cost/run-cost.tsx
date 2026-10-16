import { Badge, cn, RuleGridLabel } from "@locusgraph/components";
import { formatCount, formatMicroUsd, pluralize } from "@locusgraph/utils";
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
        "inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[11.5px] text-muted-foreground tabular-nums",
        className
      )}
    >
      {model && <span>{model}</span>}
      <span>{formatCount(totals.inputTokens)} in</span>
      <span>{formatCount(totals.outputTokens)} out</span>
      <span className="text-foreground">{formatMicroUsd(totals.costMicroUsd)}</span>
      <WastedNote totals={totals} />
    </span>
  );
}

function AttemptRow({ attempt, position }: { attempt: RunUsage; position: number }) {
  return (
    <li
      data-slot="run-cost-attempt"
      data-failed={attempt.failed || undefined}
      className={cn(
        "grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-4 px-3 py-2 text-sm tabular-nums",
        attempt.failed && "text-destructive"
      )}
    >
      <span className="flex min-w-0 items-center gap-2">
        <span className="font-mono text-[11.5px] text-muted-foreground">#{position + 1}</span>
        <span className="truncate">{attempt.model ?? "Attempt"}</span>
        {attempt.failed && (
          <Badge variant="destructive" className="text-[11px]">
            Failed
          </Badge>
        )}
      </span>
      <span className="text-xs text-muted-foreground">{formatCount(attempt.inputTokens)} in</span>
      <span className="text-xs text-muted-foreground">{formatCount(attempt.outputTokens)} out</span>
      <span className="text-right">{formatMicroUsd(attempt.costMicroUsd)}</span>
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
  return (
    <section
      data-slot="run-cost"
      data-variant="detailed"
      data-failed={totals.failedAttempts > 0 || undefined}
      aria-label={label}
      className={cn("flex flex-col border border-border bg-card text-card-foreground", className)}
    >
      <header className="flex flex-col gap-1 border-b border-border px-3 py-3">
        <RuleGridLabel>{label}</RuleGridLabel>
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-heading text-2xl font-semibold tracking-[-0.02em] tabular-nums">
            {formatMicroUsd(totals.costMicroUsd)}
          </span>
          <span className="text-xs text-muted-foreground tabular-nums">
            {formatCount(totals.inputTokens)} input · {formatCount(totals.outputTokens)} output
            tokens
          </span>
        </span>
        <span className="text-xs">
          <WastedNote totals={totals} />
        </span>
      </header>
      <ol className="flex flex-col divide-y divide-border">
        {attempts.map((attempt, position) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: attempts carry no id and keep their order
          <AttemptRow key={position} attempt={attempt} position={position} />
        ))}
      </ol>
    </section>
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

import { cn } from "@locusgraph/components";
import { formatCount, formatMicroUsd, pluralize } from "@locusgraph/utils";
import { Coins as CoinsIcon } from "@phosphor-icons/react/ssr";
import { lineIconClass, lineRowClass } from "../shared/line";
import type { RunUsage } from "../types";
import { sumUsage, type UsageTotals } from "./shared/usage-totals";

export type CostProps = {
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
    <span data-slot="cost-wasted" className="text-destructive tabular-nums">
      {pluralize(totals.failedAttempts, "failed attempt")} · {formatMicroUsd(totals.wastedMicroUsd)}{" "}
      wasted
    </span>
  );
}

function CompactCost({
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
      data-slot="cost"
      data-variant="compact"
      data-failed={totals.failedAttempts > 0 || undefined}
      className={cn(
        "inline-flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-xs text-faint tabular-nums",
        className
      )}
    >
      <span className="font-medium text-muted-foreground">
        {formatMicroUsd(totals.costMicroUsd)}
      </span>
      <span className="whitespace-nowrap">
        {formatCount(totals.inputTokens)} in · {formatCount(totals.outputTokens)} out
      </span>
      {model && <span>{model}</span>}
      <WastedNote totals={totals} />
    </span>
  );
}

function AttemptRow({ attempt, position }: { attempt: RunUsage; position: number }) {
  return (
    <li
      data-slot="cost-attempt"
      data-failed={attempt.failed || undefined}
      className="grid grid-cols-[1fr_auto_4.5rem] items-baseline gap-x-4 py-1 text-sm tabular-nums"
    >
      <span className="flex min-w-0 items-baseline gap-2">
        <span className="w-4 shrink-0 text-xs text-faint">{position + 1}</span>
        <span
          className={cn("truncate", attempt.failed ? "text-muted-foreground" : "text-foreground")}
        >
          {attempt.model ?? "Attempt"}
        </span>
        {attempt.failed && <span className="text-xs font-medium text-destructive">Failed</span>}
      </span>
      <span className="text-xs text-faint max-sm:hidden">
        {formatCount(attempt.inputTokens)} in · {formatCount(attempt.outputTokens)} out
      </span>
      <span
        className={cn(
          "text-right",
          attempt.failed ? "text-faint line-through decoration-faint" : "text-foreground"
        )}
      >
        {formatMicroUsd(attempt.costMicroUsd)}
      </span>
    </li>
  );
}

function DetailedCost({
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
    <section
      data-slot="cost"
      data-variant="detailed"
      data-failed={failed || undefined}
      aria-label={label}
      className={cn("flex min-w-0 flex-col", className)}
    >
      <header className={lineRowClass}>
        <span aria-hidden className={lineIconClass}>
          <CoinsIcon weight="bold" aria-hidden />
        </span>
        <span className="truncate">{label}</span>
        <span className="shrink-0 text-faint tabular-nums">
          {pluralize(attempts.length, "attempt")}
        </span>
      </header>
      <div className="flex flex-col gap-0.5 pb-2 pl-6">
        <span className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">
          {formatMicroUsd(totals.costMicroUsd)}
        </span>
        <span className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-faint tabular-nums">
          <span>
            {formatCount(totals.inputTokens)} in · {formatCount(totals.outputTokens)} out
          </span>
          <WastedNote totals={totals} />
        </span>
      </div>
      {attempts.length > 1 && (
        <ol className="flex flex-col pl-6">
          {attempts.map((attempt, position) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: attempts carry no id and keep their order
            <AttemptRow key={position} attempt={attempt} position={position} />
          ))}
        </ol>
      )}
    </section>
  );
}

export function Cost({ usage, variant = "compact", label = "Run cost", className }: CostProps) {
  const attempts = attemptsOf(usage);
  const totals = sumUsage(attempts);
  if (variant === "detailed") {
    return <DetailedCost attempts={attempts} totals={totals} label={label} className={className} />;
  }
  return <CompactCost attempts={attempts} totals={totals} className={className} />;
}

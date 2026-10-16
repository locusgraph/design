import {
  cn,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  RuleGridLabel,
} from "@locusgraph/components";
import { formatCount, nearLimitPercent, quotaPercent } from "@locusgraph/utils";
import { formatTokensShort } from "./shared/usage-totals";

export type ContextSegment = { label: string; tokens: number };

export type ContextStatus = "ok" | "near" | "full";

export type ContextMeterProps = {
  usedTokens: number;
  limitTokens: number;
  breakdown?: ContextSegment[];
  variant?: "bar" | "ring";
  label?: string;
  className?: string;
};

export function contextStatus(usedTokens: number, limitTokens: number): ContextStatus {
  if (usedTokens >= limitTokens) return "full";
  const percent = quotaPercent({ used: usedTokens, included: limitTokens });
  return percent >= nearLimitPercent ? "near" : "ok";
}

const statusTone = {
  ok: "text-foreground",
  near: "text-warn",
  full: "text-destructive",
} as const;

const statusFill = { ok: "bg-primary", near: "bg-current", full: "bg-current" } as const;

const ringRadius = 8;
const ringCircumference = 2 * Math.PI * ringRadius;

function MeterRing({ percent, status }: { percent: number; status: ContextStatus }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="size-4 -rotate-90">
      <circle
        cx="10"
        cy="10"
        r={ringRadius}
        fill="none"
        strokeWidth="2.5"
        className="stroke-muted"
      />
      <circle
        cx="10"
        cy="10"
        r={ringRadius}
        fill="none"
        strokeWidth="2.5"
        strokeDasharray={ringCircumference}
        strokeDashoffset={ringCircumference * (1 - percent / 100)}
        className={cn(
          "transition-[stroke-dashoffset] duration-300 motion-reduce:transition-none",
          status === "ok" ? "stroke-primary" : "stroke-current"
        )}
      />
    </svg>
  );
}

function MeterBar({ percent, status }: { percent: number; status: ContextStatus }) {
  return (
    <span className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <span
        className={cn(
          "absolute inset-y-0 left-0 rounded-full transition-[width] duration-300 motion-reduce:transition-none",
          statusFill[status]
        )}
        style={{ width: `${percent}%` }}
      />
    </span>
  );
}

function Breakdown({
  breakdown,
  limitTokens,
}: {
  breakdown: ContextSegment[];
  limitTokens: number;
}) {
  return (
    <ul data-slot="context-meter-breakdown" className="flex flex-col gap-1.5 text-xs">
      {breakdown.map((segment) => (
        <li key={segment.label} className="flex items-baseline justify-between gap-4">
          <span>{segment.label}</span>
          <span className="text-muted-foreground tabular-nums">
            {formatCount(segment.tokens)} ·{" "}
            {quotaPercent({ used: segment.tokens, included: limitTokens })}%
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ContextMeter({
  usedTokens,
  limitTokens,
  breakdown,
  variant = "bar",
  label = "Context",
  className,
}: ContextMeterProps) {
  const percent = quotaPercent({ used: usedTokens, included: limitTokens });
  const status = contextStatus(usedTokens, limitTokens);
  const summary = `${formatCount(usedTokens)} of ${formatCount(limitTokens)} tokens`;
  const hasBreakdown = breakdown !== undefined && breakdown.length > 0;
  const meter = (
    <div
      data-slot="context-meter"
      data-status={status}
      data-variant={variant}
      role="meter"
      aria-label={`${label} window`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-valuetext={`${percent}%, ${summary}`}
      tabIndex={hasBreakdown ? 0 : undefined}
      className={cn(
        "outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
        statusTone[status],
        variant === "ring"
          ? "inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5"
          : "flex w-full flex-col gap-2",
        className
      )}
    >
      {variant === "ring" ? (
        <>
          <MeterRing percent={percent} status={status} />
          <span className="font-mono text-[11.5px] tabular-nums">{percent}%</span>
        </>
      ) : (
        <>
          <span className="flex items-baseline justify-between gap-4">
            <RuleGridLabel>{label}</RuleGridLabel>
            <span className="font-mono text-[11.5px] tabular-nums">
              {formatTokensShort(usedTokens)} / {formatTokensShort(limitTokens)}
            </span>
          </span>
          <MeterBar percent={percent} status={status} />
        </>
      )}
    </div>
  );
  if (!hasBreakdown) return meter;
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>{meter}</HoverCardTrigger>
      <HoverCardContent className="flex w-60 flex-col gap-2 rounded-none p-3">
        <span className="flex items-baseline justify-between gap-4">
          <RuleGridLabel>{label}</RuleGridLabel>
          <span className="text-xs tabular-nums">{summary}</span>
        </span>
        <Breakdown breakdown={breakdown} limitTokens={limitTokens} />
      </HoverCardContent>
    </HoverCard>
  );
}

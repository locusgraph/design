import { cn, HoverCard, HoverCardContent, HoverCardTrigger } from "@locusgraph/components";
import { formatCount, nearLimitPercent, quotaPercent } from "@locusgraph/utils";
import { ContextBreakdown, type ContextSegment } from "./shared/context-breakdown";
import { MeterBar, MeterRing } from "./shared/meter-marks";
import { formatTokensShort } from "./shared/usage-totals";

export type { ContextSegment } from "./shared/context-breakdown";

export type ContextStatus = "ok" | "near" | "full";

export type ContextProps = {
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
  ok: "text-muted-foreground",
  near: "text-warn",
  full: "text-destructive",
} as const;

function RingContent({ percent, status }: { percent: number; status: ContextStatus }) {
  return (
    <>
      <MeterRing percent={percent} status={status} />
      <span className="font-mono text-2xs tabular-nums">{percent}%</span>
    </>
  );
}

function BarContent({
  label,
  usedTokens,
  limitTokens,
  percent,
  status,
}: {
  label: string;
  usedTokens: number;
  limitTokens: number;
  percent: number;
  status: ContextStatus;
}) {
  return (
    <>
      <span className="flex items-baseline justify-between gap-4 font-mono text-2xs tabular-nums">
        <span className="locus-eyebrow">{label}</span>
        <span className={cn(status === "ok" && "text-foreground")}>
          {percent}% · {formatTokensShort(usedTokens)} / {formatTokensShort(limitTokens)}
        </span>
      </span>
      <MeterBar percent={percent} status={status} />
    </>
  );
}

export function Context({
  usedTokens,
  limitTokens,
  breakdown,
  variant = "bar",
  label = "Context",
  className,
}: ContextProps) {
  const percent = quotaPercent({ used: usedTokens, included: limitTokens });
  const status = contextStatus(usedTokens, limitTokens);
  const summary = `${formatCount(usedTokens)} of ${formatCount(limitTokens)} tokens`;
  const hasBreakdown = breakdown !== undefined && breakdown.length > 0;
  const meter = (
    <div
      data-slot="context"
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
        "locus-focus-ring",
        statusTone[status],
        variant === "ring"
          ? "inline-flex h-control-xs items-center gap-1.5 rounded-full px-2 transition-colors duration-150 motion-reduce:transition-none"
          : "flex w-full flex-col gap-2",
        variant === "ring" && hasBreakdown && "cursor-default hover:bg-accent",
        className
      )}
    >
      {variant === "ring" ? (
        <RingContent percent={percent} status={status} />
      ) : (
        <BarContent
          label={label}
          usedTokens={usedTokens}
          limitTokens={limitTokens}
          percent={percent}
          status={status}
        />
      )}
    </div>
  );
  if (!hasBreakdown) return meter;
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>{meter}</HoverCardTrigger>
      <HoverCardContent
        align="end"
        sideOffset={6}
        className="w-72 rounded-none border-0 bg-popover p-0 shadow-overlay ring-1 ring-border"
      >
        <ContextBreakdown
          label={label}
          usedTokens={usedTokens}
          limitTokens={limitTokens}
          percent={percent}
          status={status}
          breakdown={breakdown}
        />
      </HoverCardContent>
    </HoverCard>
  );
}

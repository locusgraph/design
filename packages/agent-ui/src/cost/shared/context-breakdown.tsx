import { cn } from "@locusgraph/components";
import { formatCount, quotaPercent } from "@locusgraph/utils";
import { MeterBar, type MeterStatus } from "./meter-marks";

export type ContextSegment = { label: string; tokens: number };

const statusWord = { ok: "Room left", near: "Near limit", full: "Full" } as const;

const statusDot = {
  ok: "bg-good",
  near: "bg-warn",
  full: "bg-destructive",
} as const;

type ContextBreakdownProps = {
  label: string;
  usedTokens: number;
  limitTokens: number;
  percent: number;
  status: MeterStatus;
  breakdown: ContextSegment[];
};

function SegmentRow({
  label,
  tokens,
  limitTokens,
  muted = false,
}: {
  label: string;
  tokens: number;
  limitTokens: number;
  muted?: boolean;
}) {
  return (
    <li
      className={cn(
        "grid grid-cols-[1fr_auto_3rem] items-baseline gap-x-3 px-4 py-2 text-xs tabular-nums",
        muted && "text-muted-foreground"
      )}
    >
      <span className="truncate">{label}</span>
      <span className="font-mono">{formatCount(tokens)}</span>
      <span className="text-right font-mono text-muted-foreground">
        {quotaPercent({ used: tokens, included: limitTokens })}%
      </span>
    </li>
  );
}

export function ContextBreakdown({
  label,
  usedTokens,
  limitTokens,
  percent,
  status,
  breakdown,
}: ContextBreakdownProps) {
  const freeTokens = Math.max(limitTokens - usedTokens, 0);
  return (
    <div data-slot="context-meter-breakdown" className="flex flex-col">
      <div className="eyebrow flex items-center gap-2 px-4 pt-3">
        <span>{label}</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span aria-hidden className={cn("size-1.5 rounded-full", statusDot[status])} />
          {statusWord[status]}
        </span>
      </div>
      <div className="flex flex-col gap-2 px-4 pt-2 pb-3">
        <span className="flex items-baseline gap-1.5 tabular-nums">
          <span className="text-lg font-semibold tracking-tight">{percent}%</span>
          <span className="text-xs text-muted-foreground">
            {formatCount(usedTokens)} of {formatCount(limitTokens)} tokens
          </span>
        </span>
        <MeterBar percent={percent} status={status} />
      </div>
      <ul className="flex flex-col divide-y divide-border border-t border-border">
        {breakdown.map((segment) => (
          <SegmentRow
            key={segment.label}
            label={segment.label}
            tokens={segment.tokens}
            limitTokens={limitTokens}
          />
        ))}
        <SegmentRow label="Free" tokens={freeTokens} limitTokens={limitTokens} muted />
      </ul>
    </div>
  );
}

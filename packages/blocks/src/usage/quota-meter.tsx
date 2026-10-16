import { Progress } from "@locusgraph/components";
import { formatCount, quotaPercent, quotaStatus } from "@locusgraph/utils";
import { periodLabel, type Quota } from "../types";

const statusIndicator = {
  ok: "",
  near: "[&_[data-slot=progress-indicator]]:bg-warn",
  over: "[&_[data-slot=progress-indicator]]:bg-destructive",
} as const;

export function QuotaMeter({ quota }: { quota: Quota }) {
  const percent = quotaPercent(quota);
  return (
    <div data-slot="quota-meter" data-status={quotaStatus(quota)} className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className="font-mono">{quota.key}</span>
        <span className="text-muted-foreground tabular-nums">
          {formatCount(quota.used)} of {formatCount(quota.included)} {periodLabel(quota.period)}
        </span>
      </div>
      <Progress
        value={percent}
        aria-label={`${quota.key} ${percent}% of quota`}
        className={statusIndicator[quotaStatus(quota)]}
      />
    </div>
  );
}

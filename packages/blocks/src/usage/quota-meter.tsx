import { Progress } from "@locusgraph/components";
import { formatCount, quotaPercent, quotaStatus } from "@locusgraph/utils";
import { periodLabel, type Quota } from "../types";

const statusIndicator = {
  ok: "",
  near: "[&_[data-slot=progress-indicator]]:bg-warn",
  over: "[&_[data-slot=progress-indicator]]:bg-destructive",
} as const;

function QuotaStatusNote({ quota }: { quota: Quota }) {
  const status = quotaStatus(quota);
  if (status === "over") {
    return (
      <span className="font-medium text-destructive">
        {formatCount(quota.used - quota.included)} over
      </span>
    );
  }
  if (status === "near") {
    return <span className="font-medium text-warn">{quotaPercent(quota)}%</span>;
  }
  return null;
}

export function QuotaMeter({ quota }: { quota: Quota }) {
  const percent = quotaPercent(quota);
  const name = quota.label ?? quota.key;
  return (
    <div data-slot="quota-meter" data-status={quotaStatus(quota)} className="flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
        <span className={quota.label ? "text-muted-foreground" : "font-mono text-muted-foreground"}>
          {name}
        </span>
        <span className="flex items-baseline gap-2 tabular-nums">
          <span className="font-medium text-foreground">
            {formatCount(quota.used)} of {formatCount(quota.included)} {periodLabel(quota.period)}
          </span>
          <QuotaStatusNote quota={quota} />
        </span>
      </div>
      <Progress
        value={percent}
        aria-label={`${name} ${percent}% of quota`}
        className={statusIndicator[quotaStatus(quota)]}
      />
    </div>
  );
}

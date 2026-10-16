import { cn } from "@locusgraph/components";
import { formatMicroUsd } from "@locusgraph/utils";

type SpendMeterProps = {
  spentMicroUsd: number;
  estimateMicroUsd: number;
  capMicroUsd: number;
  balanceMicroUsd: number;
  outOfCredits: boolean;
  muted?: boolean;
};

function percentOf(value: number, scale: number) {
  return scale <= 0 ? 0 : Math.min(100, Math.max(0, (value / scale) * 100));
}

export function SpendMeter({
  spentMicroUsd,
  estimateMicroUsd,
  capMicroUsd,
  balanceMicroUsd,
  outOfCredits,
  muted = false,
}: SpendMeterProps) {
  const projected = spentMicroUsd + estimateMicroUsd;
  const scale = Math.max(capMicroUsd, projected);
  const spentWidth = percentOf(spentMicroUsd, scale);
  const estimateWidth = percentOf(estimateMicroUsd, scale);
  const capPosition = percentOf(capMicroUsd, scale);
  return (
    <div data-slot="spend-meter" className="flex flex-col gap-2">
      <div
        role="meter"
        aria-label="Run spend against its cap"
        aria-valuemin={0}
        aria-valuemax={scale}
        aria-valuenow={projected}
        aria-valuetext={`${formatMicroUsd(projected)} after the next step, cap ${formatMicroUsd(capMicroUsd)}`}
        className="relative h-1.5 bg-muted"
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-0 left-0",
            muted ? "bg-muted-foreground/40" : "bg-foreground/70"
          )}
          style={{ width: `${spentWidth}%` }}
        />
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-0",
            muted ? "bg-muted-foreground/25" : outOfCredits ? "bg-destructive" : "bg-amber-500"
          )}
          style={{ left: `${spentWidth}%`, width: `${estimateWidth}%` }}
        />
        <span
          aria-hidden
          className="absolute -inset-y-1 -ml-px w-px bg-foreground"
          style={{ left: `${capPosition}%` }}
        />
      </div>
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs text-muted-foreground tabular-nums">
        <span>
          <span className="font-medium text-foreground">{formatMicroUsd(spentMicroUsd)}</span> spent
          of a <span className="font-medium text-foreground">{formatMicroUsd(capMicroUsd)}</span>{" "}
          cap
        </span>
        <span className={cn(outOfCredits && !muted && "text-destructive")}>
          {formatMicroUsd(balanceMicroUsd)} credits left
        </span>
      </div>
    </div>
  );
}

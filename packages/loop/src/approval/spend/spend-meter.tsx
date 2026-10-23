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

function meterFrame({
  spentMicroUsd,
  estimateMicroUsd,
  capMicroUsd,
  balanceMicroUsd,
  outOfCredits,
}: SpendMeterProps) {
  if (outOfCredits) {
    const limit = Math.max(balanceMicroUsd, 0);
    return {
      base: limit,
      extra: Math.max(estimateMicroUsd - limit, 0),
      scale: Math.max(limit, estimateMicroUsd),
      limit,
      limitLabel: "Credits",
    };
  }
  const scale = Math.max(capMicroUsd, spentMicroUsd + estimateMicroUsd);
  return {
    base: spentMicroUsd,
    extra: estimateMicroUsd,
    scale,
    limit: capMicroUsd,
    limitLabel: "Cap",
  };
}

function labelAlignment(position: number) {
  if (position > 80) return "-translate-x-full";
  if (position < 20) return "";
  return "-translate-x-1/2";
}

function Amount({ value, muted }: { value: number; muted: boolean }) {
  return (
    <span className={cn("font-medium", !muted && "text-foreground")}>{formatMicroUsd(value)}</span>
  );
}

function MeterLegend(props: SpendMeterProps & { muted: boolean }) {
  const { spentMicroUsd, estimateMicroUsd, capMicroUsd, balanceMicroUsd, outOfCredits, muted } =
    props;
  return (
    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs text-faint tabular-nums">
      {outOfCredits ? (
        <>
          <span>
            Next step needs <Amount value={estimateMicroUsd} muted={muted} />, you have{" "}
            <span className={cn("font-medium", !muted && "text-destructive")}>
              {formatMicroUsd(balanceMicroUsd)}
            </span>{" "}
            in credits
          </span>
          <span>{formatMicroUsd(spentMicroUsd)} spent this run</span>
        </>
      ) : (
        <>
          <span>
            <Amount value={spentMicroUsd} muted={muted} /> spent of a{" "}
            <Amount value={capMicroUsd} muted={muted} /> cap
          </span>
          <span>{formatMicroUsd(balanceMicroUsd)} credits left</span>
        </>
      )}
    </div>
  );
}

export function SpendMeter(props: SpendMeterProps) {
  const { outOfCredits, muted = false } = props;
  const { base, extra, scale, limit, limitLabel } = meterFrame(props);
  const baseWidth = percentOf(base, scale);
  const estimateWidth = percentOf(extra, scale);
  const limitPosition = percentOf(limit, scale);
  const projected = base + extra;
  return (
    <div data-slot="spend-meter" className="flex flex-col gap-1.5">
      <div aria-hidden className="relative h-4">
        <span
          className={cn(
            "absolute bottom-0 text-xs whitespace-nowrap text-faint tabular-nums",
            labelAlignment(limitPosition)
          )}
          style={{ left: `${limitPosition}%` }}
        >
          {limitLabel} {formatMicroUsd(limit)}
        </span>
      </div>
      <div
        role="meter"
        aria-label={outOfCredits ? "Next step against your credits" : "Run spend against its cap"}
        aria-valuemin={0}
        aria-valuemax={scale}
        aria-valuenow={projected}
        aria-valuetext={`${formatMicroUsd(projected)} after the next step, ${limitLabel.toLowerCase()} ${formatMicroUsd(limit)}`}
        className="relative h-1 rounded-full bg-muted-foreground/15"
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-0 left-0 rounded-l-full",
            muted ? "bg-muted-foreground/30" : "bg-muted-foreground/60"
          )}
          style={{ width: `${baseWidth}%` }}
        />
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-0",
            muted ? "bg-muted-foreground/25" : outOfCredits ? "bg-destructive" : "bg-warn"
          )}
          style={{ left: `${baseWidth}%`, width: `${estimateWidth}%` }}
        />
        <span
          aria-hidden
          className="absolute -inset-y-1 -ml-px w-px bg-foreground/70"
          style={{ left: `${limitPosition}%` }}
        />
      </div>
      <div className="pt-0.5">
        <MeterLegend {...props} muted={muted} />
      </div>
    </div>
  );
}

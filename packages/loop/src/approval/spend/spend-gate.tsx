import { Button, cn } from "@locusgraph/components";
import { formatMicroUsd } from "@locusgraph/utils";
import { CurrencyCircleDollar as CircleDollarSignIcon } from "@phosphor-icons/react/ssr";
import { lineObjectClass } from "../../shared/line";
import { LiveStatus } from "../../shared/live-status";
import { PendingLine, SettledLine } from "../shared/approval-line";
import { DecisionSummary } from "../shared/decision-line";
import { useFocusOnMount } from "../shared/use-focus-on-mount";
import type { ApprovalDecision } from "../types";
import { RaiseCapForm } from "./raise-cap-form";
import { spendSituation, suggestedCapMicroUsd } from "./spend-math";
import { SpendMeter } from "./spend-meter";

export type SpendGateProps = {
  spentMicroUsd: number;
  estimateMicroUsd: number;
  capMicroUsd: number;
  balanceMicroUsd: number;
  runName?: string;
  decision?: ApprovalDecision;
  onAllowOnce: () => void;
  onRaiseCap: (newCapMicroUsd: number) => void;
  onStop: () => void;
  onBuyCredits?: () => void;
  autoFocus?: boolean;
  className?: string;
};

const situationCopy = {
  "over-cap": {
    title: "This run would pass its cost cap",
    body: (run: string) =>
      `${run} paused before the next step. Allow it once, raise the cap, or stop the run.`,
  },
  "out-of-credits": {
    title: "Not enough credits to continue",
    body: (run: string) =>
      `${run} paused: the next step costs more than your prepaid balance. Add credits or stop the run.`,
  },
} as const;

const situationStatus = { "over-cap": "Over cap", "out-of-credits": "Out of credits" } as const;

export function SpendGate({
  spentMicroUsd,
  estimateMicroUsd,
  capMicroUsd,
  balanceMicroUsd,
  runName,
  decision,
  onAllowOnce,
  onRaiseCap,
  onStop,
  onBuyCredits,
  autoFocus = true,
  className,
}: SpendGateProps) {
  const situation = spendSituation(balanceMicroUsd, estimateMicroUsd);
  const outOfCredits = situation === "out-of-credits";
  const projected = spentMicroUsd + estimateMicroUsd;
  const copy = situationCopy[situation];
  const primaryRef = useFocusOnMount<HTMLButtonElement>(autoFocus && !decision);
  const meter = { spentMicroUsd, estimateMicroUsd, capMicroUsd, balanceMicroUsd, outOfCredits };
  const icon = <CircleDollarSignIcon weight="bold" aria-hidden />;
  const estimate = formatMicroUsd(estimateMicroUsd);
  return (
    <section
      data-slot="spend-gate"
      data-situation={situation}
      aria-label={copy.title}
      className={cn("flex min-w-0 flex-col", !decision && "gap-3", className)}
    >
      {decision ? (
        <SettledLine name={estimate} verb="Asked to spend" icon={icon}>
          <div className="flex flex-col gap-3">
            <DecisionSummary
              decision={decision}
              approvedVerb="Allowed"
              deniedVerb="Stopped"
              result={
                decision.approved ? `Allowed ${estimate} once` : `${runName ?? "The run"} stopped`
              }
            />
            <SpendMeter {...meter} muted />
          </div>
        </SettledLine>
      ) : (
        <>
          <PendingLine
            icon={icon}
            status={situationStatus[situation]}
            tone={outOfCredits ? "destructive" : "warn"}
            iconClassName={outOfCredits ? "text-destructive" : undefined}
          >
            · next step costs <span className={lineObjectClass}>{estimate}</span>
          </PendingLine>
          <p className="-mt-2 text-sm text-faint">
            {copy.body(runName ?? "The agent")} The run would reach{" "}
            <span className="tabular-nums">{formatMicroUsd(projected)}</span>.
          </p>
          <SpendMeter {...meter} />
          {!outOfCredits && (
            <RaiseCapForm
              capMicroUsd={capMicroUsd}
              suggestedMicroUsd={suggestedCapMicroUsd(projected, capMicroUsd)}
              onRaiseCap={onRaiseCap}
            />
          )}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {outOfCredits ? (
              onBuyCredits && (
                <Button ref={primaryRef} type="button" size="sm" onClick={onBuyCredits}>
                  Buy credits
                </Button>
              )
            ) : (
              <Button ref={primaryRef} type="button" size="sm" onClick={onAllowOnce}>
                Allow {estimate} once
              </Button>
            )}
            <Button
              ref={outOfCredits && !onBuyCredits ? primaryRef : undefined}
              type="button"
              size="sm"
              variant={outOfCredits && !onBuyCredits ? "destructive" : "ghost"}
              className={
                outOfCredits && !onBuyCredits
                  ? undefined
                  : "hover:bg-transparent hover:text-destructive"
              }
              onClick={onStop}
            >
              Stop the run
            </Button>
          </div>
        </>
      )}
      <LiveStatus
        message={decision ? (decision.approved ? "Spend allowed" : "Run stopped") : copy.title}
      />
    </section>
  );
}

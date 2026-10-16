import { Button, cn } from "@locusgraph/components";
import { formatMicroUsd } from "@locusgraph/utils";
import { CircleDollarSignIcon } from "lucide-react";
import {
  ApprovalPanel,
  LiveStatus,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelTitle,
} from "../../shared/panel";
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
  return (
    <ApprovalPanel
      data-slot="spend-gate"
      data-situation={situation}
      aria-label={copy.title}
      className={cn(!decision && outOfCredits && "ring-destructive/60", className)}
    >
      <PanelHeader
        icon={<CircleDollarSignIcon aria-hidden />}
        eyebrow="Spend approval"
        status={decision ? (decision.approved ? "Allowed" : "Stopped") : situationStatus[situation]}
        tone={
          decision ? (decision.approved ? "done" : "danger") : outOfCredits ? "danger" : "waiting"
        }
      />
      <PanelTitle className={cn(decision && "text-muted-foreground")}>{copy.title}</PanelTitle>
      {decision ? (
        <PanelBody className="pt-3">
          <DecisionSummary
            decision={decision}
            approvedVerb="Allowed"
            deniedVerb="Stopped"
            result={
              decision.approved
                ? `Allowed ${formatMicroUsd(estimateMicroUsd)} once`
                : `${runName ?? "The run"} stopped`
            }
          />
          <SpendMeter {...meter} muted />
        </PanelBody>
      ) : (
        <>
          <p className="px-5 pt-1 text-sm text-muted-foreground">
            {copy.body(runName ?? "The agent")}
          </p>
          <PanelBody className="gap-5">
            <div className="flex flex-col gap-0.5">
              <p className="text-2xl font-semibold tracking-tight tabular-nums">
                {formatMicroUsd(estimateMicroUsd)}
              </p>
              <p className="text-xs text-muted-foreground">
                Next step, estimated. The run would reach{" "}
                <span className="tabular-nums">{formatMicroUsd(projected)}</span>.
              </p>
            </div>
            <SpendMeter {...meter} />
            {!outOfCredits && (
              <RaiseCapForm
                capMicroUsd={capMicroUsd}
                suggestedMicroUsd={suggestedCapMicroUsd(projected, capMicroUsd)}
                onRaiseCap={onRaiseCap}
              />
            )}
          </PanelBody>
          <PanelFooter className="justify-between">
            <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
              The run is paused
            </span>
            <span className="flex flex-wrap gap-2">
              <Button
                ref={outOfCredits && !onBuyCredits ? primaryRef : undefined}
                type="button"
                size="sm"
                variant={outOfCredits && !onBuyCredits ? "destructive" : "ghost"}
                onClick={onStop}
              >
                Stop the run
              </Button>
              {outOfCredits ? (
                onBuyCredits && (
                  <Button ref={primaryRef} type="button" size="sm" onClick={onBuyCredits}>
                    Buy credits
                  </Button>
                )
              ) : (
                <Button ref={primaryRef} type="button" size="sm" onClick={onAllowOnce}>
                  Allow {formatMicroUsd(estimateMicroUsd)} once
                </Button>
              )}
            </span>
          </PanelFooter>
        </>
      )}
      <LiveStatus
        message={decision ? (decision.approved ? "Spend allowed" : "Run stopped") : copy.title}
      />
    </ApprovalPanel>
  );
}

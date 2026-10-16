import { Button, cn } from "@locusgraph/components";
import { formatMicroUsd } from "@locusgraph/utils";
import { CircleAlertIcon } from "lucide-react";
import { DecisionLine } from "../shared/decision-line";
import { ApprovalPanel, LiveStatus } from "../shared/panel";
import { useFocusOnMount } from "../shared/use-focus-on-mount";
import type { ApprovalDecision } from "../types";
import { RaiseCapForm } from "./raise-cap-form";
import { spendSituation, suggestedCapMicroUsd } from "./spend-math";

export type SpendApprovalProps = {
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
    body: "The agent paused before the next step. Allow it once, raise the cap, or stop the run.",
  },
  "out-of-credits": {
    title: "Not enough credits to continue",
    body: "The next step costs more than your prepaid balance. Add credits or stop the run.",
  },
} as const;

function Figure({ label, value, tone }: { label: string; value: number; tone?: string }) {
  return (
    <div className="flex flex-col gap-0.5 bg-card px-3 py-2">
      <dt className="font-mono text-[11.5px] text-muted-foreground">{label}</dt>
      <dd className={cn("font-medium tabular-nums", tone)}>{formatMicroUsd(value)}</dd>
    </div>
  );
}

export function SpendApproval({
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
}: SpendApprovalProps) {
  const situation = spendSituation(balanceMicroUsd, estimateMicroUsd);
  const outOfCredits = situation === "out-of-credits";
  const projected = spentMicroUsd + estimateMicroUsd;
  const copy = situationCopy[situation];
  const tone = outOfCredits ? "text-destructive" : "text-warn";
  const primaryRef = useFocusOnMount<HTMLButtonElement>(autoFocus && !decision);
  return (
    <ApprovalPanel
      data-slot="spend-approval"
      data-situation={situation}
      aria-label={copy.title}
      className={cn(outOfCredits ? "ring-destructive/60" : "ring-warn/60", className)}
    >
      <header className={cn("flex items-start gap-2", tone)}>
        <CircleAlertIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">{copy.title}</p>
          <p className="text-sm opacity-85">
            {runName ? `${runName}: ` : ""}
            {copy.body}
          </p>
        </div>
      </header>
      <dl className="grid grid-cols-2 gap-px bg-border p-px text-sm sm:grid-cols-4">
        <Figure label="Spent so far" value={spentMicroUsd} />
        <Figure label="Next step, est." value={estimateMicroUsd} />
        <Figure
          label="Run cap"
          value={capMicroUsd}
          tone={projected > capMicroUsd ? "text-warn" : undefined}
        />
        <Figure
          label="Credits left"
          value={balanceMicroUsd}
          tone={outOfCredits ? "text-destructive" : undefined}
        />
      </dl>
      {decision ? (
        <DecisionLine decision={decision} approvedVerb="Allowed" deniedVerb="Stopped" />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
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
            <Button
              ref={outOfCredits && !onBuyCredits ? primaryRef : undefined}
              type="button"
              size="sm"
              variant={outOfCredits ? "destructive" : "ghost"}
              onClick={onStop}
            >
              Stop the run
            </Button>
          </div>
          {!outOfCredits && (
            <RaiseCapForm
              capMicroUsd={capMicroUsd}
              suggestedMicroUsd={suggestedCapMicroUsd(projected, capMicroUsd)}
              onRaiseCap={onRaiseCap}
            />
          )}
        </div>
      )}
      <LiveStatus
        message={decision ? (decision.approved ? "Spend allowed" : "Run stopped") : copy.title}
      />
    </ApprovalPanel>
  );
}

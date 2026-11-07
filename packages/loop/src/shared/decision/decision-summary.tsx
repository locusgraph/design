import { Check as CheckIcon, X as XIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import type { DecidedAt } from "../../approval/types";
import { DecidedTime, type DecisionTimeStyle } from "./decided-time";

export type { DecisionTimeStyle } from "./decided-time";

export function toDate(value: DecidedAt): Date {
  return value instanceof Date ? value : new Date(value);
}

export function isoOf(value: DecidedAt): string | undefined {
  const date = toDate(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export type DecisionOutcome = {
  approved: boolean;
  by?: string;
  at?: DecidedAt;
  reason?: string;
};

export type DecisionSummaryProps = {
  decision: DecisionOutcome;
  result: ReactNode;
  approvedVerb?: string;
  deniedVerb?: string;
  timeStyle?: DecisionTimeStyle;
};

type DecisionMetaProps = { decision: DecisionOutcome; verb: string; timeStyle: DecisionTimeStyle };

function DecisionMeta({ decision, verb, timeStyle }: DecisionMetaProps) {
  const date = decision.at === undefined ? undefined : toDate(decision.at);
  const hasTime = date !== undefined && !Number.isNaN(date.getTime());
  return (
    <p className="text-xs text-muted-foreground">
      {verb}
      {decision.by && ` by ${decision.by}`}
      {hasTime && (
        <>
          {" · "}
          <DecidedTime date={date} style={timeStyle} />
        </>
      )}
    </p>
  );
}

export function DecisionSummary({
  decision,
  result,
  approvedVerb = "Approved",
  deniedVerb = "Denied",
  timeStyle = "full",
}: DecisionSummaryProps) {
  const Icon = decision.approved ? CheckIcon : XIcon;
  return (
    <div
      data-slot="decision-summary"
      data-approved={decision.approved}
      className="flex items-start gap-2.5 text-sm"
    >
      <Icon
        weight="bold"
        aria-hidden
        className={`mt-0.5 size-4 shrink-0 ${decision.approved ? "text-good" : "text-destructive"}`}
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="font-medium">{result}</p>
        <DecisionMeta
          decision={decision}
          verb={decision.approved ? approvedVerb : deniedVerb}
          timeStyle={timeStyle}
        />
        {decision.reason && (
          <p className="text-xs text-muted-foreground">Reason: {decision.reason}</p>
        )}
      </div>
    </div>
  );
}

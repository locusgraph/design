import { Check as CheckIcon, X as XIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import type { DecidedAt } from "../approval/types";

const decisionTimeFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

export function toDate(value: DecidedAt): Date {
  return value instanceof Date ? value : new Date(value);
}

export function isoOf(value: DecidedAt): string | undefined {
  const date = toDate(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

const decisionClockFormat = new Intl.DateTimeFormat("en-US", {
  timeStyle: "short",
  timeZone: "UTC",
});

export type DecisionTimeStyle = "full" | "time";

export function formatDecidedTime(value: DecidedAt): string {
  const date = toDate(value);
  return Number.isNaN(date.getTime()) ? "" : decisionClockFormat.format(date);
}

export function formatDecidedAt(value: DecidedAt): string {
  const date = toDate(value);
  return Number.isNaN(date.getTime()) ? "" : `${decisionTimeFormat.format(date)} UTC`;
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
  return (
    <p className="text-xs text-muted-foreground">
      {verb}
      {decision.by && ` by ${decision.by}`}
      {decision.at !== undefined && (
        <>
          {" · "}
          <time
            dateTime={isoOf(decision.at)}
            title={formatDecidedAt(decision.at)}
            className="tabular-nums"
          >
            {timeStyle === "time" ? formatDecidedTime(decision.at) : formatDecidedAt(decision.at)}
          </time>
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

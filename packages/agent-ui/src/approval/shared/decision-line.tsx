import { CheckIcon, XIcon } from "lucide-react";
import type { ApprovalDecision } from "../types";
import { formatDecidedAt, isoOf } from "./time";

type DecisionLineProps = {
  decision: ApprovalDecision;
  approvedVerb?: string;
  deniedVerb?: string;
};

export function DecisionLine({
  decision,
  approvedVerb = "Approved",
  deniedVerb = "Denied",
}: DecisionLineProps) {
  const Icon = decision.approved ? CheckIcon : XIcon;
  return (
    <div
      data-slot="decision-line"
      data-approved={decision.approved}
      className={`flex flex-col gap-1 text-sm ${decision.approved ? "text-good" : "text-destructive"}`}
    >
      <p className="flex items-center gap-2">
        <Icon aria-hidden className="size-4 shrink-0" />
        <span>
          {decision.approved ? approvedVerb : deniedVerb} by{" "}
          <span className="font-medium">{decision.by}</span> ·{" "}
          <time dateTime={isoOf(decision.at)} className="tabular-nums">
            {formatDecidedAt(decision.at)}
          </time>
        </span>
      </p>
      {decision.reason && <p className="pl-6 text-muted-foreground">Reason: {decision.reason}</p>}
    </div>
  );
}

type DecisionSummaryProps = DecisionLineProps & { result: string };

export function DecisionSummary({
  decision,
  result,
  approvedVerb = "Approved",
  deniedVerb = "Denied",
}: DecisionSummaryProps) {
  const Icon = decision.approved ? CheckIcon : XIcon;
  return (
    <div
      data-slot="decision-summary"
      data-approved={decision.approved}
      className="flex items-start gap-2.5 text-sm"
    >
      <Icon
        aria-hidden
        className={`mt-0.5 size-4 shrink-0 ${decision.approved ? "text-emerald-500" : "text-destructive"}`}
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="font-medium">{result}</p>
        <p className="text-xs text-muted-foreground">
          {decision.approved ? approvedVerb : deniedVerb} by {decision.by} ·{" "}
          <time dateTime={isoOf(decision.at)} className="tabular-nums">
            {formatDecidedAt(decision.at)}
          </time>
        </p>
        {decision.reason && <p className="text-xs text-muted-foreground">{decision.reason}</p>}
      </div>
    </div>
  );
}

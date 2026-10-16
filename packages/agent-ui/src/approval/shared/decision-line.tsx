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

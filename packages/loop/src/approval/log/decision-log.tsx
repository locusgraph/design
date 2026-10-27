import { cn } from "@locusgraph/components";
import { DecisionSummary } from "../../shared/decision-summary";
import type { DecisionLogEntry, DecisionLogKind } from "../types";

export type DecisionLogProps = {
  entries: DecisionLogEntry[];
  emptyText?: string;
  className?: string;
};

const kindVerbs: Record<DecisionLogKind, { approved: string; denied: string }> = {
  approval: { approved: "Approved", denied: "Denied" },
  spend: { approved: "Allowed", denied: "Stopped" },
  stop: { approved: "Resumed", denied: "Stopped" },
  rule: { approved: "Allowed by a rule", denied: "Blocked by a rule" },
};

export function DecisionLog({
  entries,
  emptyText = "No decisions yet.",
  className,
}: DecisionLogProps) {
  if (entries.length === 0) {
    return (
      <p data-slot="decision-log" className={cn("text-sm text-faint", className)}>
        {emptyText}
      </p>
    );
  }
  return (
    <ol
      data-slot="decision-log"
      aria-label="Decision log"
      className={cn("flex flex-col gap-4", className)}
    >
      {entries.map((entry) => {
        const kind = entry.kind ?? "approval";
        return (
          <li key={entry.id} data-kind={kind} className="flex flex-col gap-1">
            <DecisionSummary
              decision={entry.decision}
              result={entry.title}
              approvedVerb={kindVerbs[kind].approved}
              deniedVerb={kindVerbs[kind].denied}
            />
            {entry.detail && <p className="pl-6.5 text-xs text-faint">{entry.detail}</p>}
          </li>
        );
      })}
    </ol>
  );
}

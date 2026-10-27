import { cn } from "@locusgraph/components";
import {
  type DecisionOutcome,
  DecisionSummary,
  type DecisionTimeStyle,
  isoOf,
} from "../../shared/decision-summary";
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

function dayOf(entry: DecisionLogEntry) {
  return entry.decision.at === undefined ? undefined : isoOf(entry.decision.at)?.slice(0, 10);
}

function timeStylesFor(entries: DecisionLogEntry[]): DecisionTimeStyle[] {
  const days = entries.map(dayOf);
  const allOnOneDay = new Set(days).size <= 1;
  return days.map((day, index) =>
    allOnOneDay || (index > 0 && days[index - 1] === day) ? "time" : "full"
  );
}

function summaryAndNotes(entry: DecisionLogEntry) {
  const { reason, by, ...rest } = entry.decision;
  const isRule = entry.kind === "rule";
  const decision: DecisionOutcome = isRule || by === undefined ? rest : { ...rest, by };
  const notes = [isRule ? by : undefined, entry.detail, reason].filter((note): note is string =>
    Boolean(note)
  );
  return { decision, notes };
}

function TimelineRail() {
  return (
    <span
      aria-hidden
      data-slot="decision-log-rail"
      className="absolute top-5 -bottom-4 left-2 w-px -translate-x-1/2 bg-faint/60"
    />
  );
}

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
  const timeStyles = timeStylesFor(entries);
  return (
    <ol
      data-slot="decision-log"
      aria-label="Decision log"
      className={cn("flex flex-col gap-4", className)}
    >
      {entries.map((entry, index) => {
        const kind = entry.kind ?? "approval";
        const { decision, notes } = summaryAndNotes(entry);
        return (
          <li key={entry.id} data-kind={kind} className="relative flex flex-col gap-0.5">
            {index < entries.length - 1 && <TimelineRail />}
            <DecisionSummary
              decision={decision}
              result={entry.title}
              approvedVerb={kindVerbs[kind].approved}
              deniedVerb={kindVerbs[kind].denied}
              timeStyle={timeStyles[index]}
            />
            {notes.map((note) => (
              <p key={note} className="pl-6.5 text-xs text-muted-foreground">
                {note}
              </p>
            ))}
          </li>
        );
      })}
    </ol>
  );
}

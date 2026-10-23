import { Button, cn } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import { Lightbulb as BrainIcon } from "@phosphor-icons/react/ssr";
import { useMemo, useState } from "react";
import { DecisionSummary } from "../../shared/decision-summary";
import { lineMemoryIconClass, lineMemoryObjectClass, lineRowClass } from "../../shared/line";
import { LiveStatus } from "../../shared/live-status";
import { PendingLine } from "../shared/approval-line";
import { useFocusOnMount } from "../shared/use-focus-on-mount";
import { useFocusWhenSettled } from "../shared/use-focus-when-settled";
import type { ApprovalDecision, MemoryReviewResult, ProposedMemory } from "../types";
import { hasBlankEdit, initialDrafts, reviewResult, submitLabel } from "./memory-choices";
import { MemoryRow } from "./memory-row";

export type MemoryReviewProps = {
  memories: ProposedMemory[];
  title?: string;
  description?: string;
  decision?: ApprovalDecision;
  onSubmit: (result: MemoryReviewResult) => void;
  autoFocus?: boolean;
  className?: string;
};

function resultSummary(result: MemoryReviewResult) {
  return `${result.kept.length} kept, ${result.edited.length} edited, ${result.discarded.length} discarded`;
}

function Headline({ count, decided }: { count: number; decided: boolean }) {
  const object = pluralize(count, "memory", "memories");
  return (
    <PendingLine
      icon={<BrainIcon weight="bold" aria-hidden />}
      iconClassName="text-memory"
      status={decided ? null : undefined}
    >
      {decided ? "Reviewed" : "to remember"} <span className={lineMemoryObjectClass}>{object}</span>
    </PendingLine>
  );
}

export function MemoryReview({
  memories,
  title = "Review new memories",
  description = "The agent wants to remember these in LocusGraph. Keep, edit or discard each one.",
  decision,
  onSubmit,
  autoFocus = true,
  className,
}: MemoryReviewProps) {
  const [drafts, setDrafts] = useState(() => initialDrafts(memories));
  const result = useMemo(() => reviewResult(memories, drafts), [memories, drafts]);
  const blankEdit = hasBlankEdit(drafts);
  const empty = memories.length === 0;
  const sensitiveCount = memories.filter((memory) => memory.sensitive).length;
  const submitRef = useFocusOnMount<HTMLButtonElement>(autoFocus && !decision && !empty);
  const settleRef = useFocusWhenSettled<HTMLElement>(!decision);
  return (
    <section
      ref={settleRef}
      tabIndex={-1}
      data-slot="memory-review"
      aria-label={title}
      className={cn("flex min-w-0 flex-col outline-none gap-3", className)}
    >
      {empty ? (
        <div className={lineRowClass}>
          <span aria-hidden className={lineMemoryIconClass}>
            <BrainIcon weight="bold" aria-hidden />
          </span>
          <span>No new memories to review.</span>
        </div>
      ) : decision ? (
        <>
          <Headline count={memories.length} decided />
          <DecisionSummary
            decision={decision}
            approvedVerb="Reviewed"
            deniedVerb="Discarded"
            result={decision.approved ? "Memories reviewed" : "All memories discarded"}
          />
        </>
      ) : (
        <>
          <Headline count={memories.length} decided={false} />
          <p className="-mt-2 text-sm text-faint">
            {description}
            {sensitiveCount > 0 && (
              <span className="text-warn">
                {" "}
                {pluralize(sensitiveCount, "memory", "memories")} flagged as sensitive, set to
                discard.
              </span>
            )}
          </p>
          <ul className="flex flex-col gap-1">
            {memories.map((memory) => (
              <MemoryRow
                key={memory.id}
                memory={memory}
                draft={drafts[memory.id] ?? { choice: "keep", text: memory.text }}
                onChange={(draft) => setDrafts((current) => ({ ...current, [memory.id]: draft }))}
              />
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              ref={submitRef}
              type="button"
              size="sm"
              variant={result.kept.length + result.edited.length === 0 ? "destructive" : "default"}
              disabled={blankEdit}
              onClick={() => onSubmit(result)}
            >
              {submitLabel(result)}
            </Button>
            {blankEdit ? (
              <span className="text-xs text-destructive">An edited memory can't be empty.</span>
            ) : (
              <span className="text-xs text-faint tabular-nums">
                {result.kept.length} kept · {result.edited.length} edited ·{" "}
                {result.discarded.length} discarded
              </span>
            )}
          </div>
        </>
      )}
      <LiveStatus message={decision ? "Memories reviewed" : resultSummary(result)} />
    </section>
  );
}

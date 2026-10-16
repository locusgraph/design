import { Button } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import { BrainIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { DecisionLine } from "../shared/decision-line";
import { ApprovalPanel, LiveStatus } from "../shared/panel";
import { useFocusOnMount } from "../shared/use-focus-on-mount";
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
  const sensitiveCount = memories.filter((memory) => memory.sensitive).length;
  const submitRef = useFocusOnMount<HTMLButtonElement>(
    autoFocus && !decision && memories.length > 0
  );
  return (
    <ApprovalPanel data-slot="memory-review" aria-label={title} className={className}>
      <header className="flex flex-col gap-1">
        <span className="flex items-center gap-2 text-sm font-medium">
          <BrainIcon aria-hidden className="size-4 text-muted-foreground" />
          {title}
        </span>
        <p className="text-sm text-muted-foreground">{description}</p>
        {sensitiveCount > 0 && !decision && (
          <p className="text-sm text-warn">
            {pluralize(sensitiveCount, "memory", "memories")} flagged as sensitive, set to discard.
          </p>
        )}
      </header>
      {memories.length === 0 ? (
        <p className="text-sm text-muted-foreground">No new memories to review.</p>
      ) : decision ? (
        <DecisionLine decision={decision} approvedVerb="Reviewed" deniedVerb="Discarded" />
      ) : (
        <>
          <ul className="flex flex-col divide-y divide-line ring-1 ring-border">
            {memories.map((memory) => (
              <MemoryRow
                key={memory.id}
                memory={memory}
                draft={drafts[memory.id] ?? { choice: "keep", text: memory.text }}
                onChange={(draft) => setDrafts((current) => ({ ...current, [memory.id]: draft }))}
              />
            ))}
          </ul>
          {blankEdit && (
            <p className="text-xs text-destructive">An edited memory can't be empty.</p>
          )}
          <Button
            ref={submitRef}
            type="button"
            size="sm"
            className="self-start"
            disabled={blankEdit}
            onClick={() => onSubmit(result)}
          >
            {submitLabel(result)}
          </Button>
        </>
      )}
      <LiveStatus message={decision ? "Memories reviewed" : resultSummary(result)} />
    </ApprovalPanel>
  );
}

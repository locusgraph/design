import { Button } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import { Lightbulb as BrainIcon } from "@phosphor-icons/react/ssr";
import { useMemo, useState } from "react";
import {
  ApprovalPanel,
  LiveStatus,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelTitle,
} from "../../shared/panel";
import { PanelEmpty } from "../../shared/panel-empty";
import { DecisionSummary } from "../shared/decision-line";
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

function headerStatus(decision: ApprovalDecision | undefined, empty: boolean) {
  if (decision) return { status: "Reviewed", tone: "done" as const };
  if (empty) return { status: "Nothing new", tone: "idle" as const };
  return { status: "Waiting for you", tone: "waiting" as const };
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
  const { status, tone } = headerStatus(decision, empty);
  return (
    <ApprovalPanel data-slot="memory-review" aria-label={title} className={className}>
      <PanelHeader
        icon={<BrainIcon weight="bold" aria-hidden />}
        eyebrow="Memory"
        status={status}
        tone={tone}
        aside={empty ? undefined : pluralize(memories.length, "proposed", "proposed")}
      />
      <PanelTitle className={decision ? "text-muted-foreground" : undefined}>{title}</PanelTitle>
      {empty ? (
        <PanelEmpty
          icon={<BrainIcon weight="bold" aria-hidden />}
          title="No new memories to review."
          description="When an agent wants to remember something in LocusGraph, it shows up here."
        />
      ) : decision ? (
        <PanelBody>
          <DecisionSummary
            decision={decision}
            approvedVerb="Reviewed"
            deniedVerb="Discarded"
            result={decision.approved ? "Memories reviewed" : "All memories discarded"}
          />
        </PanelBody>
      ) : (
        <>
          <p className="px-5 pt-1 text-sm text-muted-foreground">
            {description}
            {sensitiveCount > 0 && (
              <span className="text-warn">
                {" "}
                {pluralize(sensitiveCount, "memory", "memories")} flagged as sensitive, set to
                discard.
              </span>
            )}
          </p>
          <PanelBody className="pb-0">
            <ul className="-mx-5 flex flex-col divide-y border-t">
              {memories.map((memory) => (
                <MemoryRow
                  key={memory.id}
                  memory={memory}
                  draft={drafts[memory.id] ?? { choice: "keep", text: memory.text }}
                  onChange={(draft) => setDrafts((current) => ({ ...current, [memory.id]: draft }))}
                />
              ))}
            </ul>
          </PanelBody>
          <PanelFooter className="justify-between">
            {blankEdit ? (
              <span className="text-xs text-destructive">An edited memory can't be empty.</span>
            ) : (
              <span className="hidden font-mono text-[11px] text-muted-foreground tabular-nums sm:inline">
                {result.kept.length} kept · {result.edited.length} edited ·{" "}
                {result.discarded.length} discarded
              </span>
            )}
            <Button
              ref={submitRef}
              type="button"
              size="sm"
              className="ml-auto"
              variant={result.kept.length + result.edited.length === 0 ? "destructive" : "default"}
              disabled={blankEdit}
              onClick={() => onSubmit(result)}
            >
              {submitLabel(result)}
            </Button>
          </PanelFooter>
        </>
      )}
      <LiveStatus message={decision ? "Memories reviewed" : resultSummary(result)} />
    </ApprovalPanel>
  );
}

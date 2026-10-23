import { Collapsible, CollapsibleContent, CollapsibleTrigger, cn } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import {
  CaretRight as ChevronRightIcon,
  ClockCounterClockwise as HistoryIcon,
} from "@phosphor-icons/react/ssr";
import {
  lineChevronClass,
  lineDetailClass,
  lineDetailLinkClass,
  lineDetailRowClass,
  lineMemoryIconClass,
  lineMemoryObjectClass,
  lineTriggerClass,
} from "../shared/line";
import type { MemoryRef } from "../types";

export type RecallProps = {
  memories: MemoryRef[];
  onOpenMemory?: (id: string) => void;
  defaultOpen?: boolean;
  className?: string;
};

export function relevancePercent(relevance: number): number {
  return Math.round(Math.min(Math.max(relevance, 0), 1) * 100);
}

export function Recall({ memories, onOpenMemory, defaultOpen = false, className }: RecallProps) {
  if (memories.length === 0) return null;
  return (
    <Collapsible
      data-slot="recall"
      defaultOpen={defaultOpen}
      className={cn("flex min-w-0 flex-col", className)}
    >
      <CollapsibleTrigger className={lineTriggerClass}>
        <span aria-hidden className={lineMemoryIconClass}>
          <HistoryIcon weight="bold" aria-hidden />
        </span>
        <span className="truncate">
          Recalled{" "}
          <span className={lineMemoryObjectClass}>
            {pluralize(memories.length, "memory", "memories")}
          </span>
        </span>
        <ChevronRightIcon weight="bold" aria-hidden className={lineChevronClass} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className={cn(lineDetailClass, "flex flex-col pb-2 text-muted-foreground")}>
          {memories.map((memory) => (
            <RecallRow key={memory.id} memory={memory} onOpenMemory={onOpenMemory} />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

function Relevance({ memory }: { memory: MemoryRef }) {
  if (memory.relevance === undefined) return null;
  const percent = relevancePercent(memory.relevance);
  return (
    <span
      role="meter"
      aria-label={`Relevance of ${memory.label}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-valuetext={`${percent}% relevant`}
      className="shrink-0 text-xs text-faint tabular-nums"
    >
      {percent}%
    </span>
  );
}

function RecallRow({
  memory,
  onOpenMemory,
}: {
  memory: MemoryRef;
  onOpenMemory?: (id: string) => void;
}) {
  const content = (
    <>
      <span className="flex w-full items-baseline gap-3">
        <span className="min-w-0 truncate">{memory.label}</span>
        <Relevance memory={memory} />
      </span>
      {(memory.kind || memory.snippet) && (
        <span className="line-clamp-2 w-full text-xs text-faint">
          {memory.kind && <span className="whitespace-nowrap">{memory.kind}</span>}
          {memory.kind && memory.snippet && <span aria-hidden> · </span>}
          {memory.snippet}
        </span>
      )}
    </>
  );
  const rowClass = cn(lineDetailRowClass, "flex-col items-start gap-0.5");
  return (
    <li data-slot="recall-item" data-id={memory.id}>
      {onOpenMemory ? (
        <button
          type="button"
          aria-label={`Open memory ${memory.label}`}
          onClick={() => onOpenMemory(memory.id)}
          className={cn(rowClass, lineDetailLinkClass)}
        >
          {content}
        </button>
      ) : (
        <div className={rowClass}>{content}</div>
      )}
    </li>
  );
}

import { Collapsible, CollapsibleContent, CollapsibleTrigger, cn } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import { ChevronRightIcon, HistoryIcon } from "lucide-react";
import type { MemoryRef } from "../types";
import {
  chevronClass,
  collapsibleTriggerClass,
  interactiveRowClass,
  ruledListClass,
} from "./shared/disclosure";

export type MemoryRecallProps = {
  memories: MemoryRef[];
  onOpenMemory?: (id: string) => void;
  defaultOpen?: boolean;
  className?: string;
};

export function relevancePercent(relevance: number): number {
  return Math.round(Math.min(Math.max(relevance, 0), 1) * 100);
}

export function MemoryRecall({
  memories,
  onOpenMemory,
  defaultOpen = false,
  className,
}: MemoryRecallProps) {
  if (memories.length === 0) return null;
  return (
    <Collapsible
      data-slot="memory-recall"
      defaultOpen={defaultOpen}
      className={cn("flex min-w-0 flex-col gap-2", className)}
    >
      <CollapsibleTrigger className={collapsibleTriggerClass}>
        <HistoryIcon aria-hidden />
        Recalled {pluralize(memories.length, "memory", "memories")}
        <ChevronRightIcon aria-hidden className={chevronClass} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className={ruledListClass}>
          {memories.map((memory) => (
            <MemoryRecallRow key={memory.id} memory={memory} onOpenMemory={onOpenMemory} />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

function RelevanceMeter({ memory }: { memory: MemoryRef }) {
  if (memory.relevance === undefined) return null;
  const percent = relevancePercent(memory.relevance);
  return (
    <span className="flex shrink-0 items-center gap-2">
      <span
        role="meter"
        aria-label={`Relevance of ${memory.label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={`${percent}% relevant`}
        className="relative h-[3px] w-10 overflow-hidden bg-muted"
      >
        <span
          className="absolute inset-y-0 left-0 bg-foreground/60 transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </span>
      <span className="w-8 text-right font-mono text-xs text-muted-foreground tabular-nums">
        {percent}%
      </span>
    </span>
  );
}

function MemoryRecallRow({
  memory,
  onOpenMemory,
}: {
  memory: MemoryRef;
  onOpenMemory?: (id: string) => void;
}) {
  const content = (
    <>
      <span className="flex w-full items-baseline gap-3">
        <span className="min-w-0 flex-1 truncate text-sm font-medium">{memory.label}</span>
        <RelevanceMeter memory={memory} />
      </span>
      {(memory.kind || memory.snippet) && (
        <span className="flex w-full gap-2 text-xs text-muted-foreground">
          {memory.kind && <span className="shrink-0 font-mono">{memory.kind}</span>}
          {memory.kind && memory.snippet && <span aria-hidden>·</span>}
          {memory.snippet && <span className="line-clamp-2 min-w-0">{memory.snippet}</span>}
        </span>
      )}
    </>
  );
  const rowClass = "flex w-full flex-col items-start gap-1 px-3 py-2.5 text-left";
  return (
    <li data-slot="memory-recall-item" data-id={memory.id}>
      {onOpenMemory ? (
        <button
          type="button"
          aria-label={`Open memory ${memory.label}`}
          onClick={() => onOpenMemory(memory.id)}
          className={cn(rowClass, interactiveRowClass)}
        >
          {content}
        </button>
      ) : (
        <div className={rowClass}>{content}</div>
      )}
    </li>
  );
}

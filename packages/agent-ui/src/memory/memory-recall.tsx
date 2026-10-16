import {
  Badge,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  cn,
} from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import { ChevronDownIcon } from "lucide-react";
import type { MemoryRef } from "../types";
import { chevronClass, collapsibleTriggerClass } from "./shared/disclosure";

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
      className={cn("flex flex-col gap-1", className)}
    >
      <CollapsibleTrigger className={collapsibleTriggerClass}>
        Recalled {pluralize(memories.length, "memory", "memories")}
        <ChevronDownIcon aria-hidden className={chevronClass} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="flex flex-col divide-y divide-border border border-border">
          {memories.map((memory) => (
            <MemoryRecallRow key={memory.id} memory={memory} onOpenMemory={onOpenMemory} />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

function RelevanceBar({ memory }: { memory: MemoryRef }) {
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
        className="relative h-1 w-14 overflow-hidden rounded-full bg-muted"
      >
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </span>
      <span className="w-8 text-right font-mono text-[11.5px] text-muted-foreground tabular-nums">
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
      <span className="flex w-full items-center gap-2">
        <span className="min-w-0 flex-1 truncate text-sm font-medium">{memory.label}</span>
        {memory.kind && (
          <Badge variant="outline" className="font-mono text-[11px] font-normal">
            {memory.kind}
          </Badge>
        )}
        <RelevanceBar memory={memory} />
      </span>
      {memory.snippet && (
        <span className="line-clamp-2 text-xs text-muted-foreground">{memory.snippet}</span>
      )}
    </>
  );
  const rowClass = "flex w-full flex-col items-start gap-1 px-3 py-2 text-left";
  return (
    <li data-slot="memory-recall-item" data-id={memory.id}>
      {onOpenMemory ? (
        <button
          type="button"
          aria-label={`Open memory ${memory.label}`}
          onClick={() => onOpenMemory(memory.id)}
          className={cn(
            rowClass,
            "outline-none transition-colors duration-150 hover:bg-accent/60 focus-visible:bg-accent motion-reduce:transition-none"
          )}
        >
          {content}
        </button>
      ) : (
        <div className={rowClass}>{content}</div>
      )}
    </li>
  );
}

"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger, cn } from "@locusgraph/components";
import { Lightbulb as BrainIcon, CaretRight as ChevronRightIcon } from "@phosphor-icons/react/ssr";
import { useEffect, useRef, useState } from "react";
import {
  lineChevronClass,
  lineDetailClass,
  lineIconClass,
  lineTriggerClass,
} from "../../shared/line";
import type { ReasoningPart } from "../../types";
import { firstLineOf, thoughtDurationLabel } from "./thought-duration";

export type ThinkingProps = Omit<ReasoningPart, "type"> & {
  defaultOpen?: boolean;
  className?: string;
};

function useThinkingOpen(streaming: boolean, defaultOpen: boolean | undefined) {
  const [open, setOpen] = useState(defaultOpen ?? streaming);
  const openedByUser = useRef(false);
  const wasStreaming = useRef(streaming);

  useEffect(() => {
    if (wasStreaming.current === streaming) return;
    wasStreaming.current = streaming;
    if (streaming) setOpen(true);
    else if (!openedByUser.current) setOpen(false);
  }, [streaming]);

  function toggle(next: boolean) {
    setOpen(next);
    openedByUser.current = next;
  }

  return [open, toggle] as const;
}

export function Thinking({ text, state, durationMs, defaultOpen, className }: ThinkingProps) {
  const streaming = state === "streaming";
  const [open, setOpen] = useThinkingOpen(streaming, defaultOpen);
  const summary = firstLineOf(text);

  return (
    <Collapsible
      data-slot="thinking"
      data-state={streaming ? "streaming" : "done"}
      open={open}
      onOpenChange={setOpen}
      className={cn("flex min-w-0 flex-col", className)}
    >
      <CollapsibleTrigger aria-expanded={open} className={lineTriggerClass}>
        <span aria-hidden className={lineIconClass}>
          <BrainIcon weight="bold" aria-hidden />
        </span>
        <span aria-live="polite" className={cn("shrink-0", streaming && "motion-safe:shimmer")}>
          {streaming ? "Thinking…" : thoughtDurationLabel(durationMs)}
        </span>
        {!open && summary && (
          <span data-slot="thinking-summary" className="min-w-0 truncate text-faint">
            {summary}
          </span>
        )}
        <ChevronRightIcon weight="bold" aria-hidden className={lineChevronClass} />
      </CollapsibleTrigger>
      <CollapsibleContent
        data-slot="thinking-content"
        className={cn(
          lineDetailClass,
          "pb-2 leading-relaxed whitespace-pre-wrap text-muted-foreground"
        )}
      >
        {text}
      </CollapsibleContent>
    </Collapsible>
  );
}

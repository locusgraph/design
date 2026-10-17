"use client";

import { Idea as BrainIcon, ChevronRight as ChevronRightIcon } from "@carbon/icons-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, cn } from "@locusgraph/components";
import { useEffect, useRef, useState } from "react";
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
      className={cn("flex min-w-0 flex-col gap-2 text-sm text-muted-foreground", className)}
    >
      <CollapsibleTrigger
        aria-expanded={open}
        className="group locus-eyebrow flex w-fit items-center gap-2 py-1 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
      >
        <BrainIcon className="size-3.5 shrink-0" aria-hidden />
        <span aria-live="polite" className={cn(streaming && "motion-safe:locus-shimmer")}>
          {streaming ? "Thinking…" : thoughtDurationLabel(durationMs)}
        </span>
        <ChevronRightIcon
          aria-hidden
          className={cn(
            "size-3.5 shrink-0 opacity-70 motion-safe:transition-transform",
            open && "rotate-90"
          )}
        />
      </CollapsibleTrigger>
      {!open && summary && (
        <p
          data-slot="thinking-summary"
          className="ml-[6.5px] truncate border-l border-border pl-4 text-muted-foreground/80"
        >
          {summary}
        </p>
      )}
      <CollapsibleContent
        data-slot="thinking-content"
        className="ml-[6.5px] border-l border-border pl-4 leading-relaxed whitespace-pre-wrap"
      >
        {text}
      </CollapsibleContent>
    </Collapsible>
  );
}

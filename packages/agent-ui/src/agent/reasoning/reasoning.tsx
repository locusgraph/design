"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger, cn } from "@locusgraph/components";
import { BrainIcon, ChevronDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReasoningPart } from "../../types";
import { firstLineOf, thoughtDurationLabel } from "./thought-duration";

export type ReasoningProps = Omit<ReasoningPart, "type"> & {
  defaultOpen?: boolean;
  className?: string;
};

function useReasoningOpen(streaming: boolean, defaultOpen: boolean | undefined) {
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

export function Reasoning({ text, state, durationMs, defaultOpen, className }: ReasoningProps) {
  const streaming = state === "streaming";
  const [open, setOpen] = useReasoningOpen(streaming, defaultOpen);
  const summary = firstLineOf(text);

  return (
    <Collapsible
      data-slot="reasoning"
      data-state={streaming ? "streaming" : "done"}
      open={open}
      onOpenChange={setOpen}
      className={cn("flex flex-col gap-1.5 text-sm text-muted-foreground", className)}
    >
      <CollapsibleTrigger
        aria-expanded={open}
        className="flex w-fit items-center gap-2 rounded-full font-mono text-[11.5px] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
      >
        <BrainIcon className="size-3.5" aria-hidden />
        <span aria-live="polite" className={cn(streaming && "motion-safe:shimmer")}>
          {streaming ? "Thinking…" : thoughtDurationLabel(durationMs)}
        </span>
        <ChevronDownIcon
          aria-hidden
          className={cn("size-3.5 motion-safe:transition-transform", open && "rotate-180")}
        />
      </CollapsibleTrigger>
      {!open && summary && (
        <p data-slot="reasoning-summary" className="truncate border-l border-border pl-3">
          {summary}
        </p>
      )}
      <CollapsibleContent
        data-slot="reasoning-content"
        className="border-l border-border pl-3 leading-relaxed whitespace-pre-wrap"
      >
        {text}
      </CollapsibleContent>
    </Collapsible>
  );
}

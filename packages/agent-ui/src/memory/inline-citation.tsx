import { cn, HoverCard, HoverCardContent, HoverCardTrigger } from "@locusgraph/components";
import type { MouseEvent } from "react";
import type { Citation } from "../types";
import { hostLabel } from "./shared/host-label";

export type InlineCitationProps = {
  citation: Citation;
  onOpen?: (citation: Citation) => void;
  className?: string;
};

const pillClass =
  "inline-flex h-4 min-w-4 items-center justify-center rounded-full border border-border bg-muted px-1 font-mono text-[10.5px] leading-none text-muted-foreground tabular-nums no-underline transition-colors duration-150 outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/70 motion-reduce:transition-none";

export function citationLabel(citation: Citation): string {
  return `Source ${citation.index}: ${citation.title}`;
}

export function InlineCitation({ citation, onOpen, className }: InlineCitationProps) {
  const host = hostLabel(citation.url);
  const label = citationLabel(citation);
  const open = (event: MouseEvent) => {
    if (!onOpen) return;
    event.preventDefault();
    onOpen(citation);
  };
  return (
    <sup
      data-slot="inline-citation"
      data-index={citation.index}
      className={cn("ml-0.5 align-super leading-none", className)}
    >
      <HoverCard openDelay={150} closeDelay={100}>
        <HoverCardTrigger asChild>
          {citation.url ? (
            <a
              href={citation.url}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              onClick={open}
              className={pillClass}
            >
              {citation.index}
            </a>
          ) : (
            <button type="button" aria-label={label} onClick={open} className={pillClass}>
              {citation.index}
            </button>
          )}
        </HoverCardTrigger>
        <HoverCardContent
          data-slot="inline-citation-card"
          align="start"
          className="flex w-72 flex-col gap-1.5 rounded-none p-3"
        >
          <span className="flex items-center gap-2 font-mono text-[11.5px] text-muted-foreground">
            <span className="tabular-nums">[{citation.index}]</span>
            {host && <span className="truncate">{host}</span>}
          </span>
          <span className="text-sm font-medium leading-snug">{citation.title}</span>
          {citation.snippet && (
            <p className="line-clamp-4 text-xs text-muted-foreground">{citation.snippet}</p>
          )}
        </HoverCardContent>
      </HoverCard>
    </sup>
  );
}

import { cn, HoverCard, HoverCardContent, HoverCardTrigger } from "@locusgraph/components";
import type { MouseEvent } from "react";
import type { Citation } from "../types";
import { eyebrowClass } from "./shared/disclosure";
import { hostLabel } from "./shared/host-label";
import { SourceMark } from "./shared/source-mark";

export type InlineCitationProps = {
  citation: Citation;
  onOpen?: (citation: Citation) => void;
  className?: string;
};

const pillClass =
  "inline-flex h-[15px] min-w-[15px] items-center justify-center bg-muted px-1 font-mono text-[10px] leading-none font-medium text-muted-foreground tabular-nums no-underline ring-1 ring-border transition-colors duration-150 outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/70 motion-reduce:transition-none";

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
          className="flex w-72 flex-col gap-2 rounded-none p-4"
        >
          <span className={cn("flex min-w-0 items-center gap-2", eyebrowClass)}>
            <SourceMark citation={citation} />
            <span className="truncate">{host ?? "Source"}</span>
            <span className="ml-auto tabular-nums">{citation.index}</span>
          </span>
          <span className="text-sm leading-snug font-medium">{citation.title}</span>
          {citation.snippet && (
            <p className="line-clamp-4 text-xs leading-relaxed text-muted-foreground">
              {citation.snippet}
            </p>
          )}
        </HoverCardContent>
      </HoverCard>
    </sup>
  );
}

import { cn, HoverCard, HoverCardContent, HoverCardTrigger } from "@locusgraph/components";
import type { MouseEvent } from "react";
import type { Citation } from "../types";
import { hostLabel } from "./shared/host-label";
import { SourceMark } from "./shared/source-mark";

export type CiteProps = {
  citation: Citation;
  onOpen?: (citation: Citation) => void;
  className?: string;
};

const pillClass =
  "inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-muted px-1 text-[10px] leading-none font-medium text-muted-foreground tabular-nums no-underline transition-colors duration-150 outline-none hover:bg-s1/15 hover:text-s1 focus-visible:ring-2 focus-visible:ring-ring/70 data-[state=open]:bg-s1/15 data-[state=open]:text-s1 motion-reduce:transition-none";

export function citationLabel(citation: Citation): string {
  return `Source ${citation.index}: ${citation.title}`;
}

export function Cite({ citation, onOpen, className }: CiteProps) {
  const host = hostLabel(citation.url);
  const label = citationLabel(citation);
  const open = (event: MouseEvent) => {
    if (!onOpen) return;
    event.preventDefault();
    onOpen(citation);
  };
  return (
    <sup
      data-slot="cite"
      data-index={citation.index}
      className={cn("relative -top-1 ml-0.5 align-baseline leading-none", className)}
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
          data-slot="cite-card"
          side="bottom"
          align="start"
          sideOffset={6}
          collisionPadding={12}
          className="flex w-72 flex-col gap-2 rounded-none border-0 p-4 ring-1 ring-border"
        >
          <span className="flex min-w-0 items-center gap-2 text-xs text-faint">
            <SourceMark citation={citation} />
            <span className="truncate">{host ?? "Source"}</span>
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

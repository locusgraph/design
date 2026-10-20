"use client";

import { ChevronRight as ChevronRightIcon } from "@carbon/icons-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, cn } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import type { Citation } from "../types";
import {
  chevronClass,
  collapsibleTriggerClass,
  interactiveRowClass,
  ruledListClass,
  ruledRowClass,
} from "./shared/disclosure";
import { hostLabel, type SourceItem, sourceKey, toCitation } from "./shared/host-label";
import { SourceMark } from "./shared/source-mark";

export type SourcesProps = {
  sources: SourceItem[];
  onOpen?: (citation: Citation) => void;
  defaultOpen?: boolean;
  className?: string;
};

const stackedMarkLimit = 3;

export function Sources({ sources, onOpen, defaultOpen = false, className }: SourcesProps) {
  if (sources.length === 0) return null;
  const citations = sources.map(toCitation);
  return (
    <Collapsible
      data-slot="sources"
      defaultOpen={defaultOpen}
      className={cn("flex min-w-0 flex-col gap-2", className)}
    >
      <CollapsibleTrigger className={collapsibleTriggerClass}>
        <span aria-hidden className="flex -space-x-1">
          {citations.slice(0, stackedMarkLimit).map((citation, position) => (
            <SourceMark
              key={sourceKey(sources[position] as SourceItem, position)}
              citation={citation}
              className="ring-card"
            />
          ))}
        </span>
        Used {pluralize(sources.length, "source")}
        <ChevronRightIcon aria-hidden className={chevronClass} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ol className={ruledListClass}>
          {citations.map((citation, position) => (
            <SourceRow
              key={sourceKey(sources[position] as SourceItem, position)}
              citation={citation}
              onOpen={onOpen}
            />
          ))}
        </ol>
      </CollapsibleContent>
    </Collapsible>
  );
}

function SourceRow({
  citation,
  onOpen,
}: {
  citation: Citation;
  onOpen?: (citation: Citation) => void;
}) {
  const host = hostLabel(citation.url);
  const showHost = host !== undefined && host !== citation.title;
  const content = (
    <>
      <span className="w-4 shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
        {citation.index}
      </span>
      <span className="min-w-0 flex-1 truncate">{citation.title}</span>
      {showHost && (
        <span className="max-w-[40%] shrink-0 truncate text-xs text-muted-foreground">{host}</span>
      )}
    </>
  );
  const rowClass = ruledRowClass;
  const label = `Open source ${citation.index}: ${citation.title}`;
  return (
    <li data-slot="sources-item" data-index={citation.index}>
      {onOpen ? (
        <button
          type="button"
          aria-label={label}
          onClick={() => onOpen(citation)}
          className={cn(rowClass, interactiveRowClass)}
        >
          {content}
        </button>
      ) : citation.url ? (
        <a
          href={citation.url}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className={cn(rowClass, interactiveRowClass)}
        >
          {content}
        </a>
      ) : (
        <div className={rowClass}>{content}</div>
      )}
    </li>
  );
}

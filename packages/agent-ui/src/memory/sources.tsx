import { Collapsible, CollapsibleContent, CollapsibleTrigger, cn } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import { ChevronDownIcon } from "lucide-react";
import type { Citation } from "../types";
import { chevronClass, collapsibleTriggerClass } from "./shared/disclosure";
import { hostLabel, type SourceItem, sourceKey, toCitation } from "./shared/host-label";

export type SourcesProps = {
  sources: SourceItem[];
  onOpen?: (citation: Citation) => void;
  defaultOpen?: boolean;
  className?: string;
};

export function Sources({ sources, onOpen, defaultOpen = false, className }: SourcesProps) {
  if (sources.length === 0) return null;
  return (
    <Collapsible
      data-slot="sources"
      defaultOpen={defaultOpen}
      className={cn("flex flex-col gap-1", className)}
    >
      <CollapsibleTrigger className={collapsibleTriggerClass}>
        Used {pluralize(sources.length, "source")}
        <ChevronDownIcon aria-hidden className={chevronClass} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ol className="flex flex-col divide-y divide-border border border-border">
          {sources.map((item, position) => (
            <SourceRow
              key={sourceKey(item, position)}
              citation={toCitation(item, position)}
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
  const content = (
    <>
      <span className="font-mono text-[11.5px] text-muted-foreground tabular-nums">
        [{citation.index}]
      </span>
      <span className="min-w-0 flex-1 truncate">{citation.title}</span>
      {host && (
        <span className="shrink-0 font-mono text-[11.5px] text-muted-foreground">{host}</span>
      )}
    </>
  );
  const rowClass =
    "flex w-full items-center gap-3 px-3 py-2 text-left text-sm outline-none transition-colors duration-150 hover:bg-accent/60 focus-visible:bg-accent motion-reduce:transition-none";
  const label = `Open source ${citation.index}: ${citation.title}`;
  return (
    <li data-slot="sources-item" data-index={citation.index}>
      {onOpen ? (
        <button
          type="button"
          aria-label={label}
          onClick={() => onOpen(citation)}
          className={rowClass}
        >
          {content}
        </button>
      ) : citation.url ? (
        <a
          href={citation.url}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className={rowClass}
        >
          {content}
        </a>
      ) : (
        <div className={rowClass}>{content}</div>
      )}
    </li>
  );
}

import { Collapsible, CollapsibleContent, CollapsibleTrigger, cn } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import {
  CaretRight as ChevronRightIcon,
  FileText as DocumentIcon,
} from "@phosphor-icons/react/ssr";
import {
  lineChevronClass,
  lineDetailClass,
  lineDetailLinkClass,
  lineDetailRowClass,
  lineIconClass,
  lineObjectClass,
  lineTriggerClass,
} from "../shared/line";
import type { Citation } from "../types";
import { hostLabel, type SourceItem, sourceKey, toCitation } from "./shared/host-label";

export type SourcesProps = {
  sources: SourceItem[];
  onOpen?: (citation: Citation) => void;
  defaultOpen?: boolean;
  firstIndex?: number;
  className?: string;
};

const sourceRowClass = cn(lineDetailRowClass, "items-baseline gap-3");

export function Sources({
  sources,
  onOpen,
  defaultOpen = false,
  firstIndex = 1,
  className,
}: SourcesProps) {
  if (sources.length === 0) return null;
  const citations = sources.map((source, position) => toCitation(source, position, firstIndex));
  return (
    <Collapsible
      data-slot="sources"
      defaultOpen={defaultOpen}
      className={cn("flex min-w-0 flex-col", className)}
    >
      <CollapsibleTrigger className={lineTriggerClass}>
        <span aria-hidden className={lineIconClass}>
          <DocumentIcon weight="bold" aria-hidden />
        </span>
        <span className="truncate">
          Used <span className={lineObjectClass}>{pluralize(sources.length, "source")}</span>
        </span>
        <ChevronRightIcon weight="bold" aria-hidden className={lineChevronClass} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ol className={cn(lineDetailClass, "flex flex-col pb-2 text-muted-foreground")}>
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
      <span className="w-3 shrink-0 text-xs text-faint tabular-nums">{citation.index}</span>
      <span className="min-w-0 truncate">{citation.title}</span>
      {showHost && <span className="max-w-[40%] shrink-0 truncate text-xs text-faint">{host}</span>}
    </>
  );
  const label = `Open source ${citation.index}: ${citation.title}`;
  return (
    <li data-slot="sources-item" data-index={citation.index}>
      {onOpen ? (
        <button
          type="button"
          aria-label={label}
          onClick={() => onOpen(citation)}
          className={cn(sourceRowClass, lineDetailLinkClass)}
        >
          {content}
        </button>
      ) : citation.url ? (
        <a
          href={citation.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${label}, opens in a new tab`}
          className={cn(sourceRowClass, lineDetailLinkClass)}
        >
          {content}
        </a>
      ) : (
        <div className={sourceRowClass}>{content}</div>
      )}
    </li>
  );
}

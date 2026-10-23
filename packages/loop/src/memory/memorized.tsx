import { cn } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import { BookmarkSimple as BookmarkPlusIcon } from "@phosphor-icons/react/ssr";
import {
  lineDetailClass,
  lineMemoryIconClass,
  lineMemoryObjectClass,
  lineRowClass,
} from "../shared/line";

export type MemorizedStatus = "saved" | "undone";

export type MemorizedItem = {
  id: string;
  text: string;
  kind?: string;
  status: MemorizedStatus;
};

export type MemorizedProps = {
  items: MemorizedItem[];
  onUndo?: (id: string) => void;
  className?: string;
};

function savedCount(items: MemorizedItem[]) {
  return items.filter((item) => item.status === "saved").length;
}

export function memorizedSummary(items: MemorizedItem[]): string {
  return `Saved ${pluralize(savedCount(items), "memory", "memories")}`;
}

export function Memorized({ items, onUndo, className }: MemorizedProps) {
  if (items.length === 0) return null;
  return (
    <section
      data-slot="memorized"
      aria-label="Saved to memory"
      className={cn("flex min-w-0 flex-col", className)}
    >
      <header aria-live="polite" aria-label={memorizedSummary(items)} className={lineRowClass}>
        <span aria-hidden className={lineMemoryIconClass}>
          <BookmarkPlusIcon weight="bold" aria-hidden />
        </span>
        <span aria-hidden className="truncate">
          Saved{" "}
          <span className={lineMemoryObjectClass}>
            {pluralize(savedCount(items), "memory", "memories")}
          </span>
        </span>
      </header>
      <ul className={cn(lineDetailClass, "flex flex-col pb-2 text-muted-foreground")}>
        {items.map((item) => (
          <MemorizedRow key={item.id} item={item} onUndo={onUndo} />
        ))}
      </ul>
    </section>
  );
}

function MemorizedRow({ item, onUndo }: { item: MemorizedItem; onUndo?: (id: string) => void }) {
  const undone = item.status === "undone";
  return (
    <li
      data-slot="memorized-item"
      data-status={item.status}
      className="flex min-w-0 items-baseline gap-3 py-1"
    >
      <span className="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
        <span className={cn(undone && "text-faint line-through decoration-faint")}>
          {item.text}
        </span>
        {item.kind && <span className="text-xs text-faint">{item.kind}</span>}
      </span>
      {undone ? (
        <span className="shrink-0 text-xs text-faint">Undone</span>
      ) : (
        onUndo && (
          <button
            type="button"
            aria-label={`Undo saving ${item.text}`}
            onClick={() => onUndo(item.id)}
            className="shrink-0 text-xs text-faint outline-none transition-colors hover:text-s1 focus-visible:ring-2 focus-visible:ring-ring/70"
          >
            Undo
          </button>
        )
      )}
    </li>
  );
}

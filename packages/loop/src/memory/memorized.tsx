import { Button, cn } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import { BookmarkPlusIcon, CheckIcon, Undo2Icon } from "lucide-react";
import { StatusDot } from "../shared/status-dot";
import { eyebrowClass, ruledListClass } from "./shared/disclosure";

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

export function memorizedSummary(items: MemorizedItem[]): string {
  const saved = items.filter((item) => item.status === "saved").length;
  return `Saved ${pluralize(saved, "memory", "memories")}`;
}

export function Memorized({ items, onUndo, className }: MemorizedProps) {
  if (items.length === 0) return null;
  return (
    <section
      data-slot="memorized"
      aria-label="Saved to memory"
      className={cn("flex min-w-0 flex-col gap-2", className)}
    >
      <header aria-live="polite" className={cn("flex items-center gap-2 py-1", eyebrowClass)}>
        <BookmarkPlusIcon aria-hidden />
        {memorizedSummary(items)}
      </header>
      <ul className={ruledListClass}>
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
      className="flex min-h-11 items-center gap-3 px-3 py-2.5"
    >
      <CheckIcon
        aria-hidden
        className={cn("size-3.5 shrink-0", undone ? "text-muted-foreground/40" : "text-good")}
      />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={cn(
            "text-sm font-medium",
            undone && "font-normal text-muted-foreground line-through decoration-muted-foreground"
          )}
        >
          {item.text}
        </span>
        {item.kind && <span className="font-mono text-xs text-muted-foreground">{item.kind}</span>}
      </span>
      {undone ? (
        <span className="eyebrow flex shrink-0 items-center gap-1.5">
          <StatusDot tone="idle" />
          Undone
        </span>
      ) : (
        onUndo && (
          <Button
            variant="ghost"
            size="xs"
            className="-mr-2 text-muted-foreground hover:text-foreground"
            aria-label={`Undo saving ${item.text}`}
            onClick={() => onUndo(item.id)}
          >
            <Undo2Icon aria-hidden />
            Undo
          </Button>
        )
      )}
    </li>
  );
}

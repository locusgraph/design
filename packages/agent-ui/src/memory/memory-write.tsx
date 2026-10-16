import { Badge, Button, cn, RuleGridLabel } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import { BookmarkPlusIcon, Undo2Icon } from "lucide-react";

export type MemoryWriteStatus = "saved" | "undone";

export type MemoryWriteItem = {
  id: string;
  text: string;
  kind?: string;
  status: MemoryWriteStatus;
};

export type MemoryWriteProps = {
  items: MemoryWriteItem[];
  onUndo?: (id: string) => void;
  className?: string;
};

export function memoryWriteSummary(items: MemoryWriteItem[]): string {
  const saved = items.filter((item) => item.status === "saved").length;
  return `Saved ${pluralize(saved, "memory", "memories")}`;
}

export function MemoryWrite({ items, onUndo, className }: MemoryWriteProps) {
  if (items.length === 0) return null;
  return (
    <section
      data-slot="memory-write"
      aria-label="Saved to memory"
      className={cn("flex flex-col border border-border", className)}
    >
      <header className="flex items-center gap-2 border-b border-border px-3 py-2">
        <BookmarkPlusIcon aria-hidden className="size-3.5 text-muted-foreground" />
        <RuleGridLabel>{memoryWriteSummary(items)}</RuleGridLabel>
      </header>
      <ul className="flex flex-col divide-y divide-border">
        {items.map((item) => (
          <MemoryWriteRow key={item.id} item={item} onUndo={onUndo} />
        ))}
      </ul>
    </section>
  );
}

function MemoryWriteRow({
  item,
  onUndo,
}: {
  item: MemoryWriteItem;
  onUndo?: (id: string) => void;
}) {
  const undone = item.status === "undone";
  return (
    <li
      data-slot="memory-write-item"
      data-status={item.status}
      className="flex items-center gap-3 px-3 py-2"
    >
      <span
        className={cn(
          "min-w-0 flex-1 text-sm",
          undone && "text-muted-foreground line-through decoration-muted-foreground"
        )}
      >
        {item.text}
      </span>
      {item.kind && (
        <Badge
          variant="outline"
          className={cn("font-mono text-[11px] font-normal", undone && "opacity-60")}
        >
          {item.kind}
        </Badge>
      )}
      {undone ? (
        <span className="font-mono text-[11.5px] text-muted-foreground">Undone</span>
      ) : (
        onUndo && (
          <Button
            variant="ghost"
            size="xs"
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

import { cn } from "@locusgraph/components";
import { useRef } from "react";
import {
  rowOffsetStyle,
  useListVirtualizer,
  virtualRowClassName,
} from "../../shared/virtual/use-list-virtualizer";
import type { PendingApproval } from "../types";
import { InboxRow } from "./inbox-row";

const estimatedRowHeightPx = 57;

export type InboxRowHandlers = {
  isSelected: (id: string) => boolean;
  onSelect: (id: string, selected: boolean) => void;
  onApprove: (id: string) => void;
  onDeny: (id: string) => void;
};

type VirtualInboxListProps = InboxRowHandlers & {
  items: PendingApproval[];
  now: number;
};

export function VirtualInboxList({
  items,
  now,
  isSelected,
  onSelect,
  onApprove,
  onDeny,
}: VirtualInboxListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { rows, totalSize, itemProps } = useListVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimatedRowHeightPx,
    getItemKey: (index) => items[index].id,
  });
  return (
    <div
      ref={scrollRef}
      data-slot="inbox-scroll"
      className="mt-4 max-h-[min(36rem,70vh)] overflow-y-auto overscroll-contain border-t"
    >
      <ul className="relative" style={{ height: totalSize }}>
        {rows.map((row) => {
          const item = items[row.index];
          return (
            <InboxRow
              key={row.key}
              {...itemProps(row.index)}
              aria-posinset={row.index + 1}
              aria-setsize={items.length}
              className={cn(virtualRowClassName, "border-b")}
              style={rowOffsetStyle(row.start)}
              item={item}
              now={now}
              selected={isSelected(item.id)}
              onSelect={(on) => onSelect(item.id, on)}
              onApprove={() => onApprove(item.id)}
              onDeny={() => onDeny(item.id)}
            />
          );
        })}
      </ul>
    </div>
  );
}

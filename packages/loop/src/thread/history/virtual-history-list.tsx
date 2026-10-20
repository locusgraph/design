"use client";

import { cn } from "@locusgraph/components";
import { useRef } from "react";
import {
  rowOffsetStyle,
  useListVirtualizer,
  virtualRowClassName,
} from "../../shared/virtual/use-list-virtualizer";
import { estimatedRowHeight, historyListRows } from "./history-rows";
import { type HistoryItem, HistoryRow } from "./row/history-row";
import type { ThreadGroup } from "./thread-groups";

type VirtualHistoryListProps = {
  groups: ThreadGroup[];
  label: string;
  activeId: string | null;
  onSelect: (id: string) => void;
  onRename?: (id: string, title: string) => void;
  onArchive?: (id: string) => void;
};

function scrollAreaViewportOf(element: HTMLElement | null): HTMLElement | null {
  return element?.closest<HTMLElement>("[data-slot=scroll-area-viewport]") ?? null;
}

export function VirtualHistoryList({
  groups,
  label,
  activeId,
  onSelect,
  onRename,
  onArchive,
}: VirtualHistoryListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const rows = historyListRows(groups);
  const {
    rows: visibleRows,
    totalSize,
    itemProps,
  } = useListVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollAreaViewportOf(listRef.current),
    estimateSize: (index) => estimatedRowHeight(rows[index], index),
    getItemKey: (index) => rows[index].key,
  });
  const threadRowProps = (thread: HistoryItem) => ({
    thread,
    active: thread.id === activeId,
    onSelect,
    onRename,
    onArchive,
  });
  return (
    <ul
      ref={listRef}
      data-slot="history-list"
      aria-label={label}
      className="relative"
      style={{ height: totalSize }}
    >
      {visibleRows.map((virtualRow) => {
        const row = rows[virtualRow.index];
        if (row.kind === "group") {
          return (
            <li
              key={virtualRow.key}
              role="presentation"
              {...itemProps(virtualRow.index)}
              className={cn(virtualRowClassName, virtualRow.index > 0 && "pt-4")}
              style={rowOffsetStyle(virtualRow.start)}
            >
              <h3
                id={`thread-group-${row.groupKey}`}
                className="locus-eyebrow px-2 pb-1"
                suppressHydrationWarning
              >
                {row.label}
              </h3>
            </li>
          );
        }
        return (
          <HistoryRow
            key={virtualRow.key}
            {...threadRowProps(row.thread)}
            {...itemProps(virtualRow.index)}
            aria-posinset={row.position}
            aria-setsize={row.groupSize}
            className={virtualRowClassName}
            style={rowOffsetStyle(virtualRow.start)}
          />
        );
      })}
    </ul>
  );
}

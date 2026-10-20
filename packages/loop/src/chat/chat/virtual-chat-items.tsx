"use client";

import { cn } from "@locusgraph/components";
import {
  cloneElement,
  isValidElement,
  type ReactNode,
  type RefObject,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  rowOffsetStyle,
  useListVirtualizer,
  virtualRowClassName,
} from "../../shared/virtual/use-list-virtualizer";
import { gapBeforeItem, isPositionable } from "./chat-item-spacing";

const estimatedTurnHeightPx = 180;

type VirtualChatItemsProps = {
  items: ReactNode[];
  viewportRef: RefObject<HTMLDivElement | null>;
  onScrollingChange: (scrolling: boolean) => void;
};

function itemKey(item: ReactNode, index: number): string | number {
  return isValidElement(item) && item.key !== null ? item.key : index;
}

function withSetPosition(item: ReactNode, index: number, count: number): ReactNode {
  if (!isPositionable(item)) {
    return item;
  }
  return cloneElement(item as React.ReactElement<Record<string, unknown>>, {
    "aria-posinset": index + 1,
    "aria-setsize": count,
  });
}

export function VirtualChatItems({ items, viewportRef, onScrollingChange }: VirtualChatItemsProps) {
  const { virtualizer, rows, totalSize, isScrolling, itemProps } = useListVirtualizer({
    count: items.length,
    getScrollElement: () => viewportRef.current,
    estimateSize: () => estimatedTurnHeightPx,
    getItemKey: (index) => itemKey(items[index], index),
    anchorTo: "end",
  });

  useLayoutEffect(() => {
    virtualizer.scrollToEnd();
  }, [virtualizer]);

  useEffect(() => {
    onScrollingChange(isScrolling);
  }, [isScrolling, onScrollingChange]);

  return (
    <div data-slot="chat-virtual-list" className="relative w-full" style={{ height: totalSize }}>
      {rows.map((row) => (
        <div
          key={row.key}
          data-slot="chat-item"
          {...itemProps(row.index)}
          className={cn(virtualRowClassName, "flex flex-col")}
          style={{ ...rowOffsetStyle(row.start), paddingTop: gapBeforeItem(items, row.index) }}
        >
          {withSetPosition(items[row.index], row.index, items.length)}
        </div>
      ))}
    </div>
  );
}

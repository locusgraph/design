import { defaultRangeExtractor, type Range, useVirtualizer } from "@tanstack/react-virtual";
import { type CSSProperties, type FocusEvent, type Key, useCallback, useState } from "react";

export const virtualizeAboveCount = 50;

const serverViewportRect = { width: 0, height: 800 };

export function shouldVirtualize(count: number, virtualize: boolean | undefined): boolean {
  return virtualize !== false && count > virtualizeAboveCount;
}

export type ListVirtualizerOptions = {
  count: number;
  getScrollElement: () => HTMLElement | null;
  estimateSize: (index: number) => number;
  getItemKey: (index: number) => Key;
  anchorTo?: "start" | "end";
};

function offsetOfLastScreen(count: number, estimateSize: (index: number) => number) {
  let total = 0;
  for (let index = 0; index < count; index += 1) total += estimateSize(index);
  return Math.max(0, total - serverViewportRect.height);
}

function keepFocusedRendered(indexes: number[], focusedIndex: number | null, count: number) {
  if (focusedIndex === null || focusedIndex >= count || indexes.includes(focusedIndex)) {
    return indexes;
  }
  return [...indexes, focusedIndex].sort((a, b) => a - b);
}

function focusLeft(event: FocusEvent<HTMLElement>) {
  return !event.currentTarget.contains(event.relatedTarget as Node | null);
}

export function useListVirtualizer({
  count,
  getScrollElement,
  estimateSize,
  getItemKey,
  anchorTo = "start",
}: ListVirtualizerOptions) {
  "use no memo";
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const rangeExtractor = useCallback(
    (range: Range) => keepFocusedRendered(defaultRangeExtractor(range), focusedIndex, range.count),
    [focusedIndex]
  );
  const virtualizer = useVirtualizer<HTMLElement, HTMLElement>({
    count,
    getScrollElement,
    estimateSize,
    getItemKey,
    rangeExtractor,
    anchorTo,
    initialRect: serverViewportRect,
    initialOffset: () => (anchorTo === "end" ? offsetOfLastScreen(count, estimateSize) : 0),
    overscan: 6,
  });

  const itemProps = (index: number) => ({
    "data-index": index,
    ref: virtualizer.measureElement,
    onFocus: () => setFocusedIndex(index),
    onBlur: (event: FocusEvent<HTMLElement>) => {
      if (focusLeft(event)) setFocusedIndex(null);
    },
  });

  return {
    virtualizer,
    rows: virtualizer.getVirtualItems(),
    totalSize: virtualizer.getTotalSize(),
    isScrolling: virtualizer.isScrolling,
    itemProps,
  };
}

export const virtualRowClassName = "absolute top-0 left-0 w-full";

export function rowOffsetStyle(start: number): CSSProperties {
  return { transform: `translateY(${start}px)` };
}

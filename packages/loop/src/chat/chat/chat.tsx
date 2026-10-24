"use client";

import { Button, cn } from "@locusgraph/components";
import { ArrowDown as ArrowDownIcon } from "@phosphor-icons/react/ssr";
import * as React from "react";
import { shouldVirtualize } from "../../shared/virtual/use-list-virtualizer";
import { useStickToBottom } from "./use-stick-to-bottom";
import { VirtualChatItems } from "./virtual-chat-items";

export type ChatProps = React.ComponentProps<"div"> & {
  empty?: React.ReactNode;
  label?: string;
  jumpLabel?: string;
  virtualize?: boolean;
};

export function Chat({
  children,
  empty,
  label = "Chat",
  jumpLabel = "Jump to latest",
  virtualize = true,
  className,
  ...props
}: ChatProps) {
  const { viewportRef, contentRef, isAtBottom, handleScroll, scrollToLatest } = useStickToBottom();
  const [scrolling, setScrolling] = React.useState(false);
  const items = React.Children.toArray(children);
  const isEmpty = items.length === 0;
  const isVirtual = shouldVirtualize(items.length, virtualize);
  return (
    <div
      data-slot="chat"
      data-empty={isEmpty || undefined}
      data-virtual={isVirtual || undefined}
      className={cn("relative flex min-h-0 flex-1 flex-col overflow-hidden", className)}
      {...props}
    >
      <div
        ref={viewportRef}
        data-slot="chat-viewport"
        role="log"
        aria-label={label}
        aria-busy={(isVirtual && scrolling) || undefined}
        tabIndex={0}
        onScroll={handleScroll}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain locus-focus-ring-inset"
      >
        <div
          ref={contentRef}
          data-slot="chat-content"
          className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-8 px-4 py-6 [&>[data-role=user]+[data-role=assistant]]:-mt-4"
        >
          {isEmpty ? (
            <div
              data-slot="chat-empty"
              className="flex flex-1 flex-col items-center justify-center text-center"
            >
              {empty}
            </div>
          ) : isVirtual ? (
            <VirtualChatItems
              items={items}
              viewportRef={viewportRef}
              onScrollingChange={setScrolling}
            />
          ) : (
            children
          )}
        </div>
      </div>
      {!isEmpty && !isAtBottom && (
        <Button
          type="button"
          variant="outline"
          size="xs"
          data-slot="chat-jump"
          onClick={scrollToLatest}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-card px-3 text-muted-foreground shadow-none hover:text-foreground motion-safe:animate-in motion-safe:fade-in-0 dark:bg-card"
        >
          <ArrowDownIcon weight="bold" aria-hidden="true" className="size-3.5" />
          {jumpLabel}
        </Button>
      )}
    </div>
  );
}

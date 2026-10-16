"use client";

import { Button, cn } from "@locusgraph/components";
import { ArrowDownIcon } from "lucide-react";
import * as React from "react";
import { useStickToBottom } from "./use-stick-to-bottom";

export type ConversationProps = React.ComponentProps<"div"> & {
  empty?: React.ReactNode;
  label?: string;
  jumpLabel?: string;
};

export function Conversation({
  children,
  empty,
  label = "Conversation",
  jumpLabel = "Jump to latest",
  className,
  ...props
}: ConversationProps) {
  const { viewportRef, contentRef, isAtBottom, handleScroll, scrollToLatest } = useStickToBottom();
  const isEmpty = React.Children.toArray(children).length === 0;
  return (
    <div
      data-slot="conversation"
      data-empty={isEmpty || undefined}
      className={cn("relative flex min-h-0 flex-1 flex-col overflow-hidden", className)}
      {...props}
    >
      <div
        ref={viewportRef}
        data-slot="conversation-viewport"
        role="log"
        aria-label={label}
        tabIndex={0}
        onScroll={handleScroll}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset"
      >
        <div
          ref={contentRef}
          data-slot="conversation-content"
          className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-8 px-4 py-6 [&>[data-role=user]+[data-role=assistant]]:-mt-4"
        >
          {isEmpty ? (
            <div
              data-slot="conversation-empty"
              className="flex flex-1 flex-col items-center justify-center text-center"
            >
              {empty}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
      {!isEmpty && !isAtBottom && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          data-slot="conversation-jump"
          onClick={scrollToLatest}
          className="absolute bottom-3 left-1/2 h-7 -translate-x-1/2 bg-card px-3 text-xs text-muted-foreground shadow-none hover:text-foreground motion-safe:animate-in motion-safe:fade-in-0 dark:bg-card"
        >
          <ArrowDownIcon aria-hidden="true" className="size-3.5" />
          {jumpLabel}
        </Button>
      )}
    </div>
  );
}

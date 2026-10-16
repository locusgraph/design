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
          className="flex min-h-full flex-col gap-6 p-4"
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
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card motion-safe:animate-in motion-safe:fade-in-0"
        >
          <ArrowDownIcon aria-hidden="true" />
          {jumpLabel}
        </Button>
      )}
    </div>
  );
}

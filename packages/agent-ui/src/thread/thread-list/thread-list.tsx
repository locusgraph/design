"use client";

import { Button, cn, RuleGridLabel, ScrollArea } from "@locusgraph/components";
import { PlusIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { ThreadListItem, type ThreadSummary } from "./thread-list-item";

type ThreadListProps = Omit<ComponentProps<"nav">, "onSelect"> & {
  threads: ThreadSummary[];
  activeId?: string | null;
  onSelect: (id: string) => void;
  onNew?: () => void;
  onRename?: (id: string, title: string) => void;
  onArchive?: (id: string) => void;
  label?: string;
  emptyText?: string;
};

export function ThreadList({
  threads,
  activeId = null,
  onSelect,
  onNew,
  onRename,
  onArchive,
  label = "Conversations",
  emptyText = "No conversations yet.",
  className,
  ...props
}: ThreadListProps) {
  return (
    <nav
      data-slot="thread-list"
      aria-label={label}
      className={cn("flex min-h-0 flex-col gap-3", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <RuleGridLabel>{label}</RuleGridLabel>
        {onNew && (
          <Button type="button" variant="outline" size="xs" onClick={onNew}>
            <PlusIcon />
            New chat
          </Button>
        )}
      </div>
      {threads.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <ScrollArea className="min-h-0 flex-1">
          <ul className="flex flex-col gap-px p-px">
            {threads.map((thread) => (
              <ThreadListItem
                key={thread.id}
                thread={thread}
                active={thread.id === activeId}
                onSelect={onSelect}
                onRename={onRename}
                onArchive={onArchive}
              />
            ))}
          </ul>
        </ScrollArea>
      )}
    </nav>
  );
}

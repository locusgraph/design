"use client";

import { Button, cn, ScrollArea } from "@locusgraph/components";
import { PlusIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { groupThreadsByDay } from "./thread-groups";
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
  now?: Date | string;
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
  now = new Date(),
  className,
  ...props
}: ThreadListProps) {
  const groups = groupThreadsByDay(threads, now);
  return (
    <nav
      data-slot="thread-list"
      aria-label={label}
      className={cn("flex min-h-0 flex-col gap-2", className)}
      {...props}
    >
      <div className="flex h-7 items-center justify-between gap-2 px-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {onNew && (
          <Button type="button" variant="outline" size="xs" onClick={onNew}>
            <PlusIcon />
            New chat
          </Button>
        )}
      </div>
      {threads.length === 0 ? (
        <p className="px-2 py-6 text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col gap-4 pr-2.5 pb-2">
            {groups.map((group) => (
              <section key={group.key} aria-labelledby={`thread-group-${group.key}`}>
                <h3
                  id={`thread-group-${group.key}`}
                  className="eyebrow px-2 pb-1"
                  suppressHydrationWarning
                >
                  {group.label}
                </h3>
                <ul className="flex flex-col">
                  {group.threads.map((thread) => (
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
              </section>
            ))}
          </div>
        </ScrollArea>
      )}
    </nav>
  );
}

"use client";

import { Add as PlusIcon } from "@carbon/icons-react";
import { Button, cn, ScrollArea } from "@locusgraph/components";
import type { ComponentProps } from "react";
import { shouldVirtualize } from "../../shared/virtual/use-list-virtualizer";
import { type HistoryItem, HistoryRow } from "./row/history-row";
import { groupThreadsByDay } from "./thread-groups";
import { VirtualHistoryList } from "./virtual-history-list";

type HistoryProps = Omit<ComponentProps<"nav">, "onSelect"> & {
  threads: HistoryItem[];
  activeId?: string | null;
  onSelect: (id: string) => void;
  onNew?: () => void;
  onRename?: (id: string, title: string) => void;
  onArchive?: (id: string) => void;
  label?: string;
  emptyText?: string;
  now?: Date | string;
  virtualize?: boolean;
};

export function History({
  threads,
  activeId = null,
  onSelect,
  onNew,
  onRename,
  onArchive,
  label = "Conversations",
  emptyText = "No conversations yet.",
  now,
  virtualize = true,
  className,
  ...props
}: HistoryProps) {
  const groups = groupThreadsByDay(threads, now ?? new Date());
  return (
    <nav
      data-slot="history"
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
          {shouldVirtualize(threads.length, virtualize) ? (
            <div className="pr-2.5 pb-2">
              <VirtualHistoryList
                groups={groups}
                label={label}
                activeId={activeId}
                onSelect={onSelect}
                onRename={onRename}
                onArchive={onArchive}
              />
            </div>
          ) : (
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
                      <HistoryRow
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
          )}
        </ScrollArea>
      )}
    </nav>
  );
}

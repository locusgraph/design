import { cn } from "@locusgraph/components";
import { useState } from "react";
import { formatTimeOfDay } from "./thread-groups";
import { ThreadItemMenu } from "./thread-item-menu";
import { ThreadTitleEditor } from "./thread-title-editor";

export type ThreadSummary = { id: string; title: string; updatedAt: string };

type ThreadListItemProps = {
  thread: ThreadSummary;
  active: boolean;
  onSelect: (id: string) => void;
  onRename?: (id: string, title: string) => void;
  onArchive?: (id: string) => void;
};

const timeHiddenByMenuClass =
  "max-sm:hidden sm:group-focus-within:invisible sm:group-hover:invisible sm:group-has-[[data-state=open]]:invisible";

export function ThreadListItem({
  thread,
  active,
  onSelect,
  onRename,
  onArchive,
}: ThreadListItemProps) {
  const [editing, setEditing] = useState(false);
  const hasMenu = onRename !== undefined || onArchive !== undefined;
  return (
    <li
      data-slot="thread-list-item"
      data-active={active || undefined}
      className={cn(
        "group relative flex items-center motion-safe:transition-colors",
        active ? "bg-accent text-accent-foreground" : "text-foreground/85 hover:bg-accent/50"
      )}
    >
      {editing && onRename ? (
        <div className="flex-1 px-1 py-0.5">
          <ThreadTitleEditor
            title={thread.title}
            onCommit={(title) => {
              onRename(thread.id, title);
              setEditing(false);
            }}
            onCancel={() => setEditing(false)}
          />
        </div>
      ) : (
        <button
          type="button"
          aria-current={active ? "page" : undefined}
          onClick={() => onSelect(thread.id)}
          onDoubleClick={onRename ? () => setEditing(true) : undefined}
          className={cn(
            "flex min-w-0 flex-1 items-center gap-3 py-1.5 pl-2 text-left text-sm outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
            hasMenu ? "pr-8 sm:pr-2" : "pr-2",
            active && "font-medium"
          )}
        >
          <span className="min-w-0 flex-1 truncate">{thread.title}</span>
          <time
            dateTime={thread.updatedAt}
            suppressHydrationWarning
            className={cn(
              "shrink-0 font-mono text-[11px] font-normal text-muted-foreground tabular-nums",
              hasMenu && timeHiddenByMenuClass
            )}
          >
            {formatTimeOfDay(thread.updatedAt)}
          </time>
        </button>
      )}
      {hasMenu && !editing && (
        <div className="absolute top-1/2 right-1 -translate-y-1/2">
          <ThreadItemMenu
            title={thread.title}
            onRename={onRename ? () => setEditing(true) : undefined}
            onArchive={onArchive ? () => onArchive(thread.id) : undefined}
          />
        </div>
      )}
    </li>
  );
}

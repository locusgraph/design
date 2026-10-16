import { cn } from "@locusgraph/components";
import { formatDate } from "@locusgraph/utils";
import { useState } from "react";
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
        "group flex items-center gap-1 pr-2 ring-1 ring-border motion-safe:transition-colors",
        active ? "bg-accent text-accent-foreground" : "bg-card hover:bg-accent/60"
      )}
    >
      {editing && onRename ? (
        <div className="flex-1 py-2 pl-3">
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
          className="flex min-w-0 flex-1 flex-col items-start gap-0.5 py-2.5 pl-3 text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
        >
          <span className="w-full truncate text-sm">{thread.title}</span>
          <time
            dateTime={thread.updatedAt}
            className="font-mono text-[11.5px] text-muted-foreground"
          >
            {formatDate(thread.updatedAt)}
          </time>
        </button>
      )}
      {hasMenu && !editing && (
        <ThreadItemMenu
          title={thread.title}
          onRename={onRename ? () => setEditing(true) : undefined}
          onArchive={onArchive ? () => onArchive(thread.id) : undefined}
        />
      )}
    </li>
  );
}

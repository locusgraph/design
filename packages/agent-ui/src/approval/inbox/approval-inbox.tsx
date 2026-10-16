import { Button, Checkbox, cn, Label } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import { InboxIcon } from "lucide-react";
import { useId, useState } from "react";
import { LiveStatus } from "../shared/panel";
import type { PendingApproval } from "../types";
import { InboxRow } from "./inbox-row";
import { bulkApprovable, selectAllState, selectedIn, toggled } from "./inbox-selection";

export type ApprovalInboxProps = {
  items: PendingApproval[];
  now?: number;
  title?: string;
  onApprove: (id: string) => void;
  onDeny: (id: string) => void;
  onApproveAll: (ids: string[]) => void;
  className?: string;
};

function InboxEmpty() {
  return (
    <div
      data-slot="approval-inbox-empty"
      className="flex flex-col items-center gap-2 px-6 py-10 text-center"
    >
      <InboxIcon aria-hidden className="size-6 text-muted-foreground" />
      <p className="text-sm font-medium">Nothing waiting for you</p>
      <p className="max-w-xs text-sm text-muted-foreground">
        When an agent needs approval to write, pay, send or delete, it shows up here.
      </p>
    </div>
  );
}

export function ApprovalInbox({
  items,
  now = Date.now(),
  title = "Waiting for approval",
  onApprove,
  onDeny,
  onApproveAll,
  className,
}: ApprovalInboxProps) {
  const selectAllId = useId();
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const selectable = bulkApprovable(items);
  const selectedIds = selectedIn(items, selected);
  const allState = selectAllState(selectable.length, selectedIds.length);
  const hasDestructive = selectable.length < items.length;
  return (
    <section
      data-slot="approval-inbox"
      aria-label={title}
      className={cn(
        "flex min-w-0 flex-col bg-card text-card-foreground ring-1 ring-border",
        className
      )}
    >
      <header className="flex flex-wrap items-center gap-3 border-b border-line px-3 py-2.5">
        {selectable.length > 0 && (
          <span className="flex items-center gap-2">
            <Checkbox
              id={selectAllId}
              checked={allState}
              onCheckedChange={(checked) =>
                setSelected(
                  checked === true ? new Set(selectable.map((item) => item.id)) : new Set()
                )
              }
            />
            <Label htmlFor={selectAllId} className="sr-only">
              Select all that can be approved together
            </Label>
          </span>
        )}
        <span className="text-sm font-medium">{title}</span>
        <span className="font-mono text-[11.5px] text-muted-foreground tabular-nums">
          {items.length}
        </span>
        {items.length > 0 && (
          <Button
            type="button"
            size="sm"
            className="ml-auto"
            disabled={selectedIds.length === 0}
            onClick={() => {
              onApproveAll(selectedIds);
              setSelected(new Set());
            }}
          >
            {selectedIds.length > 0 ? `Approve ${selectedIds.length} selected` : "Approve selected"}
          </Button>
        )}
      </header>
      {items.length === 0 ? (
        <InboxEmpty />
      ) : (
        <ul className="flex flex-col divide-y divide-line">
          {items.map((item) => (
            <InboxRow
              key={item.id}
              item={item}
              now={now}
              selected={selected.has(item.id)}
              onSelect={(on) => setSelected((current) => toggled(current, item.id, on))}
              onApprove={() => onApprove(item.id)}
              onDeny={() => onDeny(item.id)}
            />
          ))}
        </ul>
      )}
      {hasDestructive && (
        <p className="border-t border-line px-3 py-2 text-xs text-muted-foreground">
          Destructive requests are approved one at a time.
        </p>
      )}
      <LiveStatus
        message={
          items.length === 0
            ? "No approvals waiting"
            : `${pluralize(items.length, "approval")} waiting, ${selectedIds.length} selected`
        }
      />
    </section>
  );
}

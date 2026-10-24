import { Button, Checkbox, cn, Label } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import { Tray as InboxIcon } from "@phosphor-icons/react/ssr";
import { useId, useState } from "react";
import { lineIconClass } from "../../shared/line";
import { LiveStatus } from "../../shared/live-status";
import { PanelEmpty } from "../../shared/panel-empty";
import type { PendingApproval } from "../types";
import { InboxRow } from "./inbox-row";
import { bulkApprovable, selectAllState, selectedIn, toggled } from "./inbox-selection";

export type InboxProps = {
  items: PendingApproval[];
  now?: number;
  title?: string;
  openId?: string | null;
  onOpen: (id: string) => void;
  onApproveAll: (ids: string[]) => void;
  className?: string;
};

const oneAtATimeNote = "Destructive requests are approved one at a time.";

export function Inbox({
  items,
  now = Date.now(),
  title = "Waiting for approval",
  openId = null,
  onOpen,
  onApproveAll,
  className,
}: InboxProps) {
  const selectAllId = useId();
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const selectable = bulkApprovable(items);
  const selectedIds = selectedIn(items, selected);
  const allState = selectAllState(selectable.length, selectedIds.length);
  const hasDestructive = selectable.length < items.length;
  const empty = items.length === 0;
  return (
    <section
      data-slot="inbox"
      aria-label={title}
      className={cn("flex min-w-0 flex-col gap-2", className)}
    >
      <header className="flex items-center gap-2 px-2 text-sm">
        <span aria-hidden className={lineIconClass}>
          <InboxIcon weight="bold" aria-hidden />
        </span>
        <h3 className="min-w-0 truncate font-sans font-medium text-foreground">{title}</h3>
        <span
          data-slot="inbox-count"
          className={cn("ml-auto shrink-0 text-xs", empty ? "text-good" : "font-medium text-warn")}
        >
          {empty ? "All clear" : `${items.length} waiting`}
        </span>
      </header>
      {empty ? (
        <PanelEmpty
          data-slot="inbox-empty"
          icon={<InboxIcon weight="bold" aria-hidden />}
          title="Nothing waiting for you"
          description="When an agent needs approval to write, pay, send or delete, it shows up here."
        />
      ) : (
        <>
          <ul className="flex flex-col">
            {items.map((item) => (
              <InboxRow
                key={item.id}
                item={item}
                now={now}
                selected={selected.has(item.id)}
                onSelect={(on) => setSelected((current) => toggled(current, item.id, on))}
                open={item.id === openId}
                onOpen={() => onOpen(item.id)}
              />
            ))}
          </ul>
          {selectable.length === 0 ? (
            <p className="px-2 pt-2 text-xs text-faint">{oneAtATimeNote}</p>
          ) : (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-2 pt-2">
              <span className="flex min-w-0 items-start gap-3">
                <Checkbox
                  id={selectAllId}
                  className="mt-0.5"
                  checked={allState}
                  aria-describedby={hasDestructive ? `${selectAllId}-note` : undefined}
                  onCheckedChange={(checked) =>
                    setSelected(
                      checked === true ? new Set(selectable.map((item) => item.id)) : new Set()
                    )
                  }
                />
                <span className="flex min-w-0 flex-col items-start">
                  <Label htmlFor={selectAllId} className="text-sm font-normal tabular-nums">
                    <span className="sr-only">Select all that can be approved together. </span>
                    {selectedIds.length > 0 ? `${selectedIds.length} selected` : "Select all"}
                  </Label>
                  {hasDestructive && (
                    <span id={`${selectAllId}-note`} className="text-xs text-faint">
                      {oneAtATimeNote}
                    </span>
                  )}
                </span>
              </span>
              <Button
                type="button"
                size="sm"
                disabled={selectedIds.length === 0}
                onClick={() => {
                  onApproveAll(selectedIds);
                  setSelected(new Set());
                }}
              >
                {selectedIds.length > 0
                  ? `Approve ${selectedIds.length} selected`
                  : "Approve selected"}
              </Button>
            </div>
          )}
        </>
      )}
      <LiveStatus
        message={
          empty
            ? "No approvals waiting"
            : `${pluralize(items.length, "approval")} waiting, ${selectedIds.length} selected`
        }
      />
    </section>
  );
}

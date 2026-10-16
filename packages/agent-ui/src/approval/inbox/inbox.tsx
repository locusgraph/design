import { Button, Checkbox, Label } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import { InboxIcon } from "lucide-react";
import { useId, useState } from "react";
import {
  ApprovalPanel,
  LiveStatus,
  PanelFooter,
  PanelHeader,
  PanelTitle,
} from "../../shared/panel";
import { PanelEmpty } from "../../shared/panel-empty";
import type { PendingApproval } from "../types";
import { InboxRow } from "./inbox-row";
import { bulkApprovable, selectAllState, selectedIn, toggled } from "./inbox-selection";

export type InboxProps = {
  items: PendingApproval[];
  now?: number;
  title?: string;
  onApprove: (id: string) => void;
  onDeny: (id: string) => void;
  onApproveAll: (ids: string[]) => void;
  className?: string;
};

export function Inbox({
  items,
  now = Date.now(),
  title = "Waiting for approval",
  onApprove,
  onDeny,
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
    <ApprovalPanel data-slot="inbox" aria-label={title} className={className}>
      <PanelHeader
        icon={<InboxIcon aria-hidden />}
        eyebrow="Approvals"
        status={empty ? "All clear" : `${items.length} waiting`}
        tone={empty ? "done" : "waiting"}
      />
      <PanelTitle>{title}</PanelTitle>
      {empty ? (
        <PanelEmpty
          data-slot="inbox-empty"
          icon={<InboxIcon aria-hidden />}
          title="Nothing waiting for you"
          description="When an agent needs approval to write, pay, send or delete, it shows up here."
        />
      ) : (
        <>
          <ul className="mt-4 flex flex-col divide-y border-t">
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
          <PanelFooter className="justify-between gap-3">
            <span className="flex min-w-0 items-center gap-3">
              {selectable.length > 0 && (
                <Checkbox
                  id={selectAllId}
                  checked={allState}
                  onCheckedChange={(checked) =>
                    setSelected(
                      checked === true ? new Set(selectable.map((item) => item.id)) : new Set()
                    )
                  }
                />
              )}
              <Label
                htmlFor={selectAllId}
                className="flex min-w-0 flex-col items-start gap-0 font-normal"
              >
                <span className="text-sm tabular-nums">
                  <span className="sr-only">Select all that can be approved together. </span>
                  {selectedIds.length > 0 ? `${selectedIds.length} selected` : "Select all"}
                </span>
                {hasDestructive && (
                  <span className="text-xs text-muted-foreground">
                    Destructive requests are approved one at a time.
                  </span>
                )}
              </Label>
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
          </PanelFooter>
        </>
      )}
      <LiveStatus
        message={
          empty
            ? "No approvals waiting"
            : `${pluralize(items.length, "approval")} waiting, ${selectedIds.length} selected`
        }
      />
    </ApprovalPanel>
  );
}

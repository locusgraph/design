import { Button, Checkbox } from "@locusgraph/components";
import { RiskBadge } from "../shared/risk-badge";
import { formatWaiting, isoOf } from "../shared/time";
import type { PendingApproval } from "../types";

type InboxRowProps = {
  item: PendingApproval;
  now: number;
  selected: boolean;
  onSelect: (selected: boolean) => void;
  onApprove: () => void;
  onDeny: () => void;
};

export function InboxRow({ item, now, selected, onSelect, onApprove, onDeny }: InboxRowProps) {
  const destructive = item.risk === "destructive";
  const waiting = formatWaiting(item.requestedAt, now);
  return (
    <li
      data-slot="approval-inbox-item"
      data-risk={item.risk}
      className="flex flex-wrap items-start gap-3 px-3 py-3 sm:flex-nowrap"
    >
      <span className="pt-0.5">
        <Checkbox
          aria-label={
            destructive ? `${item.title} must be approved on its own` : `Select ${item.title}`
          }
          checked={selected}
          disabled={destructive}
          onCheckedChange={(checked) => onSelect(checked === true)}
        />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">{item.title}</span>
          <RiskBadge risk={item.risk} />
        </span>
        {item.summary && <p className="text-sm text-muted-foreground">{item.summary}</p>}
        <p className="font-mono text-[11.5px] text-muted-foreground">
          {item.runName} ·{" "}
          <time dateTime={isoOf(item.requestedAt)}>
            {waiting === "just now" ? "waiting just now" : `waiting ${waiting}`}
          </time>
        </p>
      </div>
      <span className="flex shrink-0 gap-1.5">
        <Button
          type="button"
          size="xs"
          variant={destructive ? "destructive" : "default"}
          aria-label={`Approve ${item.title}`}
          onClick={onApprove}
        >
          Approve
        </Button>
        <Button
          type="button"
          size="xs"
          variant="outline"
          aria-label={`Deny ${item.title}`}
          onClick={onDeny}
        >
          Deny
        </Button>
      </span>
    </li>
  );
}

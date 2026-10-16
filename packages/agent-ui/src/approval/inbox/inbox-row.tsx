import { Button, Checkbox, cn } from "@locusgraph/components";
import { CheckIcon, XIcon } from "lucide-react";
import type { RiskLevel } from "../../types";
import { riskLabels } from "../shared/risk-badge";
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

const riskDot: Record<RiskLevel, string> = {
  read: "bg-muted-foreground/50",
  write: "bg-amber-500",
  destructive: "bg-destructive",
};

export function InboxRow({ item, now, selected, onSelect, onApprove, onDeny }: InboxRowProps) {
  const destructive = item.risk === "destructive";
  return (
    <li
      data-slot="approval-inbox-item"
      data-risk={item.risk}
      data-selected={selected || undefined}
      className={cn(
        "group flex items-center gap-3 px-5 py-2.5 motion-safe:transition-colors",
        selected ? "bg-accent" : "hover:bg-accent/50"
      )}
    >
      <Checkbox
        aria-label={
          destructive ? `${item.title} must be approved on its own` : `Select ${item.title}`
        }
        checked={selected}
        disabled={destructive}
        onCheckedChange={(checked) => onSelect(checked === true)}
      />
      <span
        aria-hidden
        title={riskLabels[item.risk]}
        className={cn("size-2 shrink-0 rounded-full", riskDot[item.risk])}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="flex min-w-0 items-baseline gap-2 text-sm">
          <span className="truncate font-medium">{item.title}</span>
          <span className="sr-only">, {riskLabels[item.risk]}</span>
          <span className="hidden shrink-0 truncate text-xs text-muted-foreground sm:inline">
            {item.runName}
          </span>
        </p>
        {item.summary && <p className="truncate text-xs text-muted-foreground">{item.summary}</p>}
        <p className="truncate text-xs text-muted-foreground sm:hidden">{item.runName}</p>
      </div>
      <time
        dateTime={isoOf(item.requestedAt)}
        className="w-12 shrink-0 text-right font-mono text-[11px] text-muted-foreground tabular-nums"
      >
        {formatWaiting(item.requestedAt, now)}
      </time>
      <span className="flex shrink-0 gap-1">
        <Button
          type="button"
          size="icon-xs"
          variant={destructive ? "destructive" : "outline"}
          aria-label={`Approve ${item.title}`}
          title="Approve"
          onClick={onApprove}
        >
          <CheckIcon aria-hidden />
        </Button>
        <Button
          type="button"
          size="icon-xs"
          variant="ghost"
          aria-label={`Deny ${item.title}`}
          title="Deny"
          className="text-muted-foreground hover:text-foreground"
          onClick={onDeny}
        >
          <XIcon aria-hidden />
        </Button>
      </span>
    </li>
  );
}

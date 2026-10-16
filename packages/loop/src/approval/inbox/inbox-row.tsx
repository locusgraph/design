import { Checkmark as CheckIcon, Locked as LockIcon, Close as XIcon } from "@carbon/icons-react";
import { Button, Checkbox, cn } from "@locusgraph/components";
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
  write: "bg-warn",
  destructive: "bg-destructive",
};

export function InboxRow({ item, now, selected, onSelect, onApprove, onDeny }: InboxRowProps) {
  const destructive = item.risk === "destructive";
  return (
    <li
      data-slot="inbox-item"
      data-risk={item.risk}
      data-selected={selected || undefined}
      className={cn(
        "group flex items-center gap-3 px-5 py-2.5 motion-safe:transition-colors",
        selected ? "bg-accent" : "hover:bg-accent/50"
      )}
    >
      {destructive ? (
        <span className="flex size-4 shrink-0 items-center justify-center text-muted-foreground">
          <LockIcon aria-hidden className="size-3.5" />
          <span className="sr-only">{item.title} must be approved on its own</span>
        </span>
      ) : (
        <Checkbox
          aria-label={`Select ${item.title}`}
          checked={selected}
          onCheckedChange={(checked) => onSelect(checked === true)}
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="flex min-w-0 items-baseline gap-2 text-sm">
          <span className="truncate font-medium">{item.title}</span>
          <span className="hidden shrink-0 truncate text-xs text-muted-foreground sm:inline">
            {item.runName}
          </span>
        </p>
        <p className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", riskDot[item.risk])} />
          <span className="shrink-0">{riskLabels[item.risk]}</span>
          {item.summary && (
            <>
              <span aria-hidden>·</span>
              <span className="truncate">{item.summary}</span>
            </>
          )}
        </p>
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
          variant="outline"
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

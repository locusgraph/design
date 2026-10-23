import { Button, Checkbox, cn } from "@locusgraph/components";
import { Check as CheckIcon, Lock as LockIcon, X as XIcon } from "@phosphor-icons/react/ssr";
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

const riskTone: Record<RiskLevel, string> = {
  read: "text-faint",
  write: "font-medium text-warn",
  destructive: "font-medium text-destructive",
};

const rowActionClass =
  "text-faint hover:bg-transparent sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100";

export function InboxRow({ item, now, selected, onSelect, onApprove, onDeny }: InboxRowProps) {
  const destructive = item.risk === "destructive";
  return (
    <li
      data-slot="inbox-item"
      data-risk={item.risk}
      data-selected={selected || undefined}
      className={cn(
        "group flex items-center gap-3 px-2 py-2 motion-safe:transition-colors",
        selected ? "bg-muted" : "hover:bg-muted/50"
      )}
    >
      {destructive ? (
        <span className="flex size-4 shrink-0 items-center justify-center text-faint">
          <LockIcon weight="bold" aria-hidden className="size-3.5" />
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
          <span className="truncate font-medium text-foreground">{item.title}</span>
          <span className="hidden shrink-0 truncate text-xs text-faint sm:inline">
            {item.runName}
          </span>
        </p>
        <p className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <span className={cn("shrink-0", riskTone[item.risk])}>{riskLabels[item.risk]}</span>
          {item.summary && (
            <>
              <span aria-hidden className="text-faint">
                ·
              </span>
              <span className="truncate">{item.summary}</span>
            </>
          )}
        </p>
        <p className="truncate text-xs text-faint sm:hidden">{item.runName}</p>
      </div>
      <time
        dateTime={isoOf(item.requestedAt)}
        className="w-12 shrink-0 text-right text-xs text-faint tabular-nums"
      >
        {formatWaiting(item.requestedAt, now)}
      </time>
      <span className="flex shrink-0 gap-1">
        <Button
          type="button"
          size="icon-xs"
          variant="ghost"
          aria-label={`Approve ${item.title}`}
          title="Approve"
          className={cn(rowActionClass, "hover:text-good")}
          onClick={onApprove}
        >
          <CheckIcon weight="bold" aria-hidden />
        </Button>
        <Button
          type="button"
          size="icon-xs"
          variant="ghost"
          aria-label={`Deny ${item.title}`}
          title="Deny"
          className={cn(rowActionClass, "hover:text-destructive")}
          onClick={onDeny}
        >
          <XIcon weight="bold" aria-hidden />
        </Button>
      </span>
    </li>
  );
}

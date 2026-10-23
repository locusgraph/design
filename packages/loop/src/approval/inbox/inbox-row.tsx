import { Checkbox, cn } from "@locusgraph/components";
import { Lock as LockIcon } from "@phosphor-icons/react/ssr";
import { isoOf } from "../../shared/decision-summary";
import type { RiskLevel } from "../../types";
import { riskLabels } from "../shared/risk-badge";
import { formatWaiting } from "../shared/time";
import type { PendingApproval } from "../types";

type InboxRowProps = {
  item: PendingApproval;
  now: number;
  selected: boolean;
  open: boolean;
  onSelect: (selected: boolean) => void;
  onOpen: () => void;
};

const riskTone: Record<RiskLevel, string> = {
  read: "text-faint",
  write: "font-medium text-warn",
  destructive: "font-medium text-destructive",
};

export function InboxRow({ item, now, selected, open, onSelect, onOpen }: InboxRowProps) {
  const destructive = item.risk === "destructive";
  return (
    <li
      data-slot="inbox-item"
      data-risk={item.risk}
      data-selected={selected || undefined}
      data-open={open || undefined}
      className={cn(
        "group relative flex items-center gap-3 px-2 py-2 has-[[data-slot=inbox-open]:focus-visible]:ring-2 has-[[data-slot=inbox-open]:focus-visible]:ring-ring/70 motion-safe:transition-colors",
        selected || open ? "bg-muted" : "hover:bg-muted/50"
      )}
    >
      {destructive ? (
        <span className="relative z-10 flex size-4 shrink-0 items-center justify-center text-faint">
          <LockIcon weight="bold" aria-hidden className="size-3.5" />
          <span className="sr-only">{item.title} must be approved on its own</span>
        </span>
      ) : (
        <Checkbox
          aria-label={`Select ${item.title}`}
          checked={selected}
          className="relative z-10"
          onCheckedChange={(checked) => onSelect(checked === true)}
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="flex min-w-0 items-baseline gap-2 text-sm">
          <button
            type="button"
            data-slot="inbox-open"
            aria-current={open || undefined}
            onClick={onOpen}
            className="cursor-pointer truncate text-left font-medium text-foreground outline-none after:absolute after:inset-0"
          >
            {item.title}
          </button>
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
    </li>
  );
}

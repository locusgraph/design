import { cn } from "@locusgraph/components";
import type { ComponentProps, ReactNode } from "react";
import type { StatusTone } from "./status-dot";

export function ApprovalPanel({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "flex min-w-0 flex-col bg-card text-card-foreground ring-1 ring-border",
        className
      )}
      {...props}
    />
  );
}

export type PanelTone = StatusTone;

const panelStatusTones: Record<PanelTone, string> = {
  running: "text-muted-foreground motion-safe:shimmer",
  waiting: "font-medium text-warn",
  done: "font-medium text-good",
  danger: "font-medium text-destructive",
  idle: "text-faint",
};

type PanelHeaderProps = {
  icon: ReactNode;
  eyebrow: string;
  status?: string;
  tone?: PanelTone;
  aside?: ReactNode;
};

export function PanelHeader({ icon, eyebrow, status, tone = "idle", aside }: PanelHeaderProps) {
  return (
    <header
      data-slot="panel-header"
      className="flex items-center gap-2 px-5 pt-4 text-sm text-muted-foreground"
    >
      <span
        aria-hidden
        className="flex size-4 shrink-0 items-center justify-center text-faint [&_svg]:size-3.5"
      >
        {icon}
      </span>
      <span className="min-w-0 truncate">{eyebrow}</span>
      <span className="ml-auto flex shrink-0 items-baseline gap-3 text-xs">
        {aside && <span className="text-faint tabular-nums">{aside}</span>}
        {status && (
          <span data-slot="panel-status" data-tone={tone} className={panelStatusTones[tone]}>
            {status}
          </span>
        )}
      </span>
    </header>
  );
}

export function PanelTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "px-5 pt-2 font-sans text-base leading-snug font-semibold tracking-tight text-balance",
        className
      )}
      {...props}
    />
  );
}

export function PanelBody({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-4 px-5 pt-4 pb-5", className)} {...props} />;
}

export function PanelFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-end gap-2 border-t bg-muted/70 px-5 py-3",
        className
      )}
      {...props}
    />
  );
}

export function LiveStatus({ message }: { message: string }) {
  return (
    <p role="status" aria-live="polite" className="sr-only">
      {message}
    </p>
  );
}

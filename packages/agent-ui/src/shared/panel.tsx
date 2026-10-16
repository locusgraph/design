import { cn } from "@locusgraph/components";
import type { ComponentProps, ReactNode } from "react";

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

export type PanelTone = "waiting" | "done" | "danger" | "idle";

const toneDot: Record<PanelTone, string> = {
  waiting: "bg-amber-500 motion-safe:animate-pulse",
  done: "bg-emerald-500",
  danger: "bg-destructive",
  idle: "bg-muted-foreground/50",
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
      className="flex items-center gap-2 px-5 pt-4 font-mono text-[11px] tracking-wide text-muted-foreground uppercase [&_svg]:size-3.5 [&_svg]:shrink-0"
    >
      {icon}
      <span>{eyebrow}</span>
      <span className="ml-auto flex items-center gap-1.5">
        {aside}
        {status && (
          <>
            <span aria-hidden className={cn("size-1.5 rounded-full", toneDot[tone])} />
            <span>{status}</span>
          </>
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
        "flex flex-wrap items-center justify-end gap-2 border-t bg-muted/30 px-5 py-3",
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

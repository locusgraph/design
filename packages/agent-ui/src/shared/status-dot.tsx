import { cn } from "@locusgraph/components";

export type StatusTone = "running" | "waiting" | "done" | "danger" | "idle";

export const statusDotTones: Record<StatusTone, string> = {
  running: "bg-warn motion-safe:animate-pulse",
  waiting: "bg-warn motion-safe:animate-pulse",
  done: "bg-good",
  danger: "bg-destructive",
  idle: "bg-muted-foreground/50",
};

export function StatusDot({ tone, className }: { tone: StatusTone; className?: string }) {
  return (
    <span
      aria-hidden
      data-slot="status-dot"
      data-tone={tone}
      className={cn("size-1.5 shrink-0 rounded-full", statusDotTones[tone], className)}
    />
  );
}

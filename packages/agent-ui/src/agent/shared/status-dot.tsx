import { cn } from "@locusgraph/components";

export type StatusTone = "waiting" | "done" | "danger" | "idle";

const statusDotTones: Record<StatusTone, string> = {
  waiting: "bg-amber-500 motion-safe:animate-pulse",
  done: "bg-emerald-500",
  danger: "bg-destructive",
  idle: "bg-muted-foreground/50",
};

export function StatusDot({ tone }: { tone: StatusTone }) {
  return (
    <span
      aria-hidden
      data-slot="status-dot"
      className={cn("size-1.5 shrink-0 rounded-full", statusDotTones[tone])}
    />
  );
}

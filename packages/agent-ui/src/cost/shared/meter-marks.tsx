import { cn } from "@locusgraph/components";

export type MeterStatus = "ok" | "near" | "full";

const ringRadius = 7;
const ringCircumference = 2 * Math.PI * ringRadius;

const ringStroke = {
  ok: "stroke-primary",
  near: "stroke-amber-500",
  full: "stroke-destructive",
} as const;

const barFill = { ok: "bg-primary", near: "bg-amber-500", full: "bg-destructive" } as const;

export function MeterRing({ percent, status }: { percent: number; status: MeterStatus }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden className="size-3.5 shrink-0 -rotate-90">
      <circle
        cx="9"
        cy="9"
        r={ringRadius}
        fill="none"
        strokeWidth="2.5"
        className="stroke-muted-foreground/20"
      />
      <circle
        cx="9"
        cy="9"
        r={ringRadius}
        fill="none"
        strokeWidth="2.5"
        strokeDasharray={ringCircumference}
        strokeDashoffset={ringCircumference * (1 - percent / 100)}
        className={cn(
          "transition-[stroke-dashoffset] duration-300 motion-reduce:transition-none",
          ringStroke[status]
        )}
      />
    </svg>
  );
}

export function MeterBar({ percent, status }: { percent: number; status: MeterStatus }) {
  return (
    <span aria-hidden className="relative block h-1 w-full overflow-hidden bg-muted-foreground/15">
      <span
        className={cn(
          "absolute inset-y-0 left-0 transition-[width] duration-300 motion-reduce:transition-none",
          barFill[status]
        )}
        style={{ width: `${percent}%` }}
      />
    </span>
  );
}

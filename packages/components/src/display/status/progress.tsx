"use client";

import * as ProgressPrimitive from "radix-ui/progress";
import * as React from "react";
import { cn } from "../../cn";

type ProgressTone = "default" | "good" | "warn" | "destructive" | "auto";

const indicatorToneClass: Record<Exclude<ProgressTone, "auto">, string> = {
  default: "bg-primary",
  good: "bg-good",
  warn: "bg-warn",
  destructive: "bg-destructive",
};

function resolveTone(tone: ProgressTone, percent: number) {
  if (tone !== "auto") return tone;
  if (percent >= 100) return "destructive";
  if (percent >= 80) return "warn";
  return "default";
}

function Progress({
  className,
  value,
  max = 100,
  tone = "default",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { tone?: ProgressTone }) {
  const percent = max > 0 ? ((value ?? 0) / max) * 100 : 0;
  const resolvedTone = resolveTone(tone, percent);
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-tone={resolvedTone}
      value={value}
      max={max}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn("h-full w-full flex-1 transition-all", indicatorToneClass[resolvedTone])}
        style={{ transform: `translateX(-${100 - Math.min(percent, 100)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export type { ProgressTone };
export { Progress };

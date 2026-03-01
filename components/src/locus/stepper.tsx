/**
 * Stepper – horizontal step indicator. Dots and connecting lines sit on one
 * horizontal centerline; labels sit in a row below.
 */

import { Check } from "lucide-react";
import { Fragment } from "react";

import { cn } from "../lib/utils";

export interface StepperStep {
  id: number | string;
  label: string;
  optional?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  /** 1-based step index (1 = first) or step id */
  currentStep: number | string;
  className?: string;
}

const DOT_SIZE = "2rem"; // 32px – track row height so line aligns with dot center

export function Stepper({ steps, currentStep, className }: StepperProps) {
  const currentIndex =
    typeof currentStep === "number"
      ? Math.max(0, currentStep - 1)
      : steps.findIndex((s) => s.id === currentStep);
  const activeIndex = Math.max(0, Math.min(currentIndex, steps.length - 1));

  if (steps.length === 0) return null;

  const ariaLabel = `Step ${activeIndex + 1} of ${steps.length}`;
  const n = steps.length;
  const gridCols = Array.from({ length: n + (n - 1) }, (_, i) =>
    i % 2 === 0 ? "auto" : "1fr",
  ).join(" ");

  return (
    <nav
      aria-label={ariaLabel}
      className={cn("w-full", className)}
      style={{
        display: "grid",
        gridTemplateColumns: gridCols,
        gridTemplateRows: `${DOT_SIZE} auto`,
        alignItems: "center",
        gap: "0.25rem 0",
        rowGap: "0.375rem",
      }}
    >
      {steps.map((step, index) => {
        const isCompleted = activeIndex > index;
        const isCurrent = activeIndex === index;
        const isUpcoming = activeIndex < index;
        const dotCol = index * 2 + 1;
        const lineCol = index * 2 + 2;
        const hasLine = index < steps.length - 1;
        const lineCompleted = activeIndex > index;

        return (
          <Fragment key={String(step.id)}>
            {/* Track: dot */}
            <div
              style={{ gridColumn: dotCol, gridRow: 1 }}
              className="flex items-center justify-center"
              aria-current={isCurrent ? "step" : undefined}
            >
              <span
                className={cn(
                  "flex items-center justify-center rounded-full border-2 shrink-0 transition-colors w-8 h-8",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  isCurrent && "border-primary bg-primary text-primary-foreground",
                  isUpcoming && "border-border bg-card text-muted-foreground",
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" aria-hidden /> : null}
              </span>
            </div>

            {/* Track: line after dot */}
            {hasLine && (
              <div
                style={{ gridColumn: lineCol, gridRow: 1 }}
                className="flex items-center min-w-6"
                aria-hidden
              >
                <span
                  className={cn(
                    "h-0.5 w-full rounded-full transition-colors",
                    lineCompleted ? "bg-primary" : "bg-border",
                  )}
                />
              </div>
            )}

            {/* Label under dot */}
            <div
              style={{ gridColumn: dotCol, gridRow: 2 }}
              className="flex flex-col items-center justify-center gap-0.5"
            >
              <span
                className={cn(
                  "text-center text-sm",
                  isCompleted && "text-foreground font-medium",
                  isCurrent && "text-foreground font-semibold",
                  isUpcoming && "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
              {step.optional && !step.label.toLowerCase().includes("optional") && (
                <span className="text-xs text-muted-foreground">(optional)</span>
              )}
            </div>

            {/* Empty cell under line */}
            {hasLine && <div style={{ gridColumn: lineCol, gridRow: 2 }} aria-hidden />}
          </Fragment>
        );
      })}
    </nav>
  );
}

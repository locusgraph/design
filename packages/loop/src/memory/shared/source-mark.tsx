import { cn } from "@locusgraph/components";
import type { Citation } from "../../types";
import { sourceInitial } from "./host-label";

export function SourceMark({ citation, className }: { citation: Citation; className?: string }) {
  return (
    <span
      aria-hidden
      data-slot="source-mark"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center bg-muted font-mono text-[11px] leading-none font-medium text-muted-foreground ring-1 ring-border",
        className
      )}
    >
      {sourceInitial(citation)}
    </span>
  );
}

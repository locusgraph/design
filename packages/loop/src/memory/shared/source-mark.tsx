import { cn } from "@locusgraph/components";
import type { Citation } from "../../types";
import { sourceInitial } from "./host-label";

export function SourceMark({ citation, className }: { citation: Citation; className?: string }) {
  return (
    <span
      aria-hidden
      data-slot="source-mark"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-full bg-muted text-2xs leading-none font-medium text-muted-foreground uppercase",
        className
      )}
    >
      {sourceInitial(citation)}
    </span>
  );
}

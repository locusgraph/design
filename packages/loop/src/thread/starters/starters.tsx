"use client";

import { ArrowUpRight as ArrowUpRightIcon } from "@carbon/icons-react";
import { cn } from "@locusgraph/components";
import type { ComponentProps } from "react";

export type Starter = string | { text: string; label?: string };

type StartersProps = Omit<ComponentProps<"div">, "onSelect"> & {
  suggestions: Starter[];
  onSelect: (text: string) => void;
  disabled?: boolean;
};

function textOf(suggestion: Starter) {
  return typeof suggestion === "string" ? suggestion : suggestion.text;
}

function labelOf(suggestion: Starter) {
  return typeof suggestion === "string" ? suggestion : (suggestion.label ?? suggestion.text);
}

export function Starters({
  suggestions,
  onSelect,
  disabled = false,
  className,
  ...props
}: StartersProps) {
  if (suggestions.length === 0) {
    return null;
  }
  return (
    <div
      data-slot="starters"
      role="group"
      aria-label="Suggested prompts"
      className={cn("flex flex-col divide-y bg-card ring-1 ring-border", className)}
      {...props}
    >
      {suggestions.map((suggestion) => (
        <button
          key={textOf(suggestion)}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(textOf(suggestion))}
          className="group flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm outline-none hover:bg-accent/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 motion-safe:transition-colors"
        >
          <span className="min-w-0 flex-1 text-pretty">{labelOf(suggestion)}</span>
          <ArrowUpRightIcon
            aria-hidden
            className="size-3.5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:transition-opacity"
          />
        </button>
      ))}
    </div>
  );
}

import { cn } from "@locusgraph/components";
import { ArrowUpRightIcon } from "lucide-react";
import type { ComponentProps } from "react";

export type Suggestion = string | { text: string; label?: string };

type SuggestionsProps = Omit<ComponentProps<"div">, "onSelect"> & {
  suggestions: Suggestion[];
  onSelect: (text: string) => void;
  disabled?: boolean;
};

function textOf(suggestion: Suggestion) {
  return typeof suggestion === "string" ? suggestion : suggestion.text;
}

function labelOf(suggestion: Suggestion) {
  return typeof suggestion === "string" ? suggestion : (suggestion.label ?? suggestion.text);
}

export function Suggestions({
  suggestions,
  onSelect,
  disabled = false,
  className,
  ...props
}: SuggestionsProps) {
  if (suggestions.length === 0) {
    return null;
  }
  return (
    <div
      data-slot="suggestions"
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

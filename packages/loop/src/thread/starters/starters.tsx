import { cn } from "@locusgraph/components";
import { ArrowUpRight as ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
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
      className={cn("flex flex-col", className)}
      {...props}
    >
      {suggestions.map((suggestion) => (
        <button
          key={textOf(suggestion)}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(textOf(suggestion))}
          className="group -mx-2 flex w-[calc(100%+1rem)] items-center gap-3 px-2 py-1.5 text-left text-sm text-muted-foreground focus-ring hover:bg-muted/50 hover:text-foreground disabled:pointer-events-none disabled:opacity-50 motion-safe:transition-colors"
        >
          <span className="min-w-0 flex-1 text-pretty">{labelOf(suggestion)}</span>
          <ArrowUpRightIcon
            weight="bold"
            aria-hidden
            className="size-3.5 shrink-0 text-interactive opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:transition-opacity"
          />
        </button>
      ))}
    </div>
  );
}

import { Button, cn } from "@locusgraph/components";
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
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {suggestions.map((suggestion) => (
        <Button
          key={textOf(suggestion)}
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          className="h-auto max-w-full py-1.5 text-left whitespace-normal"
          onClick={() => onSelect(textOf(suggestion))}
        >
          {labelOf(suggestion)}
        </Button>
      ))}
    </div>
  );
}

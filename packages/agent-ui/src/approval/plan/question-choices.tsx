import { cn } from "@locusgraph/components";
import { type KeyboardEvent, useEffect, useRef } from "react";
import type { QuestionOption } from "../types";

type QuestionChoicesProps = {
  label: string;
  options: QuestionOption[];
  selectedId?: string;
  onSelect: (optionId: string) => void;
  autoFocus?: boolean;
};

const nextIndexByKey: Record<string, (index: number, count: number) => number> = {
  ArrowRight: (index, count) => (index + 1) % count,
  ArrowDown: (index, count) => (index + 1) % count,
  ArrowLeft: (index, count) => (index - 1 + count) % count,
  ArrowUp: (index, count) => (index - 1 + count) % count,
  Home: () => 0,
  End: (_index, count) => count - 1,
};

export function QuestionChoices({
  label,
  options,
  selectedId,
  onSelect,
  autoFocus = false,
}: QuestionChoicesProps) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    if (autoFocus) buttons.current[0]?.focus({ preventScroll: true });
  }, [autoFocus]);
  const selectedIndex = options.findIndex((option) => option.id === selectedId);
  const tabStop = selectedIndex === -1 ? 0 : selectedIndex;

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const move = nextIndexByKey[event.key];
    if (!move) return;
    event.preventDefault();
    const next = move(index, options.length);
    const option = options[next];
    if (!option) return;
    onSelect(option.id);
    buttons.current[next]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      data-slot="question-choices"
      className="flex flex-wrap gap-2"
    >
      {options.map((option, index) => {
        const checked = option.id === selectedId;
        return (
          <button
            key={option.id}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={index === tabStop ? 0 : -1}
            data-state={checked ? "checked" : "unchecked"}
            onClick={() => onSelect(option.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "flex flex-col items-start rounded-full border px-4 py-1.5 text-left text-sm outline-none motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              checked
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:bg-accent"
            )}
          >
            <span className="font-medium">{option.label}</span>
            {option.description && (
              <span className={cn("text-xs", checked ? "opacity-80" : "text-muted-foreground")}>
                {option.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

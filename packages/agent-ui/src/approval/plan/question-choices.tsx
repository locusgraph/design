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

function indexFromDigitKey(key: string, count: number) {
  const digit = Number(key);
  return Number.isInteger(digit) && digit >= 1 && digit <= count ? digit - 1 : undefined;
}

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

  function selectIndex(next: number) {
    const option = options[next];
    if (!option) return;
    onSelect(option.id);
    buttons.current[next]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const byDigit = indexFromDigitKey(event.key, options.length);
    const move = nextIndexByKey[event.key];
    if (byDigit === undefined && !move) return;
    event.preventDefault();
    selectIndex(byDigit ?? move?.(index, options.length) ?? index);
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      data-slot="question-choices"
      className="flex flex-col divide-y ring-1 ring-border"
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
              "group relative flex items-center gap-3 px-3 py-2.5 text-left text-sm outline-none motion-safe:transition-colors focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring/70",
              checked ? "bg-accent" : "hover:bg-accent/50"
            )}
          >
            <span
              aria-hidden
              className={cn(
                "flex size-5 shrink-0 items-center justify-center font-mono text-[11px] ring-1",
                checked
                  ? "bg-primary text-primary-foreground ring-primary"
                  : "text-muted-foreground ring-border"
              )}
            >
              {index + 1}
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="font-medium">{option.label}</span>
              {option.description && (
                <span className="text-xs text-muted-foreground">{option.description}</span>
              )}
            </span>
            <span
              aria-hidden
              className={cn(
                "size-3.5 shrink-0 rounded-full ring-1 motion-safe:transition-shadow",
                checked ? "ring-[4px] ring-primary" : "ring-border"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

import { ShieldAlert as ShieldAlertIcon } from "@carbon/icons-react";
import { cn, Textarea } from "@locusgraph/components";
import type { ProposedMemory } from "../types";
import type { MemoryChoice, MemoryDraft } from "./memory-choices";

type MemoryRowProps = {
  memory: ProposedMemory;
  draft: MemoryDraft;
  onChange: (draft: MemoryDraft) => void;
};

const choiceLabels: Record<MemoryChoice, string> = {
  keep: "Keep",
  edit: "Edit",
  discard: "Discard",
};

const choices: MemoryChoice[] = ["keep", "edit", "discard"];

const selectedChoiceClass: Record<MemoryChoice, string> = {
  keep: "text-foreground shadow-[inset_0_-2px_0_var(--color-primary)]",
  edit: "text-foreground shadow-[inset_0_-2px_0_var(--color-primary)]",
  discard: "text-destructive shadow-[inset_0_-2px_0_var(--color-destructive)]",
};

function ChoiceSegments({
  value,
  onChange,
}: {
  value: MemoryChoice;
  onChange: (choice: MemoryChoice) => void;
}) {
  return (
    <fieldset className="flex shrink-0 gap-1 self-start">
      <legend className="sr-only">What to do with this memory</legend>
      {choices.map((choice) => {
        const pressed = value === choice;
        return (
          <button
            key={choice}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(choice)}
            className={cn(
              "h-7 px-2 text-xs outline-none motion-safe:transition-colors focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring/70",
              pressed
                ? cn("font-medium", selectedChoiceClass[choice])
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {choiceLabels[choice]}
          </button>
        );
      })}
    </fieldset>
  );
}

function SensitiveMarker() {
  return (
    <span className="flex items-center gap-1 text-warn">
      <ShieldAlertIcon aria-hidden className="size-3" />
      Sensitive
    </span>
  );
}

export function MemoryRow({ memory, draft, onChange }: MemoryRowProps) {
  const discarded = draft.choice === "discard";
  const editing = draft.choice === "edit";
  return (
    <li
      data-slot="memory-review-item"
      data-choice={draft.choice}
      data-sensitive={memory.sensitive || undefined}
      className={cn(
        "flex flex-col gap-2 px-5 py-2.5 motion-safe:transition-colors",
        editing ? "bg-accent/30" : "hover:bg-accent/30"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {(memory.kind || memory.sensitive) && (
            <span className="locus-eyebrow flex items-center gap-2">
              {memory.kind && <span>{memory.kind}</span>}
              {memory.sensitive && <SensitiveMarker />}
            </span>
          )}
          {!editing && (
            <p
              className={cn(
                "text-sm",
                discarded && "text-muted-foreground line-through decoration-muted-foreground/60"
              )}
            >
              {memory.text}
            </p>
          )}
        </div>
        <ChoiceSegments
          value={draft.choice}
          onChange={(choice) => onChange({ ...draft, choice })}
        />
      </div>
      {editing && (
        <Textarea
          aria-label="Memory text"
          value={draft.text}
          aria-invalid={draft.text.trim() === "" || undefined}
          onChange={(event) => onChange({ ...draft, text: event.target.value })}
          className="min-h-16 text-sm"
        />
      )}
      {memory.sensitive && !discarded && (
        <p className="text-xs text-warn">
          This looks like personal or secret data. Keep it only if the agent should remember it.
        </p>
      )}
    </li>
  );
}

import { cn, Textarea } from "@locusgraph/components";
import { ShieldWarning as ShieldAlertIcon } from "@phosphor-icons/react/ssr";
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
  keep: "text-memory",
  edit: "text-foreground",
  discard: "text-destructive",
};

function ChoiceSegments({
  value,
  onChange,
}: {
  value: MemoryChoice;
  onChange: (choice: MemoryChoice) => void;
}) {
  return (
    <fieldset className="flex shrink-0 gap-3 self-start pt-0.5">
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
              "text-xs outline-none motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-ring/70",
              pressed ? cn("font-medium", selectedChoiceClass[choice]) : "text-faint hover:text-s1"
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
      <ShieldAlertIcon weight="bold" aria-hidden className="size-3" />
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
      className={cn("flex flex-col gap-2 py-1.5")}
    >
      <div className="flex items-start gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {(memory.kind || memory.sensitive) && (
            <span className="flex items-center gap-2 text-xs text-faint">
              {memory.kind && <span className="capitalize">{memory.kind}</span>}
              {memory.sensitive && <SensitiveMarker />}
            </span>
          )}
          {!editing && (
            <p
              className={cn(
                "text-sm text-foreground",
                discarded && "text-faint line-through decoration-faint"
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
          className="min-h-16 border-transparent bg-muted text-sm shadow-none dark:bg-muted"
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

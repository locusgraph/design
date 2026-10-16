import { Badge, Button, cn, Textarea } from "@locusgraph/components";
import { ShieldAlertIcon } from "lucide-react";
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

export function MemoryRow({ memory, draft, onChange }: MemoryRowProps) {
  const discarded = draft.choice === "discard";
  return (
    <li
      data-slot="memory-review-item"
      data-choice={draft.choice}
      data-sensitive={memory.sensitive || undefined}
      className="flex flex-col gap-2 px-3 py-3"
    >
      <div className="flex flex-wrap items-center gap-2">
        {memory.kind && (
          <Badge variant="outline" className="font-mono">
            {memory.kind}
          </Badge>
        )}
        {memory.sensitive && (
          <Badge variant="secondary" className="text-warn">
            <ShieldAlertIcon aria-hidden />
            Sensitive
          </Badge>
        )}
      </div>
      {draft.choice === "edit" ? (
        <Textarea
          aria-label="Memory text"
          value={draft.text}
          aria-invalid={draft.text.trim() === "" || undefined}
          onChange={(event) => onChange({ ...draft, text: event.target.value })}
        />
      ) : (
        <p className={cn("text-sm", discarded && "text-muted-foreground line-through")}>
          {memory.text}
        </p>
      )}
      {memory.sensitive && !discarded && (
        <p className="text-xs text-warn">
          This looks like personal or secret data. Keep it only if the agent should remember it.
        </p>
      )}
      <fieldset className="flex flex-wrap gap-1.5">
        <legend className="sr-only">What to do with this memory</legend>
        {choices.map((choice) => (
          <Button
            key={choice}
            type="button"
            size="xs"
            variant={
              draft.choice === choice
                ? choice === "discard"
                  ? "destructive"
                  : "default"
                : "outline"
            }
            aria-pressed={draft.choice === choice}
            onClick={() => onChange({ ...draft, choice })}
          >
            {choiceLabels[choice]}
          </Button>
        ))}
      </fieldset>
    </li>
  );
}

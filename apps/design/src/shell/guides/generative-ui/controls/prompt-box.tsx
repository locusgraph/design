import { Button, Textarea } from "@locusgraph/components";
import { useId } from "react";
import { generativeSamples } from "../session/samples";

type PromptBoxProps = {
  prompt: string;
  streaming: boolean;
  onReplay: (sampleId: string) => void;
};

export function PromptBox({ prompt, streaming, onReplay }: PromptBoxProps) {
  const noteId = useId();
  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      <span className="locus-eyebrow">Ask the model</span>
      <Textarea
        aria-label="Prompt"
        aria-describedby={noteId}
        value={prompt}
        rows={3}
        disabled
        readOnly
        className="min-h-20 resize-none text-sm"
      />
      <p id={noteId} className="text-xs text-pretty text-faint">
        No model key on this site. Replay a recorded reply instead.
      </p>
      <div className="flex flex-col gap-2">
        <span className="locus-eyebrow">Recorded replies</span>
        <div className="flex flex-wrap gap-1.5">
          {generativeSamples.map((sample) => (
            <Button
              key={sample.id}
              variant="outline"
              size="xs"
              disabled={streaming}
              className="text-muted-foreground hover:text-foreground"
              onClick={() => onReplay(sample.id)}
            >
              {sample.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

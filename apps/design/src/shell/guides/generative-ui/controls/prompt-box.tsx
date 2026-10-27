import { Button, Textarea } from "@locusgraph/components";
import { Sparkle as SparkleIcon } from "@phosphor-icons/react/ssr";
import { generativeSamples } from "../session/samples";

type PromptBoxProps = {
  prompt: string;
  streaming: boolean;
  onPromptChange: (prompt: string) => void;
  onGenerate: (prompt: string) => void;
};

export function PromptBox({ prompt, streaming, onPromptChange, onGenerate }: PromptBoxProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      <span className="locus-eyebrow">Ask the model</span>
      <Textarea
        aria-label="Prompt"
        value={prompt}
        rows={3}
        onChange={(event) => onPromptChange(event.target.value)}
        className="min-h-20 resize-none text-sm"
      />
      <div className="flex flex-wrap gap-1.5">
        {generativeSamples.map((sample) => (
          <Button
            key={sample.id}
            variant="outline"
            size="xs"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => {
              onPromptChange(sample.prompt);
              onGenerate(sample.prompt);
            }}
          >
            {sample.label}
          </Button>
        ))}
      </div>
      <Button disabled={streaming || prompt.trim() === ""} onClick={() => onGenerate(prompt)}>
        <SparkleIcon weight="bold" aria-hidden />
        {streaming ? "Generating…" : "Generate"}
      </Button>
      <p className="text-xs text-faint">Replays a recorded reply. No model is called.</p>
    </div>
  );
}

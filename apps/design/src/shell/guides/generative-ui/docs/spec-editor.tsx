import { Button, cn, Textarea } from "@locusgraph/components";
import {
  CheckCircle as CheckIcon,
  Copy as CopyIcon,
  Warning as WarningIcon,
} from "@phosphor-icons/react/ssr";
import { useState } from "react";

type SpecEditorProps = {
  source: string;
  error?: string;
  elementCount: number;
  onSourceChange: (source: string) => void;
};

export function SpecEditor({ source, error, elementCount, onSourceChange }: SpecEditorProps) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    void navigator.clipboard.writeText(source).then(() => setCopied(true));
    globalThis.setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Textarea
        aria-label="Spec JSON"
        value={source}
        spellCheck={false}
        onChange={(event) => onSourceChange(event.target.value)}
        className="min-h-96 flex-1 resize-none border-0 bg-transparent p-4 font-mono text-xs leading-relaxed focus-visible:ring-0 sm:text-xs dark:bg-transparent"
      />
      <div className="flex min-h-12 items-center gap-2 border-t bg-muted/70 px-4 text-xs">
        {error ? (
          <WarningIcon weight="bold" aria-hidden className="size-3.5 shrink-0 text-destructive" />
        ) : (
          <CheckIcon weight="bold" aria-hidden className="size-3.5 shrink-0 text-good" />
        )}
        <span
          className={cn("min-w-0 truncate", error ? "text-destructive" : "text-muted-foreground")}
        >
          {error ? `Showing the last valid spec. ${error}` : `Valid · ${elementCount} elements`}
        </span>
        <Button variant="ghost" size="xs" className="ml-auto" onClick={copy}>
          <CopyIcon weight="bold" aria-hidden />
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}

import { Checkmark as CheckIcon, Copy as CopyIcon } from "@carbon/icons-react";
import { Button } from "@locusgraph/components";
import { useState } from "react";

export function CopyCommand({ command, prompt = true }: { command: string; prompt?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="flex h-9 min-w-0 items-center gap-2 bg-muted/40 pr-1 pl-4 font-mono text-[13px]">
      {prompt && (
        <span aria-hidden className="text-muted-foreground">
          $
        </span>
      )}
      <span className="min-w-0 overflow-x-auto whitespace-nowrap">{command}</span>
      <Button
        size="icon-xs"
        variant="ghost"
        aria-label={copied ? "Copied" : "Copy command"}
        onClick={copy}
        className="ml-auto"
      >
        {copied ? <CheckIcon className="text-good" /> : <CopyIcon />}
      </Button>
    </div>
  );
}

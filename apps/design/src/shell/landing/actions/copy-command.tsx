import { Button } from "@locusgraph/components";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

export function CopyCommand({ command }: { command: string }) {
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
    <div className="flex h-9 min-w-0 items-center gap-2 bg-card pr-1 pl-4 font-mono text-[13px] ring-1 ring-border">
      <span aria-hidden className="text-muted-foreground">
        $
      </span>
      <span className="min-w-0 truncate">{command}</span>
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

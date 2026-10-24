import { Button } from "@locusgraph/components";
import { Copy as CopyIcon } from "@phosphor-icons/react/ssr";
import { useState } from "react";

export function PromptTab({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    void navigator.clipboard.writeText(prompt).then(() => setCopied(true));
    globalThis.setTimeout(() => setCopied(false), 1500);
  };
  return (
    <>
      <p className="text-sm text-pretty text-muted-foreground">
        Paste this into your coding agent. It sets the three variables and nothing else.
      </p>
      <pre className="border bg-background p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap">
        {prompt}
      </pre>
      <Button variant="outline" size="sm" className="self-start" onClick={copy}>
        <CopyIcon weight="bold" aria-hidden />
        {copied ? "Copied" : "Copy prompt"}
      </Button>
    </>
  );
}

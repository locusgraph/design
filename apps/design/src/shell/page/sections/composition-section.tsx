import { Button } from "@locusgraph/components";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

function articleFor(word: string) {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

export function CompositionSection({ title, tree }: { title: string; tree: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(tree);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <section id="composition" className="flex scroll-mt-24 flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight">Composition</h2>
      <p className="text-muted-foreground">
        Use the following composition to build {articleFor(title)}{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">{title}</code>:
      </p>
      <div className="relative border bg-surface">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Copy composition"
          onClick={copy}
          className="absolute top-2 right-2"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </Button>
        <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">{tree}</pre>
      </div>
    </section>
  );
}

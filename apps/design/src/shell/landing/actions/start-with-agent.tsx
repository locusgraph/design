import { cn } from "@locusgraph/components";
import { AsteriskIcon, BoxIcon, CheckIcon, CopyIcon } from "lucide-react";
import type * as React from "react";
import { useState } from "react";

const agentPrompt = `Build this UI with the LocusGraph design system.

1. Read https://design.locusgraph.com/DESIGN.md first. It lists every component, block and agent part, how to install them and the house style.
2. Before using a component, fetch its page by adding .md to its path, for example https://design.locusgraph.com/loop/approval/approval.md, and use the props it documents. Do not guess props.
3. Install with pnpm add @locusgraph/components (plus @locusgraph/blocks, @locusgraph/loop or @locusgraph/brand when needed) and import the CSS listed in DESIGN.md.
4. Follow the house style: square containers, pill buttons, ruled lines instead of cards, the eyebrow class for small labels, tokens instead of raw colors.`;

const agentChips: { label: string; icon: React.ReactNode }[] = [
  { label: "Claude Code", icon: <AsteriskIcon className="size-3.5" /> },
  { label: "Cursor", icon: <BoxIcon className="size-3" /> },
  { label: "VS Code", icon: <span>VS</span> },
  { label: "Codex", icon: <span>CX</span> },
];

function AgentChips() {
  return (
    <span aria-hidden className="flex -space-x-1.5">
      {agentChips.map((chip) => (
        <span
          key={chip.label}
          title={chip.label}
          className="flex size-6 items-center justify-center rounded-full bg-muted font-mono text-[9px] font-semibold text-foreground/80 ring-2 ring-background"
        >
          {chip.icon}
        </span>
      ))}
    </span>
  );
}

export function StartWithAgent({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(agentPrompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className={cn("flex flex-col items-start gap-2", className)}>
      <button
        type="button"
        onClick={copy}
        className="flex h-11 items-center gap-3 rounded-full bg-card py-1.5 pr-4 pl-2 text-sm font-medium ring-1 ring-input outline-none motion-safe:transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
      >
        <AgentChips />
        <span>{copied ? "Prompt copied" : "Start with an agent"}</span>
        {copied ? (
          <CheckIcon aria-hidden className="size-4 text-good" />
        ) : (
          <CopyIcon aria-hidden className="size-4 text-muted-foreground" />
        )}
      </button>
      <span role="status" aria-live="polite" className="pl-3 text-xs text-muted-foreground">
        {copied
          ? "Paste it into your agent."
          : "Copies a prompt that points your agent at /DESIGN.md"}
      </span>
    </div>
  );
}

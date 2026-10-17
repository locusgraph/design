import {
  Asterisk as AsteriskIcon,
  Cube as BoxIcon,
  Checkmark as CheckIcon,
  Copy as CopyIcon,
} from "@carbon/icons-react";
import { cn } from "@locusgraph/components";
import type * as React from "react";
import { useState } from "react";

const agentPrompt = `Build this UI with the LocusGraph design system.

1. Read https://design.locusgraph.com/DESIGN.md first. It lists every component, block and agent part, how to install them and the house style.
2. Before using a component, fetch its page by adding .md to its path, for example https://design.locusgraph.com/loop/approval/approval.md, and use the props it documents. Do not guess props.
3. Install with pnpm add @locusgraph/components (plus @locusgraph/blocks, @locusgraph/loop or @locusgraph/brand when needed) and import the CSS listed in DESIGN.md.
4. Follow the house style: square containers, pill buttons, ruled lines instead of cards, the locus-eyebrow class for small labels, tokens instead of raw colors.`;

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
          className="flex size-6 items-center justify-center rounded-full bg-primary-foreground/15 font-mono text-[9px] font-semibold text-primary-foreground ring-2 ring-primary"
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
    <div className={cn("flex flex-col items-start", className)}>
      <button
        type="button"
        onClick={copy}
        className="flex h-11 items-center gap-3 rounded-full bg-primary py-1.5 pr-4 pl-2 text-sm font-medium text-primary-foreground shadow-[0_1px_2px_rgb(0_0_0/0.12),inset_0_1px_0_rgb(255_255_255/0.14)] outline-none motion-safe:transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <AgentChips />
        <span>{copied ? "Prompt copied" : "Start with an agent"}</span>
        {copied ? (
          <CheckIcon aria-hidden className="size-4" />
        ) : (
          <CopyIcon aria-hidden className="size-4 opacity-70" />
        )}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Prompt copied. Paste it into your agent." : ""}
      </span>
    </div>
  );
}

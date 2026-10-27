import { cn } from "@locusgraph/components";
import {
  Asterisk as AsteriskIcon,
  Cube as BoxIcon,
  Check as CheckIcon,
  Copy as CopyIcon,
} from "@phosphor-icons/react/ssr";
import type * as React from "react";
import { useState } from "react";

export const agentPrompt = `Build this UI with the LocusGraph design system.

1. Read https://design.locusgraph.com/DESIGN.md first. It lists every component, block and agent part, how to install them and the house style.
2. Before using a component, fetch its page by adding .md to its path, for example https://design.locusgraph.com/loop/approval/approval.md, and use the props it documents. Do not guess props.
3. Install with pnpm add @locusgraph/components (plus @locusgraph/blocks, @locusgraph/loop or @locusgraph/brand when needed) and import the CSS listed in DESIGN.md.
4. Follow the house style: square containers, pill buttons, ruled lines instead of cards, the locus-eyebrow class for small labels, tokens instead of raw colors.`;

const agentChips: { label: string; icon: React.ReactNode }[] = [
  { label: "Claude Code", icon: <AsteriskIcon weight="bold" aria-hidden className="size-3.5" /> },
  { label: "Cursor", icon: <BoxIcon weight="bold" aria-hidden className="size-3" /> },
  { label: "VS Code", icon: <span>VS</span> },
  { label: "Codex", icon: <span>CX</span> },
];

function AgentChips() {
  return (
    <span aria-hidden className="flex -space-x-1">
      {agentChips.map((chip) => (
        <span
          key={chip.label}
          title={chip.label}
          className="flex size-7 items-center justify-center rounded-full bg-[color-mix(in_oklch,var(--locus-btn-ink)_20%,var(--locus-btn))] font-mono text-[0.625rem] font-semibold tracking-tight text-primary-foreground ring-2 ring-primary"
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
        className="flex h-11 items-center gap-3 rounded-full bg-primary py-1.5 pr-4 pl-2 font-heading text-sm font-medium text-primary-foreground shadow-[0_1px_2px_rgb(0_0_0/0.12),inset_0_1px_0_rgb(255_255_255/0.14)] locus-focus-ring motion-safe:transition-colors hover:bg-primary/90"
      >
        <AgentChips />
        <span>{copied ? "Prompt copied" : "Start with an agent"}</span>
        {copied ? (
          <CheckIcon weight="bold" aria-hidden className="size-4" />
        ) : (
          <CopyIcon weight="bold" aria-hidden className="size-4 opacity-70" />
        )}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Prompt copied. Paste it into your agent." : ""}
      </span>
    </div>
  );
}

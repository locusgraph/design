"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger, cn } from "@locusgraph/components";
import { ChevronDownIcon, WrenchIcon } from "lucide-react";
import { useState } from "react";
import { type ToolPart, toolNameOf } from "../../types";
import { JsonBlock } from "./json-block";
import { ToolStatus } from "./tool-status";

export type ToolCallProps = {
  part: ToolPart;
  defaultOpen?: boolean;
  className?: string;
};

export function ToolCall({ part, defaultOpen = false, className }: ToolCallProps) {
  const [open, setOpen] = useState(defaultOpen);
  const hasInput = part.input !== undefined;
  const hasOutput = part.state === "output-available" && part.output !== undefined;

  return (
    <Collapsible
      data-slot="tool-call"
      data-state={part.state}
      data-tool-call-id={part.toolCallId}
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "flex min-w-0 flex-col bg-card text-card-foreground ring-1 ring-border",
        className
      )}
    >
      <CollapsibleTrigger
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-inset"
      >
        <WrenchIcon aria-hidden className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="min-w-0 flex-1 truncate font-mono text-[13px] font-medium">
          {toolNameOf(part)}
        </span>
        <ToolStatus state={part.state} />
        <ChevronDownIcon
          aria-hidden
          className={cn(
            "size-3.5 shrink-0 text-muted-foreground motion-safe:transition-transform",
            open && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      {part.errorText && (
        <p
          data-slot="tool-call-error"
          role="alert"
          className="border-t border-border px-3 py-2.5 text-sm text-destructive"
        >
          {part.errorText}
        </p>
      )}
      <CollapsibleContent
        data-slot="tool-call-content"
        className="flex flex-col gap-4 border-t border-border px-3 pt-3 pb-4"
      >
        {hasInput && <JsonBlock label="Input" value={part.input} />}
        {hasOutput && <JsonBlock label="Output" value={part.output} />}
        {!hasInput && !hasOutput && (
          <span className="text-sm text-muted-foreground">No input yet.</span>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

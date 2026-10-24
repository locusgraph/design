"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger, cn } from "@locusgraph/components";
import { CaretRight as ChevronRightIcon, Wrench as WrenchIcon } from "@phosphor-icons/react/ssr";
import { type ReactNode, useState } from "react";
import {
  lineChevronClass,
  lineDetailClass,
  lineIconClass,
  lineMemoryIconClass,
  lineMemoryObjectClass,
  lineObjectClass,
  lineTriggerClass,
} from "../../shared/line";
import { type ToolPart, toolNameOf } from "../../types";
import { JsonBlock } from "./json-block";
import { humanToolName, isToolBusy, showsStateWord, ToolStatus } from "./tool-status";

export type ToolTone = "default" | "memory";

export type ToolProps = {
  part: ToolPart;
  tone?: ToolTone;
  verb?: string;
  activeVerb?: string;
  target?: ReactNode;
  icon?: ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

const toneClasses: Record<ToolTone, { icon: string; object: string }> = {
  default: { icon: lineIconClass, object: lineObjectClass },
  memory: { icon: lineMemoryIconClass, object: lineMemoryObjectClass },
};

function ToolLabel({
  part,
  tone = "default",
  verb,
  activeVerb,
  target,
}: Pick<ToolProps, "part" | "tone" | "verb" | "activeVerb" | "target">) {
  const busy = isToolBusy(part.state);
  const object = (
    <span className={busy ? "font-medium" : toneClasses[tone].object}>
      {target ?? humanToolName(toolNameOf(part))}
    </span>
  );
  if (showsStateWord(part.state)) return object;
  return (
    <span className={cn(busy && "motion-safe:shimmer")}>
      {busy ? (activeVerb ?? "Running") : (verb ?? "Ran")} {object}
    </span>
  );
}

export function Tool({
  part,
  tone = "default",
  verb,
  activeVerb,
  target,
  icon,
  defaultOpen = false,
  className,
}: ToolProps) {
  const [open, setOpen] = useState(defaultOpen);
  const hasInput = part.input !== undefined;
  const hasOutput = part.state === "output-available" && part.output !== undefined;

  return (
    <Collapsible
      data-slot="tool"
      data-state={part.state}
      data-tool-call-id={part.toolCallId}
      data-tone={tone}
      open={open}
      onOpenChange={setOpen}
      className={cn("flex min-w-0 flex-col", className)}
    >
      <CollapsibleTrigger className={lineTriggerClass}>
        <span aria-hidden className={toneClasses[tone].icon}>
          {icon ?? <WrenchIcon weight="bold" aria-hidden />}
        </span>
        <span className="flex min-w-0 items-baseline gap-1.5 truncate">
          <ToolStatus state={part.state} />
          <ToolLabel part={part} tone={tone} verb={verb} activeVerb={activeVerb} target={target} />
        </span>
        <ChevronRightIcon weight="bold" aria-hidden className={lineChevronClass} />
      </CollapsibleTrigger>
      {part.errorText && (
        <p
          data-slot="tool-error"
          role="alert"
          className={cn(lineDetailClass, "pb-1 text-destructive")}
        >
          {part.errorText}
        </p>
      )}
      <CollapsibleContent
        data-slot="tool-content"
        className={cn(lineDetailClass, "flex flex-col gap-3 pt-1 pb-2")}
      >
        {hasInput && <JsonBlock label="Input" value={part.input} />}
        {hasOutput && <JsonBlock label="Output" value={part.output} />}
        {!hasInput && !hasOutput && <span className="text-faint">No input yet.</span>}
      </CollapsibleContent>
    </Collapsible>
  );
}

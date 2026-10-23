import {
  cn,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  Message as MessageRow,
} from "@locusgraph/components";
import type * as React from "react";
import { Thinking } from "../../agent/thinking/thinking";
import { Tool } from "../../agent/tool/tool";
import { Sources } from "../../memory/sources";
import type { AgentMessage, ReasoningPart, SourceUrlPart, TextPart, ToolPart } from "../../types";
import { fileFromFilePart } from "../files/file-meta";
import { Files } from "../files/files";
import { Reply } from "../reply/reply";
import { groupParts, type PartSegment } from "./group-parts";

export type TurnProps = Omit<React.ComponentProps<"div">, "children"> & {
  message: AgentMessage;
  avatar?: React.ReactNode;
  footer?: React.ReactNode;
  renderReasoning?: (part: ReasoningPart) => React.ReactNode;
  renderTool?: (part: ToolPart) => React.ReactNode;
  renderSources?: (parts: SourceUrlPart[]) => React.ReactNode;
};

const roleLabels: Record<AgentMessage["role"], string> = {
  user: "You said",
  assistant: "Assistant said",
  system: "System note",
};

type PartRenderers = Pick<TurnProps, "renderReasoning" | "renderTool" | "renderSources">;

function UserText({ part }: { part: TextPart }) {
  return (
    <div
      data-slot="message-user-text"
      className="max-w-[85%] bg-muted px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap wrap-break-word text-foreground"
    >
      {part.text}
    </div>
  );
}

function partClassName(role: AgentMessage["role"], kind: PartSegment["kind"]) {
  if (role === "user") {
    return "w-full items-end";
  }
  if (role === "system") {
    return "*:data-[slot=reply]:text-xs *:data-[slot=reply]:text-faint";
  }
  return cn(kind === "text" && "*:data-[slot=reply]:max-w-[68ch]");
}

const lineKinds: ReadonlySet<PartSegment["kind"]> = new Set(["reasoning", "tool", "sources"]);

function followsLine(segments: PartSegment[], position: number) {
  const previous = segments[position - 1];
  const current = segments[position];
  if (!previous || !current) return false;
  return lineKinds.has(previous.kind) && lineKinds.has(current.kind);
}

function renderSegment(segment: PartSegment, isUser: boolean, renderers: PartRenderers) {
  switch (segment.kind) {
    case "text":
      return isUser ? (
        <UserText part={segment.part} />
      ) : (
        <Reply state={segment.part.state}>{segment.part.text}</Reply>
      );
    case "reasoning":
      return renderers.renderReasoning ? (
        renderers.renderReasoning(segment.part)
      ) : (
        <Thinking
          text={segment.part.text}
          state={segment.part.state}
          durationMs={segment.part.durationMs}
        />
      );
    case "tool":
      return renderers.renderTool ? (
        renderers.renderTool(segment.part)
      ) : (
        <Tool part={segment.part} />
      );
    case "sources":
      return renderers.renderSources ? (
        renderers.renderSources(segment.parts)
      ) : (
        <Sources sources={segment.parts} firstIndex={segment.firstIndex} />
      );
    case "files":
      return (
        <Files
          items={segment.parts.map(fileFromFilePart)}
          className={cn(isUser && "justify-end")}
        />
      );
  }
}

export function Turn({
  message,
  avatar,
  footer,
  renderReasoning,
  renderTool,
  renderSources,
  className,
  ...props
}: TurnProps) {
  const isUser = message.role === "user";
  const renderers = { renderReasoning, renderTool, renderSources };
  return (
    <MessageRow
      data-role={message.role}
      align={isUser ? "end" : "start"}
      aria-label={roleLabels[message.role]}
      role="article"
      className={cn("gap-3 data-[role=system]:text-muted-foreground", className)}
      {...props}
    >
      {avatar && (
        <MessageAvatar className="mt-0.5 self-start group-has-data-[slot=message-footer]/message:translate-y-0">
          {avatar}
        </MessageAvatar>
      )}
      <MessageContent className={cn("gap-4", isUser && "items-end gap-2")}>
        {groupParts(message.parts).map((segment, position, segments) => (
          <div
            key={segment.key}
            data-slot="message-part"
            data-kind={segment.kind}
            data-follows-line={followsLine(segments, position) || undefined}
            className={cn(
              "flex min-w-0 flex-col data-follows-line:-mt-3",
              partClassName(message.role, segment.kind)
            )}
          >
            {renderSegment(segment, isUser, renderers)}
          </div>
        ))}
        {footer && <MessageFooter className="px-0">{footer}</MessageFooter>}
      </MessageContent>
    </MessageRow>
  );
}

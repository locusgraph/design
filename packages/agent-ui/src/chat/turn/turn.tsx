import {
  cn,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  Message as MessageRow,
} from "@locusgraph/components";
import type * as React from "react";
import { Reasoning } from "../../agent/reasoning/reasoning";
import { ToolCall } from "../../agent/tool-call/tool-call";
import { Sources } from "../../memory/sources";
import type { AgentMessage, ReasoningPart, SourceUrlPart, TextPart, ToolPart } from "../../types";
import { Attachments } from "../attachments/attachments";
import { attachmentFromFilePart } from "../attachments/file-meta";
import { Response } from "../response/response";
import { groupParts, type PartSegment } from "./group-parts";

export type ChatMessageProps = Omit<React.ComponentProps<"div">, "children"> & {
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

type PartRenderers = Pick<ChatMessageProps, "renderReasoning" | "renderTool" | "renderSources">;

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
    return "border-l-2 border-border pl-3 *:data-[slot=response]:text-xs *:data-[slot=response]:text-muted-foreground";
  }
  return cn(kind === "text" && "*:data-[slot=response]:max-w-[68ch]");
}

function renderSegment(segment: PartSegment, isUser: boolean, renderers: PartRenderers) {
  switch (segment.kind) {
    case "text":
      return isUser ? (
        <UserText part={segment.part} />
      ) : (
        <Response state={segment.part.state}>{segment.part.text}</Response>
      );
    case "reasoning":
      return renderers.renderReasoning ? (
        renderers.renderReasoning(segment.part)
      ) : (
        <Reasoning
          text={segment.part.text}
          state={segment.part.state}
          durationMs={segment.part.durationMs}
        />
      );
    case "tool":
      return renderers.renderTool ? (
        renderers.renderTool(segment.part)
      ) : (
        <ToolCall part={segment.part} />
      );
    case "sources":
      return renderers.renderSources ? (
        renderers.renderSources(segment.parts)
      ) : (
        <Sources sources={segment.parts} />
      );
    case "files":
      return (
        <Attachments
          items={segment.parts.map(attachmentFromFilePart)}
          className={cn(isUser && "justify-end")}
        />
      );
  }
}

export function ChatMessage({
  message,
  avatar,
  footer,
  renderReasoning,
  renderTool,
  renderSources,
  className,
  ...props
}: ChatMessageProps) {
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
        {groupParts(message.parts).map((segment) => (
          <div
            key={segment.key}
            data-slot="message-part"
            data-kind={segment.kind}
            className={cn("flex min-w-0 flex-col", partClassName(message.role, segment.kind))}
          >
            {renderSegment(segment, isUser, renderers)}
          </div>
        ))}
        {footer && <MessageFooter className="px-0">{footer}</MessageFooter>}
      </MessageContent>
    </MessageRow>
  );
}

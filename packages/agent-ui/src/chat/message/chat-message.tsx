import {
  Bubble,
  BubbleContent,
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
    <Bubble variant="muted" align="end">
      <BubbleContent className="border-border whitespace-pre-wrap">{part.text}</BubbleContent>
    </Bubble>
  );
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
      className={cn("data-[role=system]:text-muted-foreground", className)}
      {...props}
    >
      {avatar && <MessageAvatar>{avatar}</MessageAvatar>}
      <MessageContent className={cn(isUser && "items-end")}>
        {groupParts(message.parts).map((segment) => (
          <div
            key={segment.key}
            data-slot="message-part"
            data-kind={segment.kind}
            className={cn("flex min-w-0 flex-col", isUser && "w-full items-end")}
          >
            {renderSegment(segment, isUser, renderers)}
          </div>
        ))}
        {footer && <MessageFooter>{footer}</MessageFooter>}
      </MessageContent>
    </MessageRow>
  );
}

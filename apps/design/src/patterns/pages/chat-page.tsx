"use client";

import { cn } from "@locusgraph/components";
import {
  type AgentMessage,
  Approval,
  type ApprovalDecision,
  Chat,
  Composer,
  Pulse,
  type RunUsage,
  Tool,
  type ToolPart,
  Turn,
} from "@locusgraph/loop";
import { approvalCallId, sampleContext, sampleMessages, sampleUsage } from "./chat/chat-data";
import { ChatRail } from "./chat/chat-rail";
import { useChatSession } from "./chat/chat-session";

export type ChatPageProps = {
  initialMessages?: AgentMessage[];
  usage?: RunUsage[];
  usedTokens?: number;
  limitTokens?: number;
  showRail?: boolean;
  className?: string;
};

function composerPlaceholder(awaitingApproval: boolean) {
  return awaitingApproval ? "Approve or deny the action above" : "Ask the agent";
}

export function ChatPage({
  initialMessages = sampleMessages,
  usage = sampleUsage,
  usedTokens = sampleContext.usedTokens,
  limitTokens = sampleContext.limitTokens,
  showRail = true,
  className,
}: ChatPageProps) {
  const session = useChatSession(initialMessages);
  const decideBy = (approved: boolean, reason?: string): ApprovalDecision => ({
    approved,
    by: "You",
    at: Date.now(),
    reason,
  });

  const renderTool = (part: ToolPart) =>
    part.toolCallId === approvalCallId ? (
      <Approval
        part={part}
        risk="write"
        actionLabel="Archive 3 accounts"
        decision={session.decision}
        onApprove={() => session.decide(decideBy(true))}
        onDeny={(reason) => session.decide(decideBy(false, reason))}
      />
    ) : (
      <Tool part={part} />
    );

  return (
    <div className={cn("flex h-[40rem] w-full bg-background", className)}>
      <div className="flex min-w-0 flex-1 flex-col">
        <Chat>
          {session.messages.map((message) => (
            <Turn key={message.id} message={message} renderTool={renderTool} />
          ))}
          {session.status === "streaming" && <Pulse label="Working…" />}
        </Chat>
        <div className="px-3 pt-1 pb-3">
          <Composer
            className="mx-auto max-w-3xl"
            status={session.status}
            placeholder={composerPlaceholder(session.awaitingApproval)}
            disabled={session.awaitingApproval}
            onSubmit={(text) => session.send(text)}
            onStop={session.stop}
          />
        </div>
      </div>
      {showRail && <ChatRail usage={usage} usedTokens={usedTokens} limitTokens={limitTokens} />}
    </div>
  );
}

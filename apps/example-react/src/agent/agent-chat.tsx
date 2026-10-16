import {
  type AgentMessage,
  Approval,
  type ApprovalDecision,
  Chat,
  Composer,
  Tool,
  type ToolPart,
  Turn,
} from "@locusgraph/agent-ui";
import { RuleGrid, RuleGridCell } from "@locusgraph/components";
import { useState } from "react";
import {
  archiveCallId,
  archiveRequest,
  firstMessages,
  settleArchive,
  userMessage,
} from "./agent-script";

function composerPlaceholder(awaitingApproval: boolean, decision?: ApprovalDecision) {
  if (awaitingApproval) {
    return "Approve or deny the action above";
  }
  return decision ? "Run finished" : "Ask: archive them";
}

export function AgentChat() {
  const [messages, setMessages] = useState<AgentMessage[]>(firstMessages);
  const [decision, setDecision] = useState<ApprovalDecision>();
  const awaitingApproval = messages.some((message) =>
    message.parts.some((part) => "toolCallId" in part && part.state === "approval-requested")
  );

  const send = (text: string) => {
    const count = messages.length;
    setMessages([
      ...messages,
      userMessage(`msg_${count + 1}`, text),
      archiveRequest(`msg_${count + 2}`),
    ]);
  };

  const decide = (next: ApprovalDecision) => {
    setDecision(next);
    setMessages((current) =>
      current.map((message) =>
        message.parts.some((part) => "toolCallId" in part && part.toolCallId === archiveCallId)
          ? settleArchive(message, next)
          : message
      )
    );
  };

  const renderTool = (part: ToolPart) =>
    part.toolCallId === archiveCallId ? (
      <Approval
        part={part}
        risk="write"
        actionLabel="Archive 3 accounts"
        decision={decision}
        onApprove={() => decide({ approved: true, by: "You", at: Date.now() })}
        onDeny={(reason) => decide({ approved: false, by: "You", at: Date.now(), reason })}
      />
    ) : (
      <Tool part={part} />
    );

  return (
    <RuleGrid columns={1}>
      <RuleGridCell className="h-[480px] p-0">
        <Chat className="h-full">
          {messages.map((message) => (
            <Turn key={message.id} message={message} renderTool={renderTool} />
          ))}
        </Chat>
      </RuleGridCell>
      <RuleGridCell className="p-3">
        <Composer
          placeholder={composerPlaceholder(awaitingApproval, decision)}
          disabled={awaitingApproval || decision !== undefined}
          onSubmit={send}
        />
      </RuleGridCell>
    </RuleGrid>
  );
}

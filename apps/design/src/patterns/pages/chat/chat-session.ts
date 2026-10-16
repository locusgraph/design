"use client";

import type { AgentMessage, ApprovalDecision, ComposerStatus } from "@locusgraph/loop";
import { useEffect, useRef, useState } from "react";
import {
  assistantMessage,
  decisionReply,
  isAwaitingApproval,
  settleApproval,
  userMessage,
} from "./chat-data";

const replyDelayMs = 1400;

export function useChatSession(initialMessages: AgentMessage[]) {
  const [messages, setMessages] = useState(initialMessages);
  const [decision, setDecision] = useState<ApprovalDecision>();
  const [status, setStatus] = useState<ComposerStatus>("ready");
  const pendingReply = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(pendingReply.current), []);

  const streamReply = (text: string) => {
    setStatus("streaming");
    clearTimeout(pendingReply.current);
    pendingReply.current = setTimeout(() => {
      setMessages((current) => [...current, assistantMessage(`msg_${current.length + 1}`, text)]);
      setStatus("ready");
    }, replyDelayMs);
  };

  const send = (text: string) => {
    setMessages((current) => [...current, userMessage(`msg_${current.length + 1}`, text)]);
    streamReply("Noted. The archive run is finished, so there is nothing else queued.");
  };

  const decide = (next: ApprovalDecision) => {
    setDecision(next);
    setMessages((current) => current.map((message) => settleApproval(message, next)));
    streamReply(decisionReply(next));
  };

  const stop = () => {
    clearTimeout(pendingReply.current);
    setStatus("ready");
  };

  return {
    messages,
    decision,
    status,
    awaitingApproval: isAwaitingApproval(messages),
    send,
    decide,
    stop,
  };
}

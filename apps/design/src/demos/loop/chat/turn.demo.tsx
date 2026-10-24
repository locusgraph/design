import { Avatar, AvatarFallback } from "@locusgraph/components";
import { type AgentMessage, Turn } from "@locusgraph/loop";
import { defineDemo, select } from "../../../registry/define-demo";

const roles = ["assistant", "user"] as const;

const userMessage: AgentMessage = {
  id: "msg_user",
  role: "user",
  parts: [
    { type: "text", text: "Which memories did the support agent use for ticket #4821?" },
    {
      type: "file",
      mediaType: "text/csv",
      url: "https://files.locusgraph.com/ticket-4821.csv",
      filename: "ticket-4821.csv",
    },
  ],
};

const assistantMessage: AgentMessage = {
  id: "msg_assistant",
  role: "assistant",
  parts: [
    {
      type: "reasoning",
      text: "Look up the ticket, then recall memories scoped to that customer.",
      durationMs: 2400,
    },
    {
      type: "tool-recall_memory",
      toolCallId: "call_recall",
      state: "output-available",
      input: { agent: "support-agent", query: "ticket 4821" },
    },
    {
      type: "text",
      text: "It used **3 memories**: the refund policy, the customer's plan (Pro), and a note that they prefer email.",
    },
    {
      type: "source-url",
      sourceId: "mem_refunds",
      url: "https://app.locusgraph.com/memories/mem_refunds",
      title: "Refund policy",
    },
  ],
};

const messages = { assistant: assistantMessage, user: userMessage };

function Pair() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Turn message={userMessage} />
      <Turn
        message={assistantMessage}
        avatar={
          <Avatar className="size-8">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
        }
      />
    </div>
  );
}

function CustomTool() {
  return (
    <Turn
      className="w-full max-w-xl"
      message={assistantMessage}
      renderTool={(part) => (
        <span className="font-mono text-xs text-muted-foreground">
          {part.type} · {part.state}
        </span>
      )}
    />
  );
}

export default defineDemo({
  title: "Turn",
  description:
    "One `AgentMessage` with its parts in order. User text is a compact muted block on the right; assistant text is unboxed prose at a comfortable reading width. Thinking, tool calls and sources use the rich components unless you pass a render prop.",
  controls: { role: select(roles) },
  playground: ({ role }) => <Turn className="w-full max-w-xl" message={messages[role]} />,
  code: () => "<Turn message={message} />",
  props: [
    { name: "message", type: "AgentMessage" },
    { name: "avatar", type: "ReactNode" },
    { name: "footer", type: "ReactNode" },
    { name: "renderReasoning", type: "(part: ReasoningPart) => ReactNode" },
    { name: "renderTool", type: "(part: ToolPart) => ReactNode" },
    { name: "renderSources", type: "(parts: SourceUrlPart[]) => ReactNode" },
  ],
  examples: {
    Pair: {
      description: "A question and its answer, with an avatar on the assistant.",
      component: Pair,
    },
    CustomTool: {
      description: "`renderTool` replaces the plain tool row with your own.",
      component: CustomTool,
    },
  },
  isNew: true,
});

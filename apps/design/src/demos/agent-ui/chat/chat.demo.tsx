import { type AgentMessage, ChatMessage, Conversation, PromptInput } from "@locusgraph/agent-ui";
import { useState } from "react";
import { defineDemo, toggle } from "../../../registry/define-demo";

const thread: AgentMessage[] = [
  {
    id: "msg_1",
    role: "user",
    parts: [{ type: "text", text: "How much did the research agent cost this week?" }],
  },
  {
    id: "msg_2",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "**$42.18** across 318 runs. Most of it was on Tuesday, when it re-summarised the same 12 papers.",
      },
    ],
  },
  {
    id: "msg_3",
    role: "user",
    parts: [{ type: "text", text: "Can it remember the summaries instead?" }],
  },
  {
    id: "msg_4",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Yes. Store each summary in LocusGraph with the paper id, then recall it before summarising. That would have saved about **$31** this week.",
      },
    ],
  },
];

const emptyState = (
  <div className="flex flex-col items-center gap-1">
    <span className="eyebrow">New conversation</span>
    <p className="text-sm text-muted-foreground">Ask what your agents remember or spend.</p>
  </div>
);

function Live() {
  const [messages, setMessages] = useState(thread);
  return (
    <div className="flex h-96 w-full max-w-xl flex-col border bg-background">
      <Conversation empty={emptyState}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </Conversation>
      <PromptInput
        className="border-t ring-0 focus-within:ring-1 focus-within:ring-inset"
        onSubmit={(text) =>
          setMessages((current) => [
            ...current,
            { id: `msg_${current.length + 1}`, role: "user", parts: [{ type: "text", text }] },
          ])
        }
      />
    </div>
  );
}

export default defineDemo({
  title: "Conversation",
  description:
    "The scrolling thread. It stays on the newest message while you are at the bottom and shows a Jump to latest pill when you scroll up. With no messages it shows the empty slot.",
  controls: { empty: toggle(false) },
  playground: ({ empty }) => (
    <div className="flex h-80 w-full max-w-xl flex-col border bg-background">
      <Conversation empty={emptyState}>
        {empty ? null : thread.map((message) => <ChatMessage key={message.id} message={message} />)}
      </Conversation>
    </div>
  ),
  code: () =>
    "<Conversation empty={<EmptyState />}>\n  {messages.map((message) => (\n    <ChatMessage key={message.id} message={message} />\n  ))}\n</Conversation>",
  props: [
    { name: "children", type: "ReactNode" },
    { name: "empty", type: "ReactNode" },
    { name: "label", type: "string", defaultValue: "Conversation" },
    { name: "jumpLabel", type: "string", defaultValue: "Jump to latest" },
  ],
  examples: {
    Live: {
      description: "A thread with a composer; sending pins the view to the new message.",
      component: Live,
    },
  },
  previewHeight: "tall",
  isNew: true,
});

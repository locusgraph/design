import { ChatPage } from "../../../patterns/pages/chat-page";
import source from "../../../patterns/pages/chat-page.tsx?raw";
import { defineDemo, toggle } from "../../../registry/define-demo";
import { PatternRules } from "./pattern-rules";

const rules = [
  "Turns render every part; `renderTool` swaps a write tool for an `Approval`.",
  "Read tools run without asking; write tools wait for Approve or Deny.",
  "The Composer is pinned below the chat and disabled while an approval is open.",
  "A Pulse shows while the agent streams; the Composer offers Stop.",
  "Cost and Context live in a right rail, hidden below lg.",
];

function Rules() {
  return <PatternRules rules={rules} />;
}

export default defineDemo({
  title: "Chat Page",
  description:
    "An agent chat screen from @locusgraph/loop: turns with thinking, a finished read tool and a write tool waiting for approval, a pinned composer and a cost rail. Approve or deny to see the run finish.",
  controls: { rail: toggle(true) },
  playground: ({ rail }) => (
    <div className="w-[56rem] max-w-full">
      <ChatPage showRail={rail} />
    </div>
  ),
  code: () => source,
  props: [
    { name: "initialMessages", type: "AgentMessage[]", defaultValue: "sampleMessages" },
    { name: "usage", type: "RunUsage[]", defaultValue: "sampleUsage" },
    { name: "usedTokens", type: "number", defaultValue: "40300" },
    { name: "limitTokens", type: "number", defaultValue: "200000" },
    { name: "showRail", type: "boolean", defaultValue: "true" },
    { name: "className", type: "string" },
  ],
  examples: {
    Rules: { description: "The rules this pattern follows.", component: Rules },
  },
  isNew: true,
});

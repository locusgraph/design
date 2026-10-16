# @locusgraph/agent-ui

Agent UI for LocusGraph apps: chat, what the agent is doing, human-in-the-loop approvals, memory and cost. Components take data and callbacks only and never call a model. Message shapes follow the Vercel AI SDK `UIMessage` parts, so `useChat()` output can be passed straight in.

```bash
pnpm add @locusgraph/agent-ui @locusgraph/components
```

```css
@import "@locusgraph/components/theme.css";
@import "@locusgraph/agent-ui/sources.css";
```

```tsx
import { ChatMessage, Conversation, PromptInput } from "@locusgraph/agent-ui";

<Conversation>
  {messages.map((message) => (
    <ChatMessage key={message.id} message={message} />
  ))}
</Conversation>
<PromptInput status={status} onSubmit={(text) => sendMessage({ text })} onStop={stop} />
```

| Group | Components |
|---|---|
| Chat | `Conversation`, `ChatMessage`, `Response`, `PromptInput`, `Attachments` |
| Thread | `Suggestions`, `MessageActions`, `ThreadList`, `CodeBlock`, `Artifact` |
| Agent | `Reasoning`, `Steps`, `ToolCall`, `Loader` |
| Human in the loop | `ToolApproval`, `ToolArgsEditor`, `PlanApproval`, `AgentQuestion`, `SpendApproval`, `MemoryReview`, `RunControls`, `ApprovalInbox` |
| Memory | `InlineCitation`, `Sources`, `MemoryRecall`, `MemoryWrite` |
| Cost | `ContextMeter`, `RunCost`, `StepCostTimeline`, `ModelSelector` |

`ChatMessage` renders reasoning, tool and source parts with `Reasoning`, `ToolCall` and `Sources`; pass `renderReasoning`, `renderTool` or `renderSources` to replace them. A tool part in the `approval-requested` state is where `ToolApproval` goes: wire its `onApprove` and `onDeny` to the AI SDK's tool approval response.

Approvals follow one rule: tools that only read run without asking; tools that write, pay, send or delete pause and show exactly what is being approved, with stronger warnings for destructive ones. Money is integer micro-USD, formatted with `@locusgraph/utils`.

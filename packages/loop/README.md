# @locusgraph/loop

Loop is the agent kit for LocusGraph apps: chat, what the agent is doing, human-in-the-loop approvals, memory and cost. Components take data and callbacks only and never call a model. Message shapes follow the Vercel AI SDK `UIMessage` parts, so `useChat()` output can be passed straight in.

```bash
pnpm add @locusgraph/loop @locusgraph/components
```

```css
@import "@locusgraph/components/theme.css";
@import "@locusgraph/loop/sources.css";
```

```tsx
import { Chat, Composer, Turn } from "@locusgraph/loop";

<Chat>
  {messages.map((message) => (
    <Turn key={message.id} message={message} />
  ))}
</Chat>
<Composer status={status} onSubmit={(text) => sendMessage({ text })} onStop={stop} />
```

| Group | Components |
|---|---|
| Chat | `Chat`, `Turn`, `Reply`, `Composer`, `Files` |
| Thread | `Starters`, `Actions`, `History`, `Code`, `Canvas` |
| Agent | `Thinking`, `Steps`, `Tool`, `Pulse` |
| Human in the loop | `Approval`, `ArgsEditor`, `PlanReview`, `Question`, `SpendGate`, `MemoryReview`, `RunBar`, `Inbox` |
| Memory | `Cite`, `Sources`, `Recall`, `Memorized` |
| Cost | `Context`, `Cost`, `CostSteps`, `ModelPicker` |

`Turn` renders reasoning, tool and source parts with `Thinking`, `Tool` and `Sources`; pass `renderReasoning`, `renderTool` or `renderSources` to replace them. A tool part in the `approval-requested` state is where `Approval` goes: wire its `onApprove` and `onDeny` to the AI SDK's tool approval response.

Approvals follow one rule: tools that only read run without asking; tools that write, pay, send or delete pause and show exactly what is being approved, with stronger warnings for destructive ones. Money is integer micro-USD, formatted with `@locusgraph/utils`.

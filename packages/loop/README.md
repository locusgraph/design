# @locusgraph/loop

<img alt="Locus Design: design that keeps humans in the loop" src="https://raw.githubusercontent.com/locusgraph/design/master/.github/assets/hero-light.png">

[![npm](https://img.shields.io/npm/v/@locusgraph/loop?color=111111&style=flat-square)](https://www.npmjs.com/package/@locusgraph/loop) [![MIT license](https://img.shields.io/badge/license-MIT-111111?style=flat-square)](https://github.com/locusgraph/design/blob/master/LICENSE)

[Docs](https://design.locusgraph.com/human-in-the-loop) · [Source](https://github.com/locusgraph/design/tree/master/packages/loop) · [All packages](https://github.com/locusgraph/design#packages)

Loop is the agent kit from Locus Design: chat, what the agent is doing, human-in-the-loop approvals, memory and cost. Components take data and callbacks only and never call a model. Message shapes follow the Vercel AI SDK `UIMessage` parts, so `useChat()` output can be passed straight in.

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

`Chat`, `History` and `Inbox` virtualize with TanStack Virtual above 50 items: only the rows near the viewport are mounted, so a long agent session stays fast. Pass `virtualize={false}` to mount every item. The built package is compiled with the React Compiler, so components skip re-rendering when their props have not changed.

| Group | Components |
|---|---|
| Chat | `Chat`, `Turn`, `Reply`, `Composer`, `Files` |
| Thread | `Starters`, `Actions`, `History`, `Code`, `Canvas` |
| Agent | `Thinking`, `Steps`, `Tool`, `Pulse` |
| Human in the loop | `Approval`, `ArgsEditor`, `PlanReview`, `Question`, `SpendGate`, `MemoryReview`, `RunBar`, `Inbox`, `ApprovalGate` with `useApprovalGate`, `DecisionLog` |
| Memory | `Cite`, `Sources`, `Recall`, `Memorized` |
| Cost | `Context`, `Cost`, `CostSteps`, `ModelPicker` |

`Turn` renders reasoning, tool and source parts with `Thinking`, `Tool` and `Sources`; pass `renderReasoning`, `renderTool` or `renderSources` to replace them. Data parts (`data-*`, such as a json-render `data-spec`) render only through `renderData`; without it they are skipped. A tool part in the `approval-requested` state is where `Approval` goes: wire its `onApprove` and `onDeny` to the AI SDK's tool approval response.

Approvals follow one rule: tools that only read run without asking; tools that write, pay, send or delete pause and show exactly what is being approved, with stronger warnings for destructive ones. Money is integer micro-USD, formatted with `@locusgraph/utils`.

`Approval` takes `changes` to show what an action will change, before and after, and `onAllowForRun` to stop asking for that tool for the rest of the run (never offered for destructive tools). `useApprovalGate` puts an approval in front of any action, including a button a model generated: `await gate.ask({ toolName, risk, input })` settles when a person decides, `<ApprovalGate gate={gate} />` renders it, and `gate.log` feeds `<DecisionLog />`.

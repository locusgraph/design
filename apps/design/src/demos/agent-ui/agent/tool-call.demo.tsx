import type { ToolPart } from "@locusgraph/agent-ui";
import { ToolCall } from "@locusgraph/agent-ui";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const toolStates = [
  "input-streaming",
  "input-available",
  "approval-requested",
  "approval-responded",
  "output-available",
  "output-error",
  "output-denied",
] as const;

const search: ToolPart = {
  type: "tool-memory.search",
  toolCallId: "call_8f2a",
  state: "output-available",
  input: { graphId: "graph_acme", query: "who owns billing", limit: 3 },
  output: {
    hits: [
      { id: "mem_41", label: "Dana Reyes owns billing", relevance: 0.92 },
      { id: "mem_17", label: "Invoices go to finance@acme.com", relevance: 0.81 },
    ],
  },
};

function partFor(state: (typeof toolStates)[number]): ToolPart {
  return {
    ...search,
    state,
    output: state === "output-available" ? search.output : undefined,
    errorText: state === "output-error" ? "memory.search timed out after 30s" : undefined,
  };
}

function WaitingForApproval() {
  return (
    <div className="w-full max-w-xl">
      <ToolCall
        defaultOpen
        part={{
          type: "dynamic-tool",
          toolName: "graph.write",
          toolCallId: "call_c19d",
          state: "approval-requested",
          input: { graphId: "graph_acme", node: { kind: "note", text: "Renewal in November" } },
        }}
      />
    </div>
  );
}

export default defineDemo({
  title: "Tool Call",
  description:
    "One tool call as a single ruled row: the tool name, a status dot and word for each state, and its input and output as JSON when opened. Errors show in red without opening.",
  controls: { state: select(toolStates, "output-available"), open: toggle(true) },
  playground: ({ state, open }) => (
    <div className="w-full max-w-xl">
      <ToolCall key={`${state}-${open}`} part={partFor(state)} defaultOpen={open} />
    </div>
  ),
  code: ({ open }) => `<ToolCall part={part}${open ? " defaultOpen" : ""} />`,
  props: [
    { name: "part", type: "ToolPart" },
    { name: "defaultOpen", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    WaitingForApproval: {
      description: "A dynamic tool takes its name from toolName.",
      component: WaitingForApproval,
    },
  },
  isNew: true,
});

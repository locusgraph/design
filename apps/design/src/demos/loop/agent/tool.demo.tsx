import type { ToolPart } from "@locusgraph/loop";
import { Tool } from "@locusgraph/loop";
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

function Default() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-1">
      <Tool part={search} />
      <Tool part={search} verb="Searched memory for" target="who owns billing" />
      <Tool part={search} tone="memory" verb="Searched memory for" target="who owns billing" />
    </div>
  );
}

function WaitingForApproval() {
  return (
    <div className="w-full max-w-xl">
      <Tool
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
  title: "Tool",
  description:
    "One tool call as a quiet line of text: a muted verb and the thing it acted on. A running call shimmers; a waiting, failed or denied call leads with a colored word; a finished call shows nothing extra. Input and output open as indented JSON. Errors show in red without opening.",
  controls: { state: select(toolStates, "output-available"), open: toggle(false) },
  playground: ({ state, open }) => (
    <div className="w-full max-w-xl">
      <Tool
        key={`${state}-${open}`}
        part={partFor(state)}
        tone="memory"
        verb="Searched memory for"
        activeVerb="Searching memory for"
        target="who owns billing"
        defaultOpen={open}
      />
    </div>
  ),
  code: ({ open }) =>
    `<Tool\n  part={part}\n  tone="memory"\n  verb="Searched memory for"\n  activeVerb="Searching memory for"\n  target={part.input.query}${open ? "\n  defaultOpen" : ""}\n/>`,
  props: [
    { name: "part", type: "ToolPart" },
    { name: "tone", type: '"default" | "memory"', defaultValue: '"default"' },
    { name: "verb", type: "string", defaultValue: '"Ran"' },
    { name: "activeVerb", type: "string", defaultValue: '"Running"' },
    { name: "target", type: "ReactNode", defaultValue: "tool name in words" },
    { name: "icon", type: "ReactNode" },
    { name: "defaultOpen", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    Default: {
      description:
        'Without a verb the line reads Ran and the tool name in words. With one it reads as what happened. tone="memory" marks LocusGraph memory tools in violet.',
      component: Default,
    },
    WaitingForApproval: {
      description: "A dynamic tool takes its name from `toolName`, in words: graph write.",
      component: WaitingForApproval,
    },
  },
  isNew: true,
});

import { Reasoning } from "@locusgraph/agent-ui";
import { defineDemo, select } from "../../../registry/define-demo";

const states = ["streaming", "done"] as const;

const thinking = `The user wants last month's spend for the ingestion graph.
I should search memory for the graph id first, then read the cost events for September.
Memory has "graph_ingest_prod" linked to the ingestion pipeline, so I will use that.`;

function OpenWhenDone() {
  return (
    <div className="w-full max-w-xl">
      <Reasoning text={thinking} state="done" durationMs={12_400} defaultOpen />
    </div>
  );
}

function LongThought() {
  return (
    <div className="w-full max-w-xl">
      <Reasoning text={thinking} state="done" durationMs={95_000} />
    </div>
  );
}

export default defineDemo({
  title: "Reasoning",
  description:
    "The agent's thinking behind a quiet trigger line. Open with a shimmering label while it streams, then closes to how long it took and the first line, unless the user opened it.",
  controls: { state: select(states) },
  playground: ({ state }) => (
    <div className="w-full max-w-xl">
      <Reasoning text={thinking} state={state} durationMs={4_000} />
    </div>
  ),
  code: ({ state }) =>
    `<Reasoning text={part.text} state="${state}"${state === "done" ? " durationMs={4000}" : ""} />`,
  props: [
    { name: "text", type: "string" },
    { name: "state", type: '"streaming" | "done"' },
    { name: "durationMs", type: "number" },
    { name: "defaultOpen", type: "boolean", defaultValue: "true while streaming" },
  ],
  examples: {
    OpenWhenDone: {
      description: "defaultOpen keeps the full thought visible after it finishes.",
      component: OpenWhenDone,
    },
    LongThought: {
      description: "Durations over a minute read in minutes and seconds.",
      component: LongThought,
    },
  },
  isNew: true,
});

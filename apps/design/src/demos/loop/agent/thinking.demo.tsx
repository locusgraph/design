import { Thinking } from "@locusgraph/loop";
import { defineDemo, select } from "../../../registry/define-demo";

const states = ["streaming", "done"] as const;

const thinking = `The user wants last month's spend for the ingestion graph.
I should search memory for the graph id first, then read the cost events for September.
Memory has "graph_ingest_prod" linked to the ingestion pipeline, so I will use that.`;

function OpenWhenDone() {
  return (
    <div className="w-full max-w-xl">
      <Thinking text={thinking} state="done" durationMs={12_400} defaultOpen />
    </div>
  );
}

function LongThought() {
  return (
    <div className="w-full max-w-xl">
      <Thinking text={thinking} state="done" durationMs={95_000} />
    </div>
  );
}

export default defineDemo({
  title: "Thinking",
  description:
    "The agent's thinking as one quiet line of text. Open with a shimmering label while it streams, then closes to how long it took with the first line in faint text beside it, unless the user opened it.",
  controls: { state: select(states) },
  playground: ({ state }) => (
    <div className="w-full max-w-xl">
      <Thinking text={thinking} state={state} durationMs={4_000} />
    </div>
  ),
  code: ({ state }) =>
    `<Thinking\n  text={part.text}\n  state="${state}"${state === "done" ? "\n  durationMs={4000}" : ""}\n/>`,
  props: [
    { name: "text", type: "string" },
    { name: "state", type: '"streaming" | "done"' },
    { name: "durationMs", type: "number" },
    { name: "defaultOpen", type: "boolean", defaultValue: "true while streaming" },
  ],
  examples: {
    OpenWhenDone: {
      description: "`defaultOpen` keeps the full thought visible after it finishes.",
      component: OpenWhenDone,
    },
    LongThought: {
      description: "Durations over a minute read in minutes and seconds.",
      component: LongThought,
    },
  },
  isNew: true,
});

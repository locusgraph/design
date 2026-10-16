import type { AgentStep } from "@locusgraph/loop";
import { Steps } from "@locusgraph/loop";
import { defineDemo, select } from "../../../registry/define-demo";

const progress = ["running", "failed", "finished"] as const;

const planned: AgentStep[] = [
  {
    id: "recall",
    title: "Recall what we know about Acme",
    status: "done",
    detail: "memory.search",
  },
  { id: "read", title: "Read the Acme account graph", status: "done", detail: "graph.read" },
  { id: "spend", title: "Sum September spend", status: "running", detail: "spend.query" },
  { id: "write", title: "Write the summary to the graph", status: "pending" },
  { id: "notify", title: "Notify the account owner", status: "pending" },
];

function stepsFor(stage: (typeof progress)[number]): AgentStep[] {
  if (stage === "finished") {
    return planned.map((step) =>
      step.id === "notify" ? { ...step, status: "skipped" } : { ...step, status: "done" }
    );
  }
  if (stage === "failed") {
    return planned.map((step) =>
      step.id === "spend" ? { ...step, status: "failed", detail: "Spend API returned 503" } : step
    );
  }
  return planned;
}

function Pending() {
  return (
    <div className="w-full max-w-xl">
      <Steps
        title="Next up"
        steps={planned.map((step) => ({ ...step, status: "pending", detail: undefined }))}
      />
    </div>
  );
}

export default defineDemo({
  title: "Steps",
  description:
    "The agent's plan as a vertical timeline. Each step has a status mark (hollow pending with the next one outlined, amber spinner, green check, red cross) and the header counts what is done.",
  controls: { progress: select(progress) },
  playground: ({ progress: stage }) => (
    <div className="w-full max-w-xl">
      <Steps title="Plan" steps={stepsFor(stage)} />
    </div>
  ),
  code: () => `<Steps title="Plan" steps={steps} />`,
  props: [
    { name: "steps", type: "AgentStep[]" },
    { name: "title", type: "string", defaultValue: '"Plan"' },
  ],
  examples: {
    Pending: {
      description: "Before the agent starts, the first step is current.",
      component: Pending,
    },
  },
  isNew: true,
});

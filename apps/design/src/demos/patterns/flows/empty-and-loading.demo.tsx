import { EmptyAndLoading, type ListState } from "../../../patterns/flows/empty-and-loading";
import source from "../../../patterns/flows/empty-and-loading.tsx?raw";
import { defineDemo, select } from "../../../registry/define-demo";
import { PatternRules } from "./pattern-rules";

const states = ["ready", "loading", "empty", "error"] as const satisfies readonly ListState[];

const rules = [
  "One section, four states, driven by a single state prop.",
  "The skeleton matches the real row layout, so nothing jumps when data arrives.",
  "The empty state has exactly one action, and it is the primary one.",
  "Errors say what happened and what to do, with a Retry button right there.",
  "The header strip and its count stay put across every state.",
];

function Rules() {
  return <PatternRules rules={rules} />;
}

function AllStates() {
  return (
    <div className="flex w-[40rem] max-w-full flex-col gap-6">
      {states.map((state) => (
        <EmptyAndLoading key={state} state={state} />
      ))}
    </div>
  );
}

export default defineDemo({
  title: "Empty and Loading",
  description:
    "One data list with its loading, empty, error and ready states. Copy it for any list that fetches.",
  controls: {
    state: select(states, "loading"),
  },
  playground: ({ state }) => (
    <div className="w-[40rem] max-w-full">
      <EmptyAndLoading state={state} />
    </div>
  ),
  code: () => source,
  props: [
    { name: "state", type: '"loading" | "empty" | "ready" | "error"', defaultValue: '"ready"' },
    { name: "rows", type: "GraphRow[]", defaultValue: "sampleGraphRows" },
    { name: "errorMessage", type: "string" },
    { name: "onRetry", type: "() => void" },
    { name: "onCreate", type: "() => void" },
  ],
  examples: {
    Rules: { description: "The rules this pattern follows.", component: Rules },
    AllStates: { description: "Every state, stacked for comparison.", component: AllStates },
  },
  isNew: true,
});

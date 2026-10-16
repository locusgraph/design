import { type CostStep, StepCostTimeline } from "@locusgraph/agent-ui";
import { defineDemo, toggle } from "../../../registry/define-demo";

const steps: CostStep[] = [
  {
    id: "step_plan",
    title: "Plan the answer",
    status: "done",
    usage: { inputTokens: 2_140, outputTokens: 310, costMicroUsd: 11_070 },
    durationMs: 1_840,
  },
  {
    id: "step_recall",
    title: "Recall memories",
    status: "done",
    usage: { inputTokens: 6_800, outputTokens: 120, costMicroUsd: 22_200 },
    durationMs: 640,
  },
  {
    id: "step_invoices",
    title: "Fetch invoices",
    status: "failed",
    usage: { inputTokens: 9_420, outputTokens: 0, costMicroUsd: 28_260, failed: true },
    durationMs: 30_000,
  },
  {
    id: "step_invoices_retry",
    title: "Fetch invoices",
    status: "retried",
    usage: { inputTokens: 9_610, outputTokens: 860, costMicroUsd: 41_730 },
    durationMs: 4_210,
  },
  {
    id: "step_answer",
    title: "Write the answer",
    status: "done",
    usage: { inputTokens: 14_300, outputTokens: 1_284, costMicroUsd: 62_160 },
    durationMs: 6_020,
  },
];

export default defineDemo({
  title: "Step Cost Timeline",
  description:
    "What each step of a run cost, as ruled rows with a bar proportional to cost. The total leads; tokens, time and money wasted on failed steps follow.",
  controls: { withFailure: toggle(true) },
  playground: ({ withFailure }) => (
    <div className="w-[36rem] max-w-full">
      <StepCostTimeline
        steps={withFailure ? steps : steps.filter((step) => step.status !== "failed")}
      />
    </div>
  ),
  code: () => `<StepCostTimeline steps={run.steps} />`,
  props: [
    { name: "steps", type: "CostStep[]" },
    { name: "label", type: "string", defaultValue: "Cost by step" },
    { name: "emptyText", type: "string", defaultValue: "No steps have run yet." },
  ],
  examples: {},
  isNew: true,
});

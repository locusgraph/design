import { PlanApproval } from "@locusgraph/agent-ui";
import { defineDemo, toggle } from "../../../registry/define-demo";

const steps = [
  { id: "s1", title: "Read the acme-customers graph", detail: "18,204 nodes, read only" },
  { id: "s2", title: "Find duplicate customers by email and domain" },
  { id: "s3", title: "Merge 142 duplicate pairs", detail: "Writes to acme-customers" },
  { id: "s4", title: "Email the merge report to ops@acme.dev" },
];

function Cancelled() {
  return (
    <div className="w-full max-w-xl">
      <PlanApproval
        steps={steps}
        decision={{ approved: false, by: "Ravi Patel", at: Date.UTC(2026, 9, 17, 9, 5) }}
        onApprove={() => {}}
        onCancel={() => {}}
      />
    </div>
  );
}

export default defineDemo({
  title: "Plan Approval",
  description:
    "Shows a multi-step plan before the run starts. People can rename, reorder or remove steps, then approve the edited plan.",
  controls: { decided: toggle(false) },
  playground: ({ decided }) => (
    <div className="w-full max-w-xl">
      <PlanApproval
        steps={steps}
        autoFocus={false}
        decision={
          decided ? { approved: true, by: "Maya Chen", at: Date.UTC(2026, 9, 17, 9, 5) } : undefined
        }
        onApprove={() => {}}
        onCancel={() => {}}
      />
    </div>
  ),
  code: () =>
    "<PlanApproval\n  steps={plan.steps}\n  decision={plan.decision}\n  onApprove={(steps) => startRun(steps)}\n  onCancel={cancelRun}\n/>",
  props: [
    { name: "steps", type: "{ id: string; title: string; detail?: string }[]" },
    { name: "title", type: "string", defaultValue: '"Review the plan"' },
    { name: "description", type: "string" },
    { name: "actionLabel", type: "string", defaultValue: '"Run <n> steps"' },
    { name: "decision", type: "ApprovalDecision" },
    { name: "onApprove", type: "(steps: PlanStepDraft[]) => void" },
    { name: "onCancel", type: "() => void" },
  ],
  examples: {
    Cancelled: {
      description: "A cancelled plan keeps its steps for the record.",
      component: Cancelled,
    },
  },
  isNew: true,
});

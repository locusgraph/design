import { SpendApproval } from "@locusgraph/agent-ui";
import { defineDemo, select } from "../../../registry/define-demo";

const situationOptions = ["over-cap", "out-of-credits"] as const;

const balances = { "over-cap": 18_400_000, "out-of-credits": 210_000 } as const;

function Allowed() {
  return (
    <div className="w-full max-w-xl">
      <SpendApproval
        runName="Q4 vendor reconciliation"
        spentMicroUsd={4_120_000}
        estimateMicroUsd={1_350_000}
        capMicroUsd={5_000_000}
        balanceMicroUsd={18_400_000}
        decision={{ approved: true, by: "Maya Chen", at: Date.UTC(2026, 9, 17, 16, 2) }}
        onAllowOnce={() => {}}
        onRaiseCap={() => {}}
        onStop={() => {}}
      />
    </div>
  );
}

export default defineDemo({
  title: "Spend Approval",
  description:
    "SpendGraph pauses a run that would pass its cost cap (amber) or run out of prepaid credits (red). Allow the next step once, raise the cap, or stop.",
  controls: { situation: select(situationOptions, "over-cap") },
  playground: ({ situation }) => (
    <div className="w-full max-w-xl">
      <SpendApproval
        runName="Q4 vendor reconciliation"
        spentMicroUsd={4_120_000}
        estimateMicroUsd={1_350_000}
        capMicroUsd={5_000_000}
        balanceMicroUsd={balances[situation]}
        autoFocus={false}
        onAllowOnce={() => {}}
        onRaiseCap={() => {}}
        onStop={() => {}}
        onBuyCredits={() => {}}
      />
    </div>
  ),
  code: () =>
    "<SpendApproval\n  spentMicroUsd={run.spentMicroUsd}\n  estimateMicroUsd={run.nextStepMicroUsd}\n  capMicroUsd={run.capMicroUsd}\n  balanceMicroUsd={wallet.balanceMicroUsd}\n  onAllowOnce={allowOnce}\n  onRaiseCap={(capMicroUsd) => raiseCap(run.id, capMicroUsd)}\n  onStop={stopRun}\n  onBuyCredits={openCheckout}\n/>",
  props: [
    { name: "spentMicroUsd", type: "number" },
    { name: "estimateMicroUsd", type: "number" },
    { name: "capMicroUsd", type: "number" },
    { name: "balanceMicroUsd", type: "number" },
    { name: "runName", type: "string" },
    { name: "decision", type: "ApprovalDecision" },
    { name: "onAllowOnce", type: "() => void" },
    { name: "onRaiseCap", type: "(newCapMicroUsd: number) => void" },
    { name: "onStop", type: "() => void" },
    { name: "onBuyCredits", type: "() => void" },
  ],
  examples: {
    Allowed: {
      description: "A decision collapses to who decided, with the spend kept as a muted meter.",
      component: Allowed,
    },
  },
  isNew: true,
});

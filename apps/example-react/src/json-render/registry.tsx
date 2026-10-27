import { defineRegistry } from "@json-render/react";
import { locusRenderers } from "@locusgraph/json-render";
import type { ApprovalDecision, ApprovalRequest } from "@locusgraph/loop";
import { buyCreditsApproval, keyApproval, type Picked, planApproval } from "./approvals";
import { catalog } from "./catalog";

export type AskApproval = (request: ApprovalRequest) => Promise<ApprovalDecision>;

function outcome(decision: ApprovalDecision, done: string) {
  if (decision.approved) return `${done}, approved by ${decision.by}`;
  return `Not run, denied by ${decision.by}${decision.reason ? `: ${decision.reason}` : ""}`;
}

export function createBillingRegistry(ask: AskApproval) {
  return defineRegistry(catalog, {
    components: { ...locusRenderers },
    actions: {
      buyCredits: async (_params, setState, state) => {
        const packId = String(state.selectedPackId);
        const decision = await ask(buyCreditsApproval(packId));
        setState((previous) => ({
          ...previous,
          lastAction: outcome(decision, `Checkout opened for ${packId}`),
        }));
      },
      planAction: async (_params, setState, state) => {
        const picked = state.picked as Picked;
        const decision = await ask(planApproval(picked));
        setState((previous) => ({
          ...previous,
          lastAction: outcome(decision, `Plan changed to ${picked.target}`),
        }));
      },
      keyAction: async (_params, setState, state) => {
        const picked = state.picked as Picked;
        const decision = await ask(keyApproval(picked));
        setState((previous) => ({
          ...previous,
          lastAction: outcome(decision, `${picked.actionId} ran on ${picked.target}`),
        }));
      },
    },
  });
}

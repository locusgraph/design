import { defineCatalog } from "@json-render/core";
import { defineRegistry } from "@json-render/react";
import { schema } from "@json-render/react/schema";
import { locusComponents, locusRenderers } from "@locusgraph/json-render";
import type { ApprovalDecision, ApprovalRequest } from "@locusgraph/loop";

export type AskApproval = (request: ApprovalRequest) => Promise<ApprovalDecision>;

type Picked = { actionId: string; target: string };

export const catalog = defineCatalog(schema, {
  components: { ...locusComponents },
  actions: {
    buyCredits: { description: "Open checkout for the pack at /selectedPackId" },
    pickedAction: { description: "Run the plan or key action at /picked" },
  },
});

function outcome(decision: ApprovalDecision, done: string) {
  return decision.approved ? `${done}, approved by ${decision.by}` : `Denied by ${decision.by}`;
}

export function createGatedRegistry(ask: AskApproval) {
  return defineRegistry(catalog, {
    components: { ...locusRenderers },
    actions: {
      buyCredits: async (_params, setState, state) => {
        const pack = String(state.selectedPackId);
        const decision = await ask({
          toolName: "buy_credits",
          risk: "write",
          input: { pack },
          title: `Buy ${pack}`,
          actionLabel: "Open checkout",
        });
        setState((previous) => ({ ...previous, lastAction: outcome(decision, `Bought ${pack}`) }));
      },
      pickedAction: async (_params, setState, state) => {
        const { actionId, target } = state.picked as Picked;
        const decision = await ask({
          toolName: actionId,
          risk: actionId === "revoke" ? "destructive" : "write",
          input: { target },
          title: `${actionId} ${target}`,
        });
        setState((previous) => ({
          ...previous,
          lastAction: outcome(decision, `${actionId} ran on ${target}`),
        }));
      },
    },
  });
}

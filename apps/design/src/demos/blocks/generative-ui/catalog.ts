import { defineCatalog } from "@json-render/core";
import { defineRegistry } from "@json-render/react";
import { schema } from "@json-render/react/schema";
import { guardAction, locusComponents, locusRenderers } from "@locusgraph/json-render";
import type { ApprovalDecision, ApprovalRequest } from "@locusgraph/loop";

export type AskApproval = (request: ApprovalRequest) => Promise<ApprovalDecision>;

export const catalog = defineCatalog(schema, {
  components: { ...locusComponents },
  actions: {
    buyCredits: { description: "Open checkout for the pack at /selectedPackId" },
    pickedAction: { description: "Run the plan or key action at /picked" },
  },
});

const doneLabels: Record<string, (target: string) => string> = {
  buy: (pack) => `Checkout opened for ${pack}`,
  upgrade: (plan) => `Moved to ${plan}`,
  rotate: (key) => `Rotated ${key}`,
  revoke: (key) => `Revoked ${key}`,
};

function doneLabel(actionId: string, target: string) {
  return doneLabels[actionId]?.(target) ?? `${actionId} ran on ${target}`;
}

export function createGatedRegistry(ask: AskApproval) {
  const runAfterApproval = guardAction(async ({ actionId, target }) => {
    const decision = await ask({
      toolName: actionId === "buy" ? "buy_credits" : actionId,
      risk: actionId === "revoke" ? "destructive" : "write",
      input: { target },
      title: `${actionId} ${target}`,
    });
    return decision.approved ? `${doneLabel(actionId, target)} · ${decision.by}` : null;
  });
  return defineRegistry(catalog, {
    components: { ...locusRenderers },
    actions: { buyCredits: runAfterApproval, pickedAction: runAfterApproval },
  });
}

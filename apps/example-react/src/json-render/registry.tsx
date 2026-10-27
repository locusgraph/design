import { defineRegistry } from "@json-render/react";
import { guardAction, locusRenderers } from "@locusgraph/json-render";
import type { ApprovalDecision, ApprovalRequest } from "@locusgraph/loop";
import { buyCreditsApproval, keyApproval, planApproval } from "./approvals";
import { catalog } from "./catalog";

export type AskApproval = (request: ApprovalRequest) => Promise<ApprovalDecision>;

function approvedLabel(decision: ApprovalDecision, done: string) {
  return decision.approved ? `${done}, approved by ${decision.by}` : null;
}

export function createBillingRegistry(ask: AskApproval) {
  return defineRegistry(catalog, {
    components: { ...locusRenderers },
    actions: {
      buyCredits: guardAction(async (picked) =>
        approvedLabel(
          await ask(buyCreditsApproval(picked.target)),
          `Checkout opened for ${picked.target}`
        )
      ),
      planAction: guardAction(async (picked) =>
        approvedLabel(await ask(planApproval(picked)), `Plan changed to ${picked.target}`)
      ),
      keyAction: guardAction(async (picked) =>
        approvedLabel(await ask(keyApproval(picked)), `${picked.actionId} ran on ${picked.target}`)
      ),
    },
  });
}

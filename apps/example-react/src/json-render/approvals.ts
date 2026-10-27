import type { ApprovalRequest } from "@locusgraph/loop";
import { formatMicroUsd } from "@locusgraph/utils";
import { packs, plans, wallet } from "../sample-data";

export type Picked = { actionId: string; target: string };

const currentPlan = plans.find((plan) => plan.current)?.name ?? "Free";

export function buyCreditsApproval(packId: string): ApprovalRequest {
  const pack = packs.find((each) => each.id === packId);
  const amount = pack?.amountMicroUsd ?? 0;
  return {
    toolName: "buy_credits",
    risk: "write",
    input: { pack: packId },
    title: `Buy ${formatMicroUsd(amount)} in credits`,
    actionLabel: "Open checkout",
    changes: [
      {
        label: "Credits",
        before: formatMicroUsd(wallet.balanceMicroUsd),
        after: formatMicroUsd(wallet.balanceMicroUsd + amount),
      },
    ],
  };
}

export function planApproval({ actionId, target }: Picked): ApprovalRequest {
  const price = plans.find((plan) => plan.name === target)?.price ?? "";
  return {
    toolName: "update_plan",
    risk: "write",
    input: { action: actionId, plan: target },
    title: `Move to ${target}`,
    actionLabel: `Upgrade to ${target}`,
    description: "This changes the monthly bill.",
    changes: [
      { label: "Plan", before: currentPlan, after: target },
      { label: "Price", after: price },
    ],
  };
}

export function keyApproval({ actionId, target }: Picked): ApprovalRequest {
  const revoke = actionId === "revoke";
  return {
    toolName: `${actionId}_key`,
    risk: revoke ? "destructive" : "write",
    input: { key: target },
    title: `${revoke ? "Revoke" : "Rotate"} ${target}`,
    actionLabel: revoke ? "Revoke key" : "Rotate key",
    description: revoke
      ? "Apps using this key stop working at once."
      : "The old key keeps working for 24 hours.",
  };
}

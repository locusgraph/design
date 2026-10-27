import {
  Badge,
  RuleGrid,
  RuleGridCell,
  RuleGridFooter,
  RuleGridTitle,
} from "@locusgraph/components";
import type * as React from "react";
import { BlockActionOutcome, BlockActions } from "../actions/block-actions";
import type { BlockAction, PendingBlockAction, PlanOffer, SettledBlockAction } from "../types";
import { PlanPrice } from "./plan-price";

type PlansProps = {
  plans: PlanOffer[];
  actionFor?: (plan: PlanOffer) => React.ReactNode;
  actions?: BlockAction[];
  onAction?: (actionId: string, plan: PlanOffer) => void;
  pending?: PendingBlockAction;
  settled?: SettledBlockAction;
};

function planAction(
  { actionFor, actions, onAction, pending, settled }: Omit<PlansProps, "plans">,
  plan: PlanOffer
) {
  if (plan.current) return null;
  if (actionFor) return actionFor(plan);
  if (settled?.target === plan.name) return <BlockActionOutcome label={settled.label} />;
  if (!actions?.length) return null;
  return (
    <BlockActions
      actions={actions}
      defaultVariant="default"
      locked={Boolean(pending || settled)}
      pendingActionId={pending?.target === plan.name ? pending.actionId : undefined}
      onAction={onAction && ((actionId) => onAction(actionId, plan))}
    />
  );
}

export function Plans({ plans, actionFor, actions, onAction, pending, settled }: PlansProps) {
  return (
    <RuleGrid columns={plans.length >= 3 ? 3 : 2}>
      {plans.map((plan) => {
        const action = planAction({ actionFor, actions, onAction, pending, settled }, plan);
        return (
          <RuleGridCell key={plan.name} data-current={plan.current || undefined} className="gap-4">
            <div className="flex flex-col gap-2">
              <RuleGridTitle className="flex min-h-6 items-center gap-2">
                {plan.name}
                {plan.current && <Badge variant="secondary">Current</Badge>}
              </RuleGridTitle>
              <PlanPrice plan={plan} />
            </div>
            <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              {plan.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <RuleGridFooter className="mt-auto">
              {plan.current ? (
                <p className="flex min-h-control-sm items-center text-sm text-muted-foreground">
                  Your plan
                </p>
              ) : (
                action
              )}
            </RuleGridFooter>
          </RuleGridCell>
        );
      })}
    </RuleGrid>
  );
}

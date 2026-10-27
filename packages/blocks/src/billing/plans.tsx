import {
  Badge,
  RuleGrid,
  RuleGridCell,
  RuleGridFooter,
  RuleGridTitle,
} from "@locusgraph/components";
import type * as React from "react";
import { BlockActions } from "../actions/block-actions";
import type { BlockAction, PlanOffer } from "../types";
import { PlanPrice } from "./plan-price";

type PlansProps = {
  plans: PlanOffer[];
  actionFor?: (plan: PlanOffer) => React.ReactNode;
  actions?: BlockAction[];
  onAction?: (actionId: string, plan: PlanOffer) => void;
};

function planAction({ actionFor, actions, onAction }: Omit<PlansProps, "plans">, plan: PlanOffer) {
  if (plan.current) return null;
  if (actionFor) return actionFor(plan);
  if (!actions?.length) return null;
  return (
    <BlockActions
      actions={actions}
      defaultVariant="default"
      onAction={onAction && ((actionId) => onAction(actionId, plan))}
    />
  );
}

export function Plans({ plans, actionFor, actions, onAction }: PlansProps) {
  return (
    <RuleGrid columns={plans.length >= 3 ? 3 : 2}>
      {plans.map((plan) => {
        const action = planAction({ actionFor, actions, onAction }, plan);
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

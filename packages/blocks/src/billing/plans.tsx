import { Badge, RuleGrid, RuleGridCell, RuleGridTitle } from "@locusgraph/components";
import type * as React from "react";
import type { PlanOffer } from "../types";
import { PlanPrice } from "./plan-price";

type PlansProps = {
  plans: PlanOffer[];
  actionFor?: (plan: PlanOffer) => React.ReactNode;
};

export function Plans({ plans, actionFor }: PlansProps) {
  return (
    <RuleGrid columns={plans.length >= 3 ? 3 : 2}>
      {plans.map((plan) => {
        const action = plan.current ? null : actionFor?.(plan);
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
            {plan.current ? (
              <p className="mt-auto flex min-h-8 items-center text-sm text-muted-foreground">
                Your plan
              </p>
            ) : (
              action && <div className="mt-auto">{action}</div>
            )}
          </RuleGridCell>
        );
      })}
    </RuleGrid>
  );
}

import {
  Badge,
  RuleGrid,
  RuleGridCell,
  RuleGridDescription,
  RuleGridTitle,
} from "@locusgraph/components";
import type * as React from "react";
import type { PlanOffer } from "../types";

type PlanOptionsProps = {
  plans: PlanOffer[];
  actionFor?: (plan: PlanOffer) => React.ReactNode;
};

export function PlanOptions({ plans, actionFor }: PlanOptionsProps) {
  return (
    <RuleGrid columns={plans.length >= 3 ? 3 : 2}>
      {plans.map((plan) => {
        const action = plan.current ? null : actionFor?.(plan);
        return (
          <RuleGridCell key={plan.name} data-current={plan.current || undefined} className="gap-4">
            <div className="flex flex-col gap-1.5">
              <RuleGridTitle className="flex items-center gap-2">
                {plan.name}
                {plan.current && <Badge variant="secondary">Current</Badge>}
              </RuleGridTitle>
              <RuleGridDescription>{plan.price}</RuleGridDescription>
            </div>
            <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              {plan.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            {action && <div className="mt-auto">{action}</div>}
          </RuleGridCell>
        );
      })}
    </RuleGrid>
  );
}

import { formatCents } from "@locusgraph/utils";
import type { PlanOffer } from "../types";

const intervalLabel = { month: "/month", year: "/year" } as const;

export function PlanPrice({ plan }: { plan: PlanOffer }) {
  if (plan.amountCents === undefined) {
    return (
      <span className="font-heading text-xl font-semibold tracking-[-0.02em] tabular-nums">
        {plan.price}
      </span>
    );
  }
  return (
    <span className="flex items-baseline gap-1">
      <span className="font-heading text-2xl font-semibold tracking-[-0.02em] tabular-nums">
        {formatCents(plan.amountCents)}
      </span>
      {plan.interval && (
        <span className="text-sm text-muted-foreground">{intervalLabel[plan.interval]}</span>
      )}
    </span>
  );
}

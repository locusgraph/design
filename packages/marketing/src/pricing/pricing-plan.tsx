import { Badge, cn, RuleGridCell } from "@locusgraph/components";
import { Check as CheckIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import { MarketingActions } from "../actions/marketing-actions";
import { withUniqueKeys } from "../keys";
import type { LinkComponent, MarketingAction } from "../types";
import type { BillingPeriod } from "./pricing-period";

export type PlanPrice = string | Record<BillingPeriod, string>;

export type PricingPlan = {
  name: string;
  description?: ReactNode;
  price: PlanPrice;
  priceNote?: ReactNode;
  features?: string[];
  action: MarketingAction;
  highlighted?: boolean;
  badge?: ReactNode;
};

type PricingPlanCellProps = {
  plan: PricingPlan;
  cadence: Record<BillingPeriod, ReactNode>;
  linkComponent?: LinkComponent | "a";
};

const periodClasses: Record<BillingPeriod, string> = {
  monthly: "group-data-[period=yearly]/pricing:hidden",
  yearly: "hidden group-data-[period=yearly]/pricing:inline",
};

function Price({ price, cadence }: { price: PlanPrice; cadence: PricingPlanCellProps["cadence"] }) {
  if (typeof price === "string") {
    return <span className="text-4xl font-semibold tracking-tight">{price}</span>;
  }
  return (
    <>
      {(["monthly", "yearly"] as const).map((period) => (
        <span key={period} data-price-period={period} className={periodClasses[period]}>
          <span className="text-4xl font-semibold tracking-tight tabular-nums">
            {price[period]}
          </span>
          <span className="ml-1 text-sm text-muted-foreground">{cadence[period]}</span>
        </span>
      ))}
    </>
  );
}

export function PricingPlanCell({ plan, cadence, linkComponent }: PricingPlanCellProps) {
  return (
    <RuleGridCell
      data-highlighted={plan.highlighted || undefined}
      className={cn("gap-6", plan.highlighted && "relative z-10 ring-primary")}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          {plan.badge && <Badge>{plan.badge}</Badge>}
        </div>
        {plan.description && <p className="text-sm text-muted-foreground">{plan.description}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <p>
          <Price price={plan.price} cadence={cadence} />
        </p>
        {plan.priceNote && <p className="text-xs text-faint">{plan.priceNote}</p>}
      </div>
      <MarketingActions
        actions={[
          {
            ...plan.action,
            variant: plan.action.variant ?? (plan.highlighted ? "default" : "outline"),
          },
        ]}
        linkComponent={linkComponent}
        className="[&>*]:w-full"
      />
      {plan.features && plan.features.length > 0 && (
        <ul className="flex flex-col gap-2.5 text-sm">
          {withUniqueKeys(plan.features, (feature) => feature).map(({ key, item: feature }) => (
            <li key={key} className="flex gap-2.5">
              <CheckIcon weight="bold" aria-hidden className="mt-0.5 size-4 shrink-0 text-good" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </RuleGridCell>
  );
}

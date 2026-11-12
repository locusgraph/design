import { RuleGrid } from "@locusgraph/components";
import type { ReactNode } from "react";
import { withUniqueKeys } from "../keys";
import { Section, type SectionHeadingProps } from "../section/section";
import type { LinkComponent } from "../types";
import { type BillingPeriod, PricingPeriod } from "./pricing-period";
import { type PricingPlan, PricingPlanCell } from "./pricing-plan";

type PricingProps = SectionHeadingProps & {
  plans: PricingPlan[];
  defaultPeriod?: BillingPeriod;
  periodLabels?: Record<BillingPeriod, ReactNode>;
  periodLabel?: string;
  cadence?: Record<BillingPeriod, ReactNode>;
  linkComponent?: LinkComponent | "a";
  id?: string;
  className?: string;
};

const defaultPeriodLabels = { monthly: "Monthly", yearly: "Yearly" };
const defaultCadence = { monthly: "/month", yearly: "/year" };

function columnsFor(count: number) {
  if (count <= 1) return 1;
  if (count >= 4) return 4;
  return count as 2 | 3;
}

export function Pricing({
  plans,
  defaultPeriod = "monthly",
  periodLabels = defaultPeriodLabels,
  periodLabel = "Billing period",
  cadence = defaultCadence,
  linkComponent,
  align = "center",
  ...section
}: PricingProps) {
  const grid = (
    <RuleGrid columns={columnsFor(plans.length)}>
      {withUniqueKeys(plans, (plan) => plan.name).map(({ key, item: plan }) => (
        <PricingPlanCell key={key} plan={plan} cadence={cadence} linkComponent={linkComponent} />
      ))}
    </RuleGrid>
  );
  const hasPeriods = plans.some((plan) => typeof plan.price !== "string");
  return (
    <Section slot="marketing-pricing" align={align} {...section}>
      {hasPeriods ? (
        <PricingPeriod defaultPeriod={defaultPeriod} labels={periodLabels} label={periodLabel}>
          {grid}
        </PricingPeriod>
      ) : (
        grid
      )}
    </Section>
  );
}

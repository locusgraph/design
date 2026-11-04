import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";

export type PlanChangedEmailData = {
  organizationName: string;
  previousPlan: string;
  newPlan: string;
  effectiveOn: string;
  changedBy: string;
  billingUrl: string;
};

export type PlanChangedEmailProps = WithOverrides<PlanChangedEmailData>;

export const { Component: PlanChangedEmail, render: planChangedEmail } =
  defineEmail<PlanChangedEmailData>({
    text: {
      subject: (p) => `${p.organizationName} plan changed to ${p.newPlan}`,
      preview: (p) => `New limits and price apply from ${p.effectiveOn}`,
      label: "Billing",
      heading: (p) => `Plan changed to ${p.newPlan}`,
      body: (p) =>
        `${p.changedBy} changed the plan for ${p.organizationName}. Limits and price follow the new plan from ${p.effectiveOn}.`,
      button: "See billing",
    },
    actionUrl: (p) => p.billingUrl,
    rows: (p) => [
      ["Previous plan", p.previousPlan],
      ["New plan", p.newPlan],
      ["Takes effect", p.effectiveOn],
    ],
  });

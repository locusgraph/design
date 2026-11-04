import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";
import { type OverQuota, quotaRows } from "./quota-rows";

export type { OverQuota };

export type UsageOverPlanEmailData = {
  organizationName: string;
  quotas: OverQuota[];
  usageUrl: string;
};

export type UsageOverPlanEmailProps = WithOverrides<UsageOverPlanEmailData>;

export const { Component: UsageOverPlanEmail, render: usageOverPlanEmail } =
  defineEmail<UsageOverPlanEmailData>({
    text: {
      subject: (p) => `${p.organizationName} is over its plan`,
      preview: "Usage past the plan draws on credits or stops",
      label: "Usage",
      heading: "Usage is over your plan",
      body: (p) =>
        `${p.organizationName} used more than its plan includes. Usage past the plan draws on credits, or stops when overage is off.`,
      button: "See usage",
    },
    actionUrl: (p) => p.usageUrl,
    rows: (p) => quotaRows(p.quotas),
  });

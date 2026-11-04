import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";
import { type OverQuota, quotaRows } from "./quota-rows";

export type UsageWarningEmailData = {
  organizationName: string;
  percentUsed: number;
  quotas: OverQuota[];
  usageUrl: string;
};

export type UsageWarningEmailProps = WithOverrides<UsageWarningEmailData>;

export const { Component: UsageWarningEmail, render: usageWarningEmail } =
  defineEmail<UsageWarningEmailData>({
    text: {
      subject: (p) => `${p.organizationName} used ${p.percentUsed}% of its plan`,
      preview: "Upgrade or add credits so nothing stops",
      label: "Usage",
      heading: (p) => `${p.percentUsed}% of your plan used`,
      body: (p) =>
        `${p.organizationName} is close to what its plan includes. Upgrade or add credits so nothing stops.`,
      button: "See usage",
    },
    actionUrl: (p) => p.usageUrl,
    rows: (p) => quotaRows(p.quotas),
  });

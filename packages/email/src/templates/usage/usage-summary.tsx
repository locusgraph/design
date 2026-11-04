import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";

export type UsageSummaryEmailData = {
  organizationName: string;
  periodLabel: string;
  rows: [label: string, value: string][];
  usageUrl: string;
};

export type UsageSummaryEmailProps = WithOverrides<UsageSummaryEmailData>;

export const { Component: UsageSummaryEmail, render: usageSummaryEmail } =
  defineEmail<UsageSummaryEmailData>({
    text: {
      subject: (p) => `${p.organizationName} usage for ${p.periodLabel}`,
      preview: (p) => `A summary of what ${p.organizationName} used`,
      label: "Monthly summary",
      heading: (p) => `Your ${p.periodLabel} usage`,
      body: (p) => `Here is what ${p.organizationName} used in ${p.periodLabel}.`,
      button: "See usage",
      footer: "You get this summary once a month as an owner or admin.",
    },
    actionUrl: (p) => p.usageUrl,
    rows: (p) => p.rows,
  });

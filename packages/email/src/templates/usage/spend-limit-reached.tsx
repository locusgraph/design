import { formatCents } from "@locusgraph/utils";
import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";

export type SpendLimitReachedEmailData = {
  organizationName: string;
  limitCents: number;
  reachedOn: string;
  resetsOn: string;
  limitsUrl: string;
};

export type SpendLimitReachedEmailProps = WithOverrides<SpendLimitReachedEmailData>;

export const { Component: SpendLimitReachedEmail, render: spendLimitReachedEmail } =
  defineEmail<SpendLimitReachedEmailData>({
    text: {
      subject: (p) => `${p.organizationName} reached its spend limit`,
      preview: "API requests are paused until you raise the limit",
      label: "Usage",
      heading: "Spend limit reached",
      body: (p) =>
        `${p.organizationName} reached its spend limit of ${formatCents(p.limitCents)}. API requests are paused until you raise the limit or the limit resets.`,
      button: "Raise limit",
    },
    actionUrl: (p) => p.limitsUrl,
    rows: (p) => [
      ["Limit", formatCents(p.limitCents)],
      ["Reached", p.reachedOn],
      ["Resets", p.resetsOn],
    ],
  });

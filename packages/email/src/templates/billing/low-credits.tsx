import { formatMicroUsd } from "@locusgraph/utils";
import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";

export type LowCreditsEmailData = {
  organizationName: string;
  balanceMicroUsd: number;
  buyCreditsUrl: string;
};

export type LowCreditsEmailProps = WithOverrides<LowCreditsEmailData>;

const isEmpty = (p: LowCreditsEmailData) => p.balanceMicroUsd <= 0;

export const { Component: LowCreditsEmail, render: lowCreditsEmail } =
  defineEmail<LowCreditsEmailData>({
    text: {
      subject: (p) =>
        isEmpty(p)
          ? `You are out of credits on ${p.organizationName}`
          : `Your credits are running low on ${p.organizationName}`,
      preview: (p) =>
        isEmpty(p)
          ? "Paid usage is paused until you add credits"
          : "Add credits so paid usage does not stop",
      label: "Credits",
      heading: (p) =>
        isEmpty(p) ? "Out of credits" : `${formatMicroUsd(p.balanceMicroUsd)} of credits left`,
      body: (p) =>
        isEmpty(p)
          ? `Paid usage for ${p.organizationName} is paused until you add credits.`
          : `Add credits so paid usage for ${p.organizationName} does not stop.`,
      button: "Buy credits",
    },
    actionUrl: (p) => p.buyCreditsUrl,
  });

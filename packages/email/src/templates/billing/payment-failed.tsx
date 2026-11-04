import { formatCents } from "@locusgraph/utils";
import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";

export type PaymentFailedEmailData = {
  organizationName: string;
  amountCents: number;
  failedOn: string;
  reason?: string;
  retryOn?: string;
  billingUrl: string;
};

export type PaymentFailedEmailProps = WithOverrides<PaymentFailedEmailData>;

export const { Component: PaymentFailedEmail, render: paymentFailedEmail } =
  defineEmail<PaymentFailedEmailData>({
    text: {
      subject: (p) => `Payment failed for ${p.organizationName}`,
      preview: "Update your payment method to keep your plan active",
      label: "Billing",
      heading: "Payment failed",
      body: (p) =>
        `We could not charge ${formatCents(p.amountCents)} for ${p.organizationName}. Update the payment method to keep the plan active.`,
      button: "Update payment",
    },
    actionUrl: (p) => p.billingUrl,
    rows: (p) => [
      ["Amount", formatCents(p.amountCents)],
      ["Date", p.failedOn],
      ["Reason", p.reason],
      ["Next try", p.retryOn],
    ],
  });

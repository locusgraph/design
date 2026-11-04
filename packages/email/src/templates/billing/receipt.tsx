import { formatCents } from "@locusgraph/utils";
import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";

export type ReceiptEmailData = {
  organizationName: string;
  description: string;
  amountCents: number;
  paidOn: string;
  receiptUrl: string;
};

export type ReceiptEmailProps = WithOverrides<ReceiptEmailData>;

export const { Component: ReceiptEmail, render: receiptEmail } = defineEmail<ReceiptEmailData>({
  text: {
    subject: (p) => `Receipt: ${formatCents(p.amountCents)} for ${p.organizationName}`,
    preview: (p) => `${p.description}, paid on ${p.paidOn}`,
    label: "Receipt",
    heading: (p) => `${formatCents(p.amountCents)} paid`,
    body: (p) => `Thanks. Here is what ${p.organizationName} paid for.`,
    button: "View receipt",
    footer: "Stripe processed this payment. The receipt link shows the full invoice.",
  },
  actionUrl: (p) => p.receiptUrl,
  rows: (p) => [
    ["Item", p.description],
    ["Date", p.paidOn],
    ["Total", formatCents(p.amountCents)],
  ],
});

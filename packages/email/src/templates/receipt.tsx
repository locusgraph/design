import { formatCents } from "@locusgraph/utils";
import { EmailLayout } from "../kit/email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailRows, EmailText } from "../kit/parts";
import { renderEmail } from "../render";

export type ReceiptEmailProps = {
  organizationName: string;
  description: string;
  amountCents: number;
  paidOn: string;
  receiptUrl: string;
};

export function ReceiptEmail({
  organizationName,
  description,
  amountCents,
  paidOn,
  receiptUrl,
}: ReceiptEmailProps) {
  return (
    <EmailLayout
      preview={`${formatCents(amountCents)} paid for ${organizationName}`}
      footer="Stripe processed this payment. The receipt link shows the full invoice."
    >
      <EmailLabel>Receipt</EmailLabel>
      <EmailHeading>{formatCents(amountCents)} paid</EmailHeading>
      <EmailText>Thanks. Here is what {organizationName} paid for.</EmailText>
      <EmailRows
        rows={[
          ["Item", description],
          ["Date", paidOn],
          ["Total", formatCents(amountCents)],
        ]}
      />
      <EmailButton href={receiptUrl}>View receipt</EmailButton>
    </EmailLayout>
  );
}

export function receiptEmail(props: ReceiptEmailProps) {
  return renderEmail(
    `Receipt: ${formatCents(props.amountCents)} for ${props.organizationName}`,
    <ReceiptEmail {...props} />
  );
}

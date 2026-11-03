import type { WithProduct } from "../../kit/brand";
import { EmailLayout } from "../../kit/email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailRows, EmailText } from "../../kit/parts";
import { renderEmail } from "../../render";

export type UsageSummaryEmailProps = WithProduct & {
  organizationName: string;
  periodLabel: string;
  rows: [label: string, value: string][];
  usageUrl: string;
};

export function UsageSummaryEmail({
  product,
  organizationName,
  periodLabel,
  rows,
  usageUrl,
}: UsageSummaryEmailProps) {
  return (
    <EmailLayout
      product={product}
      preview={`${organizationName} usage for ${periodLabel}`}
      footer="You get this summary once a month as an owner or admin."
    >
      <EmailLabel>Monthly summary</EmailLabel>
      <EmailHeading>Your {periodLabel} usage</EmailHeading>
      <EmailText>
        Here is what {organizationName} used in {periodLabel}.
      </EmailText>
      <EmailRows rows={rows} />
      <EmailButton href={usageUrl}>See usage</EmailButton>
    </EmailLayout>
  );
}

export function usageSummaryEmail(props: UsageSummaryEmailProps) {
  return renderEmail(
    `${props.organizationName} usage for ${props.periodLabel}`,
    <UsageSummaryEmail {...props} />
  );
}

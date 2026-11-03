import type { WithProduct } from "../../kit/brand";
import { EmailLayout } from "../../kit/email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailRows, EmailText } from "../../kit/parts";
import { renderEmail } from "../../render";
import { type OverQuota, quotaRows } from "./quota-rows";

export type UsageWarningEmailProps = WithProduct & {
  organizationName: string;
  percentUsed: number;
  quotas: OverQuota[];
  usageUrl: string;
};

export function UsageWarningEmail({
  product,
  organizationName,
  percentUsed,
  quotas,
  usageUrl,
}: UsageWarningEmailProps) {
  return (
    <EmailLayout product={product} preview={`${organizationName} used ${percentUsed}% of its plan`}>
      <EmailLabel>Usage</EmailLabel>
      <EmailHeading>{percentUsed}% of your plan used</EmailHeading>
      <EmailText>
        {organizationName} is close to what its plan includes. Upgrade or add credits so nothing
        stops.
      </EmailText>
      <EmailRows rows={quotaRows(quotas)} />
      <EmailButton href={usageUrl}>See usage</EmailButton>
    </EmailLayout>
  );
}

export function usageWarningEmail(props: UsageWarningEmailProps) {
  return renderEmail(
    `${props.organizationName} used ${props.percentUsed}% of its plan`,
    <UsageWarningEmail {...props} />
  );
}

import { type WithProduct } from "../../kit/brand";
import { EmailLayout } from "../../kit/email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailRows, EmailText } from "../../kit/parts";
import { renderEmail } from "../../render";
import { type OverQuota, quotaRows } from "./quota-rows";

export type { OverQuota };

export type UsageOverPlanEmailProps = WithProduct & {
  organizationName: string;
  quotas: OverQuota[];
  usageUrl: string;
};

export function UsageOverPlanEmail({
  product,
  organizationName,
  quotas,
  usageUrl,
}: UsageOverPlanEmailProps) {
  return (
    <EmailLayout product={product} preview={`${organizationName} is over its plan`}>
      <EmailLabel>Usage</EmailLabel>
      <EmailHeading>Usage is over your plan</EmailHeading>
      <EmailText>
        {organizationName} used more than its plan includes. Usage past the plan comes from prepaid
        credits, or stops when overage is off.
      </EmailText>
      <EmailRows rows={quotaRows(quotas)} />
      <EmailButton href={usageUrl}>See usage</EmailButton>
    </EmailLayout>
  );
}

export function usageOverPlanEmail(props: UsageOverPlanEmailProps) {
  return renderEmail(
    `${props.organizationName} is over its plan`,
    <UsageOverPlanEmail {...props} />
  );
}

import { formatCount } from "@locusgraph/utils";
import { EmailLayout } from "../kit/email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailRows, EmailText } from "../kit/parts";
import { renderEmail } from "../render";

export type OverQuota = {
  key: string;
  label?: string;
  used: number;
  included: number;
  periodLabel: string;
};

export type UsageOverPlanEmailProps = {
  organizationName: string;
  quotas: OverQuota[];
  usageUrl: string;
};

export function UsageOverPlanEmail({
  organizationName,
  quotas,
  usageUrl,
}: UsageOverPlanEmailProps) {
  return (
    <EmailLayout preview={`${organizationName} is over its plan`}>
      <EmailLabel>Usage</EmailLabel>
      <EmailHeading>Usage is over your plan</EmailHeading>
      <EmailText>
        {organizationName} used more than its plan includes. Usage past the plan comes from prepaid
        credits, or stops when overage is off.
      </EmailText>
      <EmailRows
        rows={quotas.map((quota) => [
          quota.label ?? quota.key,
          `${formatCount(quota.used)} of ${formatCount(quota.included)} ${quota.periodLabel}`,
        ])}
      />
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

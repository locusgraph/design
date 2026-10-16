import { formatMicroUsd } from "@locusgraph/utils";
import { EmailLayout } from "../kit/email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailText } from "../kit/parts";
import { renderEmail } from "../render";

export type LowCreditsEmailProps = {
  organizationName: string;
  balanceMicroUsd: number;
  buyCreditsUrl: string;
};

export function LowCreditsEmail({
  organizationName,
  balanceMicroUsd,
  buyCreditsUrl,
}: LowCreditsEmailProps) {
  const empty = balanceMicroUsd <= 0;
  return (
    <EmailLayout
      preview={
        empty ? `${organizationName} is out of credits` : `${organizationName} is low on credits`
      }
    >
      <EmailLabel>Credits</EmailLabel>
      <EmailHeading>
        {empty ? "Out of credits" : `${formatMicroUsd(balanceMicroUsd)} of credits left`}
      </EmailHeading>
      <EmailText>
        {empty
          ? `Paid usage for ${organizationName} is paused until you add credits.`
          : `Add credits so paid usage for ${organizationName} does not stop.`}
      </EmailText>
      <EmailButton href={buyCreditsUrl}>Buy credits</EmailButton>
    </EmailLayout>
  );
}

export function lowCreditsEmail(props: LowCreditsEmailProps) {
  const subject =
    props.balanceMicroUsd <= 0 ? "You are out of credits" : "Your credits are running low";
  return renderEmail(`${subject} on ${props.organizationName}`, <LowCreditsEmail {...props} />);
}

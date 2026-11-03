import { brandOf, type WithProduct } from "../../kit/brand";
import { EmailLayout } from "../../kit/email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailText } from "../../kit/parts";
import { withIndefiniteArticle } from "../../kit/words";
import { renderEmail } from "../../render";

export type InvitationEmailProps = WithProduct & {
  organizationName: string;
  inviterName: string;
  role: string;
  acceptUrl: string;
  expiresOn: string;
};

export function InvitationEmail({
  product,
  organizationName,
  inviterName,
  role,
  acceptUrl,
  expiresOn,
}: InvitationEmailProps) {
  return (
    <EmailLayout
      product={product}
      preview={`${inviterName} invited you to ${organizationName}`}
      footer={`The invitation expires on ${expiresOn}. If you did not expect it, ignore this email.`}
    >
      <EmailLabel>Invitation</EmailLabel>
      <EmailHeading>
        Join {organizationName} on {brandOf(product).name}
      </EmailHeading>
      <EmailText>
        {inviterName} invited you to {organizationName} as {withIndefiniteArticle(role)}. Sign in
        with Google or GitHub to accept.
      </EmailText>
      <EmailButton href={acceptUrl}>Accept invitation</EmailButton>
    </EmailLayout>
  );
}

export function invitationEmail(props: InvitationEmailProps) {
  return renderEmail(
    `Join ${props.organizationName} on ${brandOf(props.product).name}`,
    <InvitationEmail {...props} />
  );
}

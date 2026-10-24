import { EmailLayout } from "../kit/email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailText } from "../kit/parts";
import { renderEmail } from "../render";

export type InvitationEmailProps = {
  organizationName: string;
  inviterName: string;
  role: string;
  acceptUrl: string;
  expiresOn: string;
};

function withIndefiniteArticle(word: string) {
  return /^[aeiou]/i.test(word) ? `an ${word}` : `a ${word}`;
}

export function InvitationEmail({
  organizationName,
  inviterName,
  role,
  acceptUrl,
  expiresOn,
}: InvitationEmailProps) {
  return (
    <EmailLayout
      preview={`${inviterName} invited you to ${organizationName}`}
      footer={`The invitation expires on ${expiresOn}. If you did not expect it, ignore this email.`}
    >
      <EmailLabel>Invitation</EmailLabel>
      <EmailHeading>Join {organizationName} on LocusGraph</EmailHeading>
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
    `Join ${props.organizationName} on LocusGraph`,
    <InvitationEmail {...props} />
  );
}

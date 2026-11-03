import type { WithProduct } from "../../kit/brand";
import { EmailLayout } from "../../kit/email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailText } from "../../kit/parts";
import { withIndefiniteArticle } from "../../kit/words";
import { renderEmail } from "../../render";

export type InvitationAcceptedEmailProps = WithProduct & {
  organizationName: string;
  memberName: string;
  role: string;
  membersUrl: string;
};

export function InvitationAcceptedEmail({
  product,
  organizationName,
  memberName,
  role,
  membersUrl,
}: InvitationAcceptedEmailProps) {
  return (
    <EmailLayout product={product} preview={`${memberName} joined ${organizationName}`}>
      <EmailLabel>Members</EmailLabel>
      <EmailHeading>{memberName} joined</EmailHeading>
      <EmailText>
        {memberName} accepted your invitation and joined {organizationName} as{" "}
        {withIndefiniteArticle(role)}.
      </EmailText>
      <EmailButton href={membersUrl}>See members</EmailButton>
    </EmailLayout>
  );
}

export function invitationAcceptedEmail(props: InvitationAcceptedEmailProps) {
  return renderEmail(
    `${props.memberName} joined ${props.organizationName}`,
    <InvitationAcceptedEmail {...props} />
  );
}

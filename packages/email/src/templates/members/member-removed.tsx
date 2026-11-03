import type { WithProduct } from "../../kit/brand";
import { EmailLayout } from "../../kit/email-layout";
import { EmailHeading, EmailLabel, EmailText } from "../../kit/parts";
import { renderEmail } from "../../render";

export type MemberRemovedEmailProps = WithProduct & {
  organizationName: string;
  removedBy: string;
};

export function MemberRemovedEmail({
  product,
  organizationName,
  removedBy,
}: MemberRemovedEmailProps) {
  return (
    <EmailLayout
      product={product}
      preview={`You were removed from ${organizationName}`}
      footer={`If you think this is a mistake, ask an owner of ${organizationName} to invite you again.`}
    >
      <EmailLabel>Members</EmailLabel>
      <EmailHeading>You were removed from {organizationName}</EmailHeading>
      <EmailText>
        {removedBy} removed you from {organizationName}. You no longer have access to its data or
        keys.
      </EmailText>
    </EmailLayout>
  );
}

export function memberRemovedEmail(props: MemberRemovedEmailProps) {
  return renderEmail(
    `You were removed from ${props.organizationName}`,
    <MemberRemovedEmail {...props} />
  );
}

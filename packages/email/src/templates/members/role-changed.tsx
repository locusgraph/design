import type { WithProduct } from "../../kit/brand";
import { EmailLayout } from "../../kit/email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailText } from "../../kit/parts";
import { withIndefiniteArticle } from "../../kit/words";
import { renderEmail } from "../../render";

export type RoleChangedEmailProps = WithProduct & {
  organizationName: string;
  role: string;
  changedBy: string;
  organizationUrl: string;
};

export function RoleChangedEmail({
  product,
  organizationName,
  role,
  changedBy,
  organizationUrl,
}: RoleChangedEmailProps) {
  return (
    <EmailLayout product={product} preview={`You are now ${withIndefiniteArticle(role)}`}>
      <EmailLabel>Members</EmailLabel>
      <EmailHeading>Your role changed</EmailHeading>
      <EmailText>
        {changedBy} made you {withIndefiniteArticle(role)} of {organizationName}.
      </EmailText>
      <EmailButton href={organizationUrl}>Open organization</EmailButton>
    </EmailLayout>
  );
}

export function roleChangedEmail(props: RoleChangedEmailProps) {
  return renderEmail(
    `You are now ${withIndefiniteArticle(props.role)} of ${props.organizationName}`,
    <RoleChangedEmail {...props} />
  );
}

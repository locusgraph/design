import type { WithProduct } from "../../kit/brand";
import { EmailLayout } from "../../kit/email-layout";
import { EmailHeading, EmailLabel, EmailRows, EmailText } from "../../kit/parts";
import { renderEmail } from "../../render";

export type OrganizationDeletedEmailProps = WithProduct & {
  organizationName: string;
  deletedBy: string;
  deletedOn: string;
};

export function OrganizationDeletedEmail({
  product,
  organizationName,
  deletedBy,
  deletedOn,
}: OrganizationDeletedEmailProps) {
  return (
    <EmailLayout
      product={product}
      preview={`${organizationName} was deleted`}
      footer="If you did not expect this, reply to this email to reach support."
    >
      <EmailLabel>Organization</EmailLabel>
      <EmailHeading>{organizationName} was deleted</EmailHeading>
      <EmailText>
        {deletedBy} deleted {organizationName}. Its members, keys and data are gone, and you no
        longer have access.
      </EmailText>
      <EmailRows
        rows={[
          ["Deleted by", deletedBy],
          ["Date", deletedOn],
        ]}
      />
    </EmailLayout>
  );
}

export function organizationDeletedEmail(props: OrganizationDeletedEmailProps) {
  return renderEmail(
    `${props.organizationName} was deleted`,
    <OrganizationDeletedEmail {...props} />
  );
}

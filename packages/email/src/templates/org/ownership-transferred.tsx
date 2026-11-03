import type { WithProduct } from "../../kit/brand";
import { EmailLayout } from "../../kit/email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailRows, EmailText } from "../../kit/parts";
import { renderEmail } from "../../render";

export type OwnershipTransferredEmailProps = WithProduct & {
  organizationName: string;
  previousOwnerName: string;
  newOwnerName: string;
  transferredOn: string;
  organizationUrl: string;
};

export function OwnershipTransferredEmail({
  product,
  organizationName,
  previousOwnerName,
  newOwnerName,
  transferredOn,
  organizationUrl,
}: OwnershipTransferredEmailProps) {
  return (
    <EmailLayout
      product={product}
      preview={`${newOwnerName} now owns ${organizationName}`}
      footer="If you did not expect this change, contact support by replying to this email."
    >
      <EmailLabel>Organization</EmailLabel>
      <EmailHeading>{organizationName} has a new owner</EmailHeading>
      <EmailText>
        {previousOwnerName} transferred ownership of {organizationName} to {newOwnerName}.
      </EmailText>
      <EmailRows
        rows={[
          ["Previous owner", previousOwnerName],
          ["New owner", newOwnerName],
          ["Date", transferredOn],
        ]}
      />
      <EmailButton href={organizationUrl}>Open organization</EmailButton>
    </EmailLayout>
  );
}

export function ownershipTransferredEmail(props: OwnershipTransferredEmailProps) {
  return renderEmail(
    `${props.newOwnerName} now owns ${props.organizationName}`,
    <OwnershipTransferredEmail {...props} />
  );
}

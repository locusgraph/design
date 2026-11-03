import type { WithProduct } from "../../kit/brand";
import { EmailLayout } from "../../kit/email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailRows, EmailText } from "../../kit/parts";
import { renderEmail } from "../../render";

export type KeyCreatedEmailProps = WithProduct & {
  organizationName: string;
  keyName: string;
  createdBy: string;
  createdOn: string;
  keysUrl: string;
};

export function KeyCreatedEmail({
  product,
  organizationName,
  keyName,
  createdBy,
  createdOn,
  keysUrl,
}: KeyCreatedEmailProps) {
  return (
    <EmailLayout
      product={product}
      preview={`${createdBy} created the API key ${keyName}`}
      footer="If you do not recognize this key, revoke it now."
    >
      <EmailLabel>API keys</EmailLabel>
      <EmailHeading>New API key created</EmailHeading>
      <EmailText>
        {createdBy} created an API key for {organizationName}.
      </EmailText>
      <EmailRows
        rows={[
          ["Key", keyName],
          ["Created by", createdBy],
          ["Date", createdOn],
        ]}
      />
      <EmailButton href={keysUrl}>Review keys</EmailButton>
    </EmailLayout>
  );
}

export function keyCreatedEmail(props: KeyCreatedEmailProps) {
  return renderEmail(
    `New API key ${props.keyName} on ${props.organizationName}`,
    <KeyCreatedEmail {...props} />
  );
}

import type { WithProduct } from "../../kit/brand";
import { EmailLayout } from "../../kit/email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailRows, EmailText } from "../../kit/parts";
import { renderEmail } from "../../render";

export type KeyRevokedEmailProps = WithProduct & {
  organizationName: string;
  keyName: string;
  revokedBy: string;
  revokedOn: string;
  keysUrl: string;
};

export function KeyRevokedEmail({
  product,
  organizationName,
  keyName,
  revokedBy,
  revokedOn,
  keysUrl,
}: KeyRevokedEmailProps) {
  return (
    <EmailLayout product={product} preview={`${revokedBy} revoked the API key ${keyName}`}>
      <EmailLabel>API keys</EmailLabel>
      <EmailHeading>API key revoked</EmailHeading>
      <EmailText>
        {revokedBy} revoked an API key for {organizationName}. Anything still using it now gets
        refused.
      </EmailText>
      <EmailRows
        rows={[
          ["Key", keyName],
          ["Revoked by", revokedBy],
          ["Date", revokedOn],
        ]}
      />
      <EmailButton href={keysUrl}>Review keys</EmailButton>
    </EmailLayout>
  );
}

export function keyRevokedEmail(props: KeyRevokedEmailProps) {
  return renderEmail(
    `API key ${props.keyName} revoked on ${props.organizationName}`,
    <KeyRevokedEmail {...props} />
  );
}

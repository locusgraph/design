import type { WithProduct } from "../../kit/brand";
import { EmailLayout } from "../../kit/email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailRows, EmailText } from "../../kit/parts";
import { renderEmail } from "../../render";

export type KeyExpiringEmailProps = WithProduct & {
  organizationName: string;
  keyName: string;
  expiresOn: string;
  keysUrl: string;
};

export function KeyExpiringEmail({
  product,
  organizationName,
  keyName,
  expiresOn,
  keysUrl,
}: KeyExpiringEmailProps) {
  return (
    <EmailLayout product={product} preview={`The API key ${keyName} expires on ${expiresOn}`}>
      <EmailLabel>API keys</EmailLabel>
      <EmailHeading>API key expires on {expiresOn}</EmailHeading>
      <EmailText>
        After that date, anything using this key for {organizationName} gets refused. Create a new
        key and switch to it before then.
      </EmailText>
      <EmailRows
        rows={[
          ["Key", keyName],
          ["Expires", expiresOn],
        ]}
      />
      <EmailButton href={keysUrl}>Create a new key</EmailButton>
    </EmailLayout>
  );
}

export function keyExpiringEmail(props: KeyExpiringEmailProps) {
  return renderEmail(
    `API key ${props.keyName} expires on ${props.expiresOn}`,
    <KeyExpiringEmail {...props} />
  );
}

import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";

export type KeyExpiringEmailData = {
  organizationName: string;
  keyName: string;
  expiresOn: string;
  keysUrl: string;
};

export type KeyExpiringEmailProps = WithOverrides<KeyExpiringEmailData>;

export const { Component: KeyExpiringEmail, render: keyExpiringEmail } =
  defineEmail<KeyExpiringEmailData>({
    text: {
      subject: (p) => `API key ${p.keyName} expires on ${p.expiresOn}`,
      preview: "Create a new key and switch to it before then",
      label: "API keys",
      heading: (p) => `API key expires on ${p.expiresOn}`,
      body: (p) =>
        `After that date, anything using this key for ${p.organizationName} gets refused. Create a new key and switch to it before then.`,
      button: "Create a new key",
    },
    actionUrl: (p) => p.keysUrl,
    rows: (p) => [
      ["Key", p.keyName],
      ["Expires", p.expiresOn],
    ],
  });

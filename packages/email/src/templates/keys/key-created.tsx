import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";
import { securityFooter } from "../../kit/text/security";

export type KeyCreatedEmailData = {
  organizationName: string;
  keyName: string;
  createdBy: string;
  createdOn: string;
  keysUrl: string;
};

export type KeyCreatedEmailProps = WithOverrides<KeyCreatedEmailData>;

export const { Component: KeyCreatedEmail, render: keyCreatedEmail } =
  defineEmail<KeyCreatedEmailData>({
    text: {
      subject: (p) => `New API key ${p.keyName} on ${p.organizationName}`,
      preview: "If you do not recognize this key, revoke it",
      label: "API keys",
      heading: "New API key created",
      body: (p) => `${p.createdBy} created an API key for ${p.organizationName}.`,
      button: "Review keys",
      footer: securityFooter,
    },
    actionUrl: (p) => p.keysUrl,
    rows: (p) => [
      ["Key", p.keyName],
      ["Created by", p.createdBy],
      ["Date", p.createdOn],
    ],
  });

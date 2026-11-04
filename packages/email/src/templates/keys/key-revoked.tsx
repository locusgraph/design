import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";
import { securityFooter } from "../../kit/text/security";

export type KeyRevokedEmailData = {
  organizationName: string;
  keyName: string;
  revokedBy: string;
  revokedOn: string;
  keysUrl: string;
};

export type KeyRevokedEmailProps = WithOverrides<KeyRevokedEmailData>;

export const { Component: KeyRevokedEmail, render: keyRevokedEmail } =
  defineEmail<KeyRevokedEmailData>({
    text: {
      subject: (p) => `API key ${p.keyName} revoked on ${p.organizationName}`,
      preview: "Anything still using it now gets refused",
      label: "API keys",
      heading: "API key revoked",
      body: (p) =>
        `${p.revokedBy} revoked an API key for ${p.organizationName}. Anything still using it now gets refused.`,
      button: "Review keys",
      footer: securityFooter,
    },
    actionUrl: (p) => p.keysUrl,
    rows: (p) => [
      ["Key", p.keyName],
      ["Revoked by", p.revokedBy],
      ["Date", p.revokedOn],
    ],
  });

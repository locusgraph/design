import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";
import { withIndefiniteArticle } from "../../kit/words";

export type InvitationEmailData = {
  organizationName: string;
  inviterName: string;
  role: string;
  acceptUrl: string;
  expiresOn: string;
};

export type InvitationEmailProps = WithOverrides<InvitationEmailData>;

export const { Component: InvitationEmail, render: invitationEmail } =
  defineEmail<InvitationEmailData>({
    text: {
      subject: (p) => `Join ${p.organizationName} on ${p.brandName}`,
      preview: (p) => `${p.inviterName} invited you as ${withIndefiniteArticle(p.role)}`,
      label: "Invitation",
      heading: (p) => `Join ${p.organizationName} on ${p.brandName}`,
      body: (p) =>
        `${p.inviterName} invited you to ${p.organizationName} as ${withIndefiniteArticle(p.role)}. Sign in with Google or GitHub to accept.`,
      button: "Accept invitation",
      footer: (p) =>
        `The invitation expires on ${p.expiresOn}. If you did not expect it, ignore this email.`,
    },
    actionUrl: (p) => p.acceptUrl,
  });

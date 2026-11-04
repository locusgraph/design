import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";
import { withIndefiniteArticle } from "../../kit/words";

export type InvitationAcceptedEmailData = {
  organizationName: string;
  memberName: string;
  role: string;
  membersUrl: string;
};

export type InvitationAcceptedEmailProps = WithOverrides<InvitationAcceptedEmailData>;

export const { Component: InvitationAcceptedEmail, render: invitationAcceptedEmail } =
  defineEmail<InvitationAcceptedEmailData>({
    text: {
      subject: (p) => `${p.memberName} joined ${p.organizationName}`,
      preview: (p) => `${p.memberName} accepted your invitation`,
      label: "Members",
      heading: (p) => `${p.memberName} joined`,
      body: (p) =>
        `${p.memberName} accepted your invitation and joined ${p.organizationName} as ${withIndefiniteArticle(p.role)}.`,
      button: "See members",
    },
    actionUrl: (p) => p.membersUrl,
  });

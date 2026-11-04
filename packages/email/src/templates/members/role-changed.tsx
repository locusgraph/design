import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";
import { securityFooter } from "../../kit/text/security";
import { withIndefiniteArticle } from "../../kit/words";

export type RoleChangedEmailData = {
  organizationName: string;
  role: string;
  changedBy: string;
  organizationUrl: string;
};

export type RoleChangedEmailProps = WithOverrides<RoleChangedEmailData>;

export const { Component: RoleChangedEmail, render: roleChangedEmail } =
  defineEmail<RoleChangedEmailData>({
    text: {
      subject: (p) => `You are now ${withIndefiniteArticle(p.role)} of ${p.organizationName}`,
      preview: (p) => `${p.changedBy} changed your role`,
      label: "Members",
      heading: "Your role changed",
      body: (p) =>
        `${p.changedBy} made you ${withIndefiniteArticle(p.role)} of ${p.organizationName}.`,
      button: "Open organization",
      footer: securityFooter,
    },
    actionUrl: (p) => p.organizationUrl,
  });

import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";

export type MemberRemovedEmailData = {
  organizationName: string;
  removedBy: string;
};

export type MemberRemovedEmailProps = WithOverrides<MemberRemovedEmailData>;

export const { Component: MemberRemovedEmail, render: memberRemovedEmail } =
  defineEmail<MemberRemovedEmailData>({
    text: {
      subject: (p) => `You were removed from ${p.organizationName}`,
      preview: "You no longer have access to its data or keys",
      label: "Members",
      heading: (p) => `You were removed from ${p.organizationName}`,
      body: (p) =>
        `${p.removedBy} removed you from ${p.organizationName}. You no longer have access to its data or keys.`,
      footer: (p) =>
        `If you think this is a mistake, ask an owner of ${p.organizationName} to invite you again.`,
    },
  });

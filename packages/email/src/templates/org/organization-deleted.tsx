import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";
import { securityFooter } from "../../kit/text/security";

export type OrganizationDeletedEmailData = {
  organizationName: string;
  deletedBy: string;
  deletedOn: string;
};

export type OrganizationDeletedEmailProps = WithOverrides<OrganizationDeletedEmailData>;

export const { Component: OrganizationDeletedEmail, render: organizationDeletedEmail } =
  defineEmail<OrganizationDeletedEmailData>({
    text: {
      subject: (p) => `${p.organizationName} was deleted`,
      preview: "Its members, keys and data are gone",
      label: "Organization",
      heading: (p) => `${p.organizationName} was deleted`,
      body: (p) =>
        `${p.deletedBy} deleted ${p.organizationName}. Its members, keys and data are gone, and you no longer have access.`,
      footer: securityFooter,
    },
    rows: (p) => [
      ["Deleted by", p.deletedBy],
      ["Date", p.deletedOn],
    ],
  });

import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";
import { securityFooter } from "../../kit/text/security";

export type OwnershipTransferredEmailData = {
  organizationName: string;
  previousOwnerName: string;
  newOwnerName: string;
  transferredOn: string;
  organizationUrl: string;
};

export type OwnershipTransferredEmailProps = WithOverrides<OwnershipTransferredEmailData>;

export const { Component: OwnershipTransferredEmail, render: ownershipTransferredEmail } =
  defineEmail<OwnershipTransferredEmailData>({
    text: {
      subject: (p) => `${p.newOwnerName} now owns ${p.organizationName}`,
      preview: (p) => `${p.previousOwnerName} transferred ownership on ${p.transferredOn}`,
      label: "Organization",
      heading: (p) => `${p.organizationName} has a new owner`,
      body: (p) =>
        `${p.previousOwnerName} transferred ownership of ${p.organizationName} to ${p.newOwnerName}.`,
      button: "Open organization",
      footer: securityFooter,
    },
    actionUrl: (p) => p.organizationUrl,
    rows: (p) => [
      ["Previous owner", p.previousOwnerName],
      ["New owner", p.newOwnerName],
      ["Date", p.transferredOn],
    ],
  });

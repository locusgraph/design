import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";

export type ApprovalRequestedEmailData = {
  organizationName: string;
  agentName: string;
  action: string;
  requestedOn: string;
  expiresOn?: string;
  reviewUrl: string;
};

export type ApprovalRequestedEmailProps = WithOverrides<ApprovalRequestedEmailData>;

export const { Component: ApprovalRequestedEmail, render: approvalRequestedEmail } =
  defineEmail<ApprovalRequestedEmailData>({
    text: {
      subject: (p) => `${p.agentName} is waiting for your approval`,
      preview: (p) => `Review the action: ${p.action}`,
      label: "Approval",
      heading: (p) => `${p.agentName} needs approval`,
      body: (p) =>
        `An agent in ${p.organizationName} paused before an action that needs a person to approve it. Nothing runs until you approve or deny it.`,
      button: "Review request",
    },
    actionUrl: (p) => p.reviewUrl,
    rows: (p) => [
      ["Agent", p.agentName],
      ["Action", p.action],
      ["Requested", p.requestedOn],
      ["Expires", p.expiresOn],
    ],
  });

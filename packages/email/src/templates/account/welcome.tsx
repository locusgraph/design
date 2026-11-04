import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";

export type WelcomeEmailData = {
  userName: string;
  dashboardUrl: string;
  docsUrl: string;
};

export type WelcomeEmailProps = WithOverrides<WelcomeEmailData>;

export const { Component: WelcomeEmail, render: welcomeEmail } = defineEmail<WelcomeEmailData>({
  text: {
    subject: (p) => `Welcome to ${p.brandName}`,
    preview: "Open the dashboard to get started",
    label: "Account",
    heading: (p) => `Welcome, ${p.userName}`,
    body: (p) =>
      `Your ${p.brandName} account is ready. Open the dashboard to create your first API key and start building.`,
    button: "Open dashboard",
    note: (p) => `New to ${p.brandName}? Read the docs for a quick start and guides:`,
  },
  actionUrl: (p) => p.dashboardUrl,
  noteUrl: (p) => p.docsUrl,
});

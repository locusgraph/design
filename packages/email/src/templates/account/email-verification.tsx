import { defineEmail } from "../../kit/text/define-email";
import type { WithOverrides } from "../../kit/text/overrides";

export type EmailVerificationEmailData = {
  code: string;
  verifyUrl: string;
  expiresInMinutes: number;
};

export type EmailVerificationEmailProps = WithOverrides<EmailVerificationEmailData>;

export const { Component: EmailVerificationEmail, render: emailVerificationEmail } =
  defineEmail<EmailVerificationEmailData>({
    text: {
      subject: (p) => `${p.code} is your ${p.brandName} verification code`,
      preview: "Confirm your email to finish creating your account",
      label: "Account",
      heading: "Confirm your email",
      body: (p) => `Confirm this address to finish creating your ${p.brandName} account.`,
      button: "Verify email",
      note: (p) => `Or enter the code ${p.code}. It expires in ${p.expiresInMinutes} minutes.`,
      footer: (p) => `If you did not sign up for ${p.brandName}, you can ignore this email.`,
    },
    actionUrl: (p) => p.verifyUrl,
  });

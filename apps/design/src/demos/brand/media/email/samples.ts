import {
  invitationEmail,
  lowCreditsEmail,
  type RenderedEmail,
  receiptEmail,
  usageOverPlanEmail,
} from "@locusgraph/email";

export const emailTemplates = ["invitation", "receipt", "low-credits", "usage-over-plan"] as const;

export type EmailTemplate = (typeof emailTemplates)[number];

const renderers: Record<EmailTemplate, () => RenderedEmail> = {
  invitation: () =>
    invitationEmail({
      organizationName: "Acme Inc",
      inviterName: "Dana Rivera",
      role: "member",
      acceptUrl: "https://accounts.locusgraph.com/invite/example",
      expiresOn: "Oct 24, 2026",
    }),
  receipt: () =>
    receiptEmail({
      organizationName: "Acme Inc",
      description: "Pro plan, October",
      amountCents: 4000,
      paidOn: "Oct 1, 2026",
      receiptUrl: "https://pay.stripe.com/receipts/example",
    }),
  "low-credits": () =>
    lowCreditsEmail({
      organizationName: "Acme Inc",
      balanceMicroUsd: 2_400_000,
      buyCreditsUrl: "https://accounts.locusgraph.com/billing/credits",
    }),
  "usage-over-plan": () =>
    usageOverPlanEmail({
      organizationName: "Acme Inc",
      quotas: [
        { key: "Memory writes", used: 124_000, included: 100_000, periodLabel: "this month" },
        { key: "Graphs", used: 6, included: 5, periodLabel: "in total" },
      ],
      usageUrl: "https://accounts.locusgraph.com/usage",
    }),
};

const rendered = new Map<EmailTemplate, RenderedEmail>();

export function renderSampleEmail(template: EmailTemplate): RenderedEmail {
  const cached = rendered.get(template);
  if (cached) return cached;
  const email = renderers[template]();
  rendered.set(template, email);
  return email;
}

export const templateCode: Record<EmailTemplate, string> = {
  invitation: `invitationEmail({
  organizationName: "Acme Inc",
  inviterName: "Dana Rivera",
  role: "member",
  acceptUrl,
  expiresOn: "Oct 24, 2026",
})`,
  receipt: `receiptEmail({
  organizationName: "Acme Inc",
  description: "Pro plan, October",
  amountCents: 4000,
  paidOn: "Oct 1, 2026",
  receiptUrl,
})`,
  "low-credits": `lowCreditsEmail({
  organizationName: "Acme Inc",
  balanceMicroUsd: 2_400_000,
  buyCreditsUrl,
})`,
  "usage-over-plan": `usageOverPlanEmail({
  organizationName: "Acme Inc",
  quotas: [{ key: "Memory writes", used: 124_000, included: 100_000, periodLabel: "this month" }],
  usageUrl,
})`,
};

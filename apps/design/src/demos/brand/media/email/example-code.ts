export const brandOnceCode = `import { createEmails } from "@locusgraph/email";

export const emails = createEmails({
  product: "spendgraph",
  brand: { name: "Acme Cloud", wordmark: ["acme", "cloud"] },
  overrides: {
    welcome: { body: "Connect your first agent to start tracking spend." },
  },
});

const { subject, html, text } = emails.welcome({
  userName: "Dana Rivera",
  dashboardUrl: "https://app.acme.com",
  docsUrl: "https://docs.acme.com",
});`;

export const overrideTextCode = `import { formatMicroUsd, lowCreditsEmail } from "@locusgraph/email";

const { subject, html, text } = lowCreditsEmail({
  organizationName: "Acme Inc",
  balanceMicroUsd: 2_400_000,
  buyCreditsUrl: "https://accounts.locusgraph.com/billing/credits",
  overrides: {
    heading: "Budget running low",
    body: (p) => \`\${p.organizationName} has \${formatMicroUsd(p.balanceMicroUsd)} left in its budget.\`,
    button: "Add budget",
  },
});`;

export const outOfCreditsCode = `import { lowCreditsEmail } from "@locusgraph/email";

const { subject, html, text } = lowCreditsEmail({
  organizationName: "Acme Inc",
  balanceMicroUsd: 0,
  buyCreditsUrl: "https://accounts.locusgraph.com/billing/credits",
});`;

export const plainTextCode = `import { receiptEmail } from "@locusgraph/email";

const { subject, html, text } = receiptEmail({
  organizationName: "Acme Inc",
  description: "Pro plan, October",
  amountCents: 4000,
  paidOn: "Oct 1, 2026",
  receiptUrl: "https://pay.stripe.com/receipts/example",
});

await mailer.send({ subject, html, text });`;

import {
  createEmails,
  EmailButton,
  EmailHeading,
  EmailLabel,
  EmailLayout,
  EmailRows,
  EmailText,
  emailProducts,
  formatMicroUsd,
  lowCreditsEmail,
} from "@locusgraph/email";
import { defineDemo, select } from "../../../registry/define-demo";
import { EmailFrame, KitPreview, PlainTextPart } from "./email/email-frame";
import {
  brandOnceCode,
  outOfCreditsCode,
  overrideTextCode,
  plainTextCode,
} from "./email/example-code";
import { emailTemplates, renderSampleEmail, templateCode } from "./email/samples";

const outOfCreditsEmail = lowCreditsEmail({
  organizationName: "Acme Inc",
  balanceMicroUsd: 0,
  buyCreditsUrl: "https://accounts.locusgraph.com/billing/credits",
});

function ComposeFromKit() {
  return (
    <KitPreview subject="acme-customers is ready">
      <EmailLayout preview="Your graph acme-customers is ready">
        <EmailLabel>Graphs</EmailLabel>
        <EmailHeading>acme-customers is ready</EmailHeading>
        <EmailText>Agents can now write to it with the key you created.</EmailText>
        <EmailRows
          rows={[
            ["Graph", "acme-customers"],
            ["Region", "us-east"],
          ]}
        />
        <EmailButton href="https://accounts.locusgraph.com/graphs">Open the graph</EmailButton>
      </EmailLayout>
    </KitPreview>
  );
}

const brandedWelcome = createEmails({
  product: "spendgraph",
  brand: { name: "Acme Cloud", wordmark: ["acme", "cloud"] },
  overrides: { welcome: { body: "Connect your first agent to start tracking spend." } },
}).welcome({
  userName: "Dana Rivera",
  dashboardUrl: "https://app.acme.com",
  docsUrl: "https://docs.acme.com",
});

function BrandOnce() {
  return <EmailFrame email={brandedWelcome} />;
}

const budgetEmail = lowCreditsEmail({
  organizationName: "Acme Inc",
  balanceMicroUsd: 2_400_000,
  buyCreditsUrl: "https://accounts.locusgraph.com/billing/credits",
  overrides: {
    heading: "Budget running low",
    body: (p) =>
      `${p.organizationName} has ${formatMicroUsd(p.balanceMicroUsd)} left in its budget.`,
    button: "Add budget",
  },
});

function OverrideText() {
  return <EmailFrame email={budgetEmail} />;
}

function OutOfCredits() {
  return <EmailFrame email={outOfCreditsEmail} />;
}

function PlainText() {
  return <PlainTextPart email={renderSampleEmail("receipt")} />;
}

export default defineDemo({
  title: "Email",
  description:
    "The branded email kit from @locusgraph/email: a 560px layout with the product mark and wordmark, a mono label, a heading, body text, ruled rows and one pill button, all with inline styles from tokens. Twenty templates cover account, organization, members, keys, billing, usage and agent approval; each returns a subject, HTML and a plain text part. Pass `product`, a `brand` override for the logo, name and wordmark, and `overrides` for any text slot, or set them once with `createEmails`. Every template also gets a raw link under its button and, for security emails, a calm footer.",
  controls: {
    template: select(emailTemplates, "invitation"),
    product: select(emailProducts, "locusgraph"),
  },
  playground: ({ template, product }) => (
    <EmailFrame email={renderSampleEmail(template, product)} />
  ),
  code: ({ template, product }) => templateCode(template, product),
  props: [
    { name: "welcomeEmail", type: "(props: WelcomeEmailProps) => RenderedEmail" },
    {
      name: "emailVerificationEmail",
      type: "(props: EmailVerificationEmailProps) => RenderedEmail",
    },
    { name: "paymentFailedEmail", type: "(props: PaymentFailedEmailProps) => RenderedEmail" },
    { name: "planChangedEmail", type: "(props: PlanChangedEmailProps) => RenderedEmail" },
    {
      name: "spendLimitReachedEmail",
      type: "(props: SpendLimitReachedEmailProps) => RenderedEmail",
    },
    {
      name: "approvalRequestedEmail",
      type: "(props: ApprovalRequestedEmailProps) => RenderedEmail",
    },
    { name: "invitationEmail", type: "(props: InvitationEmailProps) => RenderedEmail" },
    { name: "receiptEmail", type: "(props: ReceiptEmailProps) => RenderedEmail" },
    { name: "lowCreditsEmail", type: "(props: LowCreditsEmailProps) => RenderedEmail" },
    { name: "usageOverPlanEmail", type: "(props: UsageOverPlanEmailProps) => RenderedEmail" },
    { name: "usageWarningEmail", type: "(props: UsageWarningEmailProps) => RenderedEmail" },
    { name: "usageSummaryEmail", type: "(props: UsageSummaryEmailProps) => RenderedEmail" },
    {
      name: "invitationAcceptedEmail",
      type: "(props: InvitationAcceptedEmailProps) => RenderedEmail",
    },
    { name: "roleChangedEmail", type: "(props: RoleChangedEmailProps) => RenderedEmail" },
    { name: "memberRemovedEmail", type: "(props: MemberRemovedEmailProps) => RenderedEmail" },
    {
      name: "ownershipTransferredEmail",
      type: "(props: OwnershipTransferredEmailProps) => RenderedEmail",
    },
    {
      name: "organizationDeletedEmail",
      type: "(props: OrganizationDeletedEmailProps) => RenderedEmail",
    },
    { name: "keyCreatedEmail", type: "(props: KeyCreatedEmailProps) => RenderedEmail" },
    { name: "keyRevokedEmail", type: "(props: KeyRevokedEmailProps) => RenderedEmail" },
    { name: "keyExpiringEmail", type: "(props: KeyExpiringEmailProps) => RenderedEmail" },
    {
      name: "product",
      type: '"locusgraph" | "spendgraph"',
      defaultValue: '"locusgraph"',
    },
    {
      name: "brand",
      type: "Partial<{ name; wordmark: [bold, light]; markUrl; markWidth; markHeight }>",
    },
    {
      name: "createEmails",
      type: "(defaults?: { product?; brand?; overrides? }) => BrandedEmails",
    },
    { name: "renderEmail", type: "(subject: string, email: ReactElement) => RenderedEmail" },
    { name: "RenderedEmail", type: "{ subject: string; html: string; text: string }" },
  ],
  examples: {
    ComposeFromKit: {
      description:
        "A new email built from the kit: `EmailLayout`, `EmailLabel`, `EmailHeading`, `EmailText`, `EmailRows`, `EmailLink` and `EmailButton`, rendered with `renderEmail`.",
      component: ComposeFromKit,
    },
    BrandOnce: {
      description:
        "`createEmails` sets the product, brand and per-template `overrides` once and returns every template under a short name, so `emails.welcome(...)` needs only its own props.",
      component: BrandOnce,
      code: brandOnceCode,
    },
    OverrideText: {
      description:
        "`overrides` replaces any text slot (`label`, `heading`, `body`, `button`, `note`, `footer`, `subject`, `preview`) with a string or a function of the props and `brandName`. Slots left out keep the default; an empty string removes one.",
      component: OverrideText,
      code: overrideTextCode,
    },
    OutOfCredits: {
      description: "`lowCreditsEmail` with a zero balance switches to the out-of-credits copy.",
      component: OutOfCredits,
      code: outOfCreditsCode,
    },
    PlainText: {
      description: "Every template also renders a plain text part for clients that block HTML.",
      component: PlainText,
      code: plainTextCode,
    },
  },
  isNew: true,
});

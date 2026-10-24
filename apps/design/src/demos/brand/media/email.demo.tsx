import {
  EmailButton,
  EmailHeading,
  EmailLabel,
  EmailLayout,
  EmailRows,
  EmailText,
  lowCreditsEmail,
} from "@locusgraph/email";
import { defineDemo, select } from "../../../registry/define-demo";
import { EmailFrame, KitPreview, PlainTextPart } from "./email/email-frame";
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

function OutOfCredits() {
  return <EmailFrame email={outOfCreditsEmail} />;
}

function PlainText() {
  return <PlainTextPart email={renderSampleEmail("receipt")} />;
}

export default defineDemo({
  title: "Email",
  description:
    "The branded email kit from @locusgraph/email: a 560px layout with the wordmark, a mono label, a heading, body text, ruled rows and one pill button, all with inline styles from tokens. Each template returns a subject, HTML and a plain text part.",
  controls: { template: select(emailTemplates, "invitation") },
  playground: ({ template }) => <EmailFrame email={renderSampleEmail(template)} />,
  code: ({ template }) =>
    `import { ${templateCode[template].split("(")[0]} } from "@locusgraph/email";\n\nconst { subject, html, text } = ${templateCode[template]};`,
  props: [
    { name: "invitationEmail", type: "(props: InvitationEmailProps) => RenderedEmail" },
    { name: "receiptEmail", type: "(props: ReceiptEmailProps) => RenderedEmail" },
    { name: "lowCreditsEmail", type: "(props: LowCreditsEmailProps) => RenderedEmail" },
    { name: "usageOverPlanEmail", type: "(props: UsageOverPlanEmailProps) => RenderedEmail" },
    { name: "renderEmail", type: "(subject: string, email: ReactElement) => RenderedEmail" },
    { name: "RenderedEmail", type: "{ subject: string; html: string; text: string }" },
  ],
  examples: {
    ComposeFromKit: {
      description:
        "A new email built from the kit: `EmailLayout`, `EmailLabel`, `EmailHeading`, `EmailText`, `EmailRows` and `EmailButton`, rendered with `renderEmail`.",
      component: ComposeFromKit,
    },
    OutOfCredits: {
      description: "`lowCreditsEmail` with a zero balance switches to the out-of-credits copy.",
      component: OutOfCredits,
    },
    PlainText: {
      description: "Every template also renders a plain text part for clients that block HTML.",
      component: PlainText,
    },
  },
  isNew: true,
});

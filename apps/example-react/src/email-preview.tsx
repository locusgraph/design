import { invitationEmail, receiptEmail } from "@locusgraph/email";
import { useMemo } from "react";

export function EmailPreview() {
  const emails = useMemo(
    () => [
      invitationEmail({
        organizationName: "Acme Inc",
        inviterName: "Dana Rivera",
        role: "member",
        acceptUrl: "https://accounts.locusgraph.com/invite/example",
        expiresOn: "Oct 24, 2026",
      }),
      receiptEmail({
        organizationName: "Acme Inc",
        description: "Pro plan, October",
        amountCents: 4000,
        paidOn: "Oct 1, 2026",
        receiptUrl: "https://pay.stripe.com/receipts/example",
      }),
    ],
    []
  );
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {emails.map((email) => (
        <section key={email.subject} className="flex flex-col gap-2">
          <p className="font-mono text-[11.5px] text-muted-foreground">{email.subject}</p>
          <iframe title={email.subject} srcDoc={email.html} className="h-[520px] w-full border" />
        </section>
      ))}
    </div>
  );
}

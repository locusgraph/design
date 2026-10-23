"use client";

import { invitationEmail, lowCreditsEmail } from "@locusgraph/email";
import { useMemo } from "react";

export function EmailPreviews() {
  const emails = useMemo(
    () => [
      invitationEmail({
        organizationName: "Acme Inc",
        inviterName: "Dana Rivera",
        role: "member",
        acceptUrl: "https://accounts.locusgraph.com/invite/example",
        expiresOn: "Oct 24, 2026",
      }),
      lowCreditsEmail({
        organizationName: "Acme Inc",
        balanceMicroUsd: 1_000_000,
        buyCreditsUrl: "https://accounts.locusgraph.com/billing",
      }),
    ],
    []
  );
  return emails.map((email) => (
    <section key={email.subject} className="flex flex-col gap-2">
      <p className="font-mono text-2xs text-muted-foreground">{email.subject}</p>
      <iframe title={email.subject} srcDoc={email.html} className="h-[520px] w-full border" />
    </section>
  ));
}

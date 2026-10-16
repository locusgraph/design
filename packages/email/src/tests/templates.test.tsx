import { describe, expect, it } from "vitest";
import { invitationEmail, lowCreditsEmail, receiptEmail, usageOverPlanEmail } from "../index";

describe("email templates", () => {
  it("renders an invitation with subject, html and a text version holding the link", () => {
    const email = invitationEmail({
      organizationName: "Acme Inc",
      inviterName: "Dana",
      role: "member",
      acceptUrl: "https://accounts.locusgraph.com/invite/abc",
      expiresOn: "Oct 24, 2026",
    });
    expect(email.subject).toBe("Join Acme Inc on LocusGraph");
    expect(email.html.startsWith("<!DOCTYPE html><html")).toBe(true);
    expect(email.html).toContain('href="https://accounts.locusgraph.com/invite/abc"');
    expect(email.text).toContain("Accept invitation: https://accounts.locusgraph.com/invite/abc");
    expect(email.text).not.toContain("<");
  });

  it("formats money in receipts and credit emails", () => {
    expect(
      receiptEmail({
        organizationName: "Acme",
        description: "Pro plan",
        amountCents: 4000,
        paidOn: "Oct 1, 2026",
        receiptUrl: "https://r",
      }).subject
    ).toBe("Receipt: $40.00 for Acme");
    expect(
      lowCreditsEmail({
        organizationName: "Acme",
        balanceMicroUsd: 1_000_000,
        buyCreditsUrl: "https://b",
      }).html
    ).toContain("$1.00 of credits left");
    expect(
      lowCreditsEmail({ organizationName: "Acme", balanceMicroUsd: 0, buyCreditsUrl: "https://b" })
        .subject
    ).toBe("You are out of credits on Acme");
  });

  it("lists every quota over the plan", () => {
    const email = usageOverPlanEmail({
      organizationName: "Acme",
      usageUrl: "https://u",
      quotas: [
        { key: "spendgraph.events", used: 10450, included: 10000, periodLabel: "this month" },
      ],
    });
    expect(email.text).toContain("spendgraph.events 10,450 of 10,000 this month");
  });

  it("uses only inline styles and square containers", () => {
    const { html } = receiptEmail({
      organizationName: "Acme",
      description: "Credits",
      amountCents: 1000,
      paidOn: "x",
      receiptUrl: "https://r",
    });
    expect(html).not.toContain("class=");
    expect(html).toContain("border-radius:9999px");
  });
});

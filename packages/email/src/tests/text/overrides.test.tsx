import { describe, expect, it } from "vitest";
import { createEmails, formatMicroUsd, lowCreditsEmail } from "../../index";

const credits = {
  organizationName: "Acme",
  balanceMicroUsd: 2_400_000,
  buyCreditsUrl: "https://b",
};

describe("text overrides", () => {
  it("replaces only the slots it names and keeps the rest", () => {
    const email = lowCreditsEmail({
      ...credits,
      overrides: { heading: "Budget running low", button: "Add budget" },
    });
    expect(email.html).toContain("Budget running low");
    expect(email.text).toContain("Add budget: https://b");
    expect(email.text).toContain("Add credits so paid usage for Acme does not stop.");
  });

  it("passes the props and brand name to a slot function", () => {
    const email = lowCreditsEmail({
      ...credits,
      product: "spendgraph",
      overrides: {
        body: (p) =>
          `${p.organizationName} has ${formatMicroUsd(p.balanceMicroUsd)} left on ${p.brandName}.`,
      },
    });
    expect(email.text).toContain("Acme has $2.40 left on SpendGraph.");
  });

  it("removes a slot when the override is an empty string", () => {
    const email = lowCreditsEmail({ ...credits, overrides: { button: "" } });
    expect(email.html).not.toContain('href="https://b"');
    expect(email.text).not.toContain("https://b");
  });

  it("sets overrides once per template in createEmails and lets one call win", () => {
    const emails = createEmails({
      product: "spendgraph",
      overrides: { lowCredits: { heading: "Budget running low", button: "Add budget" } },
    });
    const fromDefaults = emails.lowCredits(credits);
    expect(fromDefaults.html).toContain("Budget running low");
    const fromCall = emails.lowCredits({ ...credits, overrides: { button: "Top up" } });
    expect(fromCall.text).toContain("Top up: https://b");
    expect(fromCall.html).toContain("Budget running low");
    expect(
      emails.receipt({
        organizationName: "Acme",
        description: "Pro",
        amountCents: 100,
        paidOn: "x",
        receiptUrl: "https://r",
      }).text
    ).toContain("View receipt: https://r");
  });
});

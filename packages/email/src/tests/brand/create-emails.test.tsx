import { describe, expect, it } from "vitest";
import { createEmails, emailAssetsOrigin, emailTemplates } from "../../index";

const emails = createEmails({
  product: "spendgraph",
  brand: { markUrl: "https://cdn.example.com/mark.png", markWidth: 32, markHeight: 32 },
});

const welcome = { userName: "Dana", dashboardUrl: "https://d", docsUrl: "https://docs" };

describe("createEmails", () => {
  it("binds every template under a short name", () => {
    expect(Object.keys(emails).sort()).toEqual(Object.keys(emailTemplates).sort());
  });

  it("applies the product and brand set once to every email", () => {
    const { subject, html } = emails.welcome(welcome);
    expect(subject).toBe("Welcome to SpendGraph");
    expect(html).toContain('src="https://cdn.example.com/mark.png" width="32" height="32"');
    expect(html).toContain("<strong>spend</strong>");
    const failed = emails.paymentFailed({
      organizationName: "Acme",
      amountCents: 4000,
      failedOn: "Nov 1, 2026",
      billingUrl: "https://b",
    });
    expect(failed.html).toContain("https://cdn.example.com/mark.png");
  });

  it("lets one call override the product or merge in its own brand fields", () => {
    const { subject, html } = emails.welcome({
      ...welcome,
      product: "locusgraph",
      brand: { name: "Acme Cloud" },
    });
    expect(subject).toBe("Welcome to Acme Cloud");
    expect(html).toContain("https://cdn.example.com/mark.png");
    expect(html).toContain("<strong>locus</strong>");
  });

  it("falls back to the LocusGraph brand with no defaults", () => {
    const { html } = createEmails().welcome(welcome);
    expect(html).toContain(`${emailAssetsOrigin}/email/locusgraph-mark.png`);
  });
});

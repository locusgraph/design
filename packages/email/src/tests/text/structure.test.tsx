import { describe, expect, it } from "vitest";
import { keyCreatedEmail, paymentFailedEmail, renderEmail } from "../../index";
import { EmailButton } from "../../kit/parts";

const failed = {
  organizationName: "Acme",
  amountCents: 4000,
  failedOn: "Nov 1, 2026",
  billingUrl: "https://accounts.locusgraph.com/billing/",
};

describe("email structure", () => {
  it("previews the next step instead of repeating the subject", () => {
    const { subject, html } = paymentFailedEmail(failed);
    expect(html).toContain("Update your payment method to keep your plan active");
    expect(html).not.toContain(`display:none;max-height:0;overflow:hidden">${subject}`);
  });

  it("shows the raw link under the button for clients that hide it", () => {
    const { html } = paymentFailedEmail(failed);
    expect(html).toContain("Or open:");
    expect(html).toContain(">accounts.locusgraph.com/billing</a>");
  });

  it("orders plain text as heading, body, action, facts, then the brand", () => {
    const { text } = paymentFailedEmail(failed);
    expect(text.startsWith("Payment failed\n\nWe could not charge $40.00 for Acme.")).toBe(true);
    expect(text.indexOf("Update payment:")).toBeLessThan(text.indexOf("Amount: $40.00"));
    expect(text.endsWith("—\nLocusGraph")).toBe(true);
    expect(text).not.toContain("Or open");
  });

  it("adds a calm footer to security emails", () => {
    const { text } = keyCreatedEmail({
      organizationName: "Acme",
      keyName: "ci",
      createdBy: "Dana",
      createdOn: "Nov 3, 2026",
      keysUrl: "https://k",
      product: "spendgraph",
    });
    expect(text).toContain(
      "If you did not expect this, reply to this email to reach SpendGraph support."
    );
  });

  it("shows a relative or mailto link as written instead of failing", () => {
    const relative = renderEmail("Hi", <EmailButton href="/billing">Go</EmailButton>);
    expect(relative.html).toContain(">/billing</a>");
    const mailto = renderEmail(
      "Hi",
      <EmailButton href="mailto:billing@acme.com">Mail</EmailButton>
    );
    expect(mailto.html).toContain(">billing@acme.com</a>");
  });

  it("keeps the raw link out of plain text for emails built with renderEmail", () => {
    const { text } = renderEmail("Hi", <EmailButton href="https://x.com/a">Go</EmailButton>);
    expect(text).toBe("Go: https://x.com/a");
  });
});

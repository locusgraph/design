import { describe, expect, it } from "vitest";
import {
  approvalRequestedEmail,
  emailVerificationEmail,
  paymentFailedEmail,
  planChangedEmail,
  spendLimitReachedEmail,
} from "../index";

describe("lifecycle emails", () => {
  it("puts the verification code in the subject and links to verify", () => {
    const verification = emailVerificationEmail({
      code: "482913",
      verifyUrl: "https://v",
      expiresInMinutes: 30,
    });
    expect(verification.subject).toBe("482913 is your LocusGraph verification code");
    expect(verification.text).toContain("Verify email: https://v");
    expect(verification.text).toContain("It expires in 30 minutes.");
  });

  it("asks for a new payment method and lists only the rows it has", () => {
    const failed = paymentFailedEmail({
      organizationName: "Acme",
      amountCents: 4000,
      failedOn: "Nov 1, 2026",
      reason: "Card declined",
      billingUrl: "https://b",
    });
    expect(failed.subject).toBe("Payment failed for Acme");
    expect(failed.text).toContain("Reason: Card declined");
    expect(failed.text).not.toContain("Next try");
    expect(failed.text).toContain("Update payment: https://b");
  });

  it("shows the old and new plan", () => {
    const changed = planChangedEmail({
      organizationName: "Acme",
      previousPlan: "Free",
      newPlan: "Pro",
      effectiveOn: "Nov 4, 2026",
      changedBy: "Dana",
      billingUrl: "https://b",
    });
    expect(changed.subject).toBe("Acme plan changed to Pro");
    expect(changed.text).toContain("Previous plan: Free");
  });

  it("says requests are paused at the spend limit", () => {
    const limit = spendLimitReachedEmail({
      organizationName: "Acme",
      limitCents: 10000,
      reachedOn: "Nov 4, 2026",
      resetsOn: "Dec 1, 2026",
      limitsUrl: "https://l",
    });
    expect(limit.subject).toBe("Acme reached its spend limit");
    expect(limit.text).toContain("spend limit of $100.00");
  });

  it("asks a person to review a paused agent action", () => {
    const approval = approvalRequestedEmail({
      organizationName: "Acme",
      agentName: "Deploy bot",
      action: "Delete graph prod-memory",
      requestedOn: "Nov 4, 2026, 10:42",
      reviewUrl: "https://r",
    });
    expect(approval.subject).toBe("Deploy bot is waiting for your approval");
    expect(approval.text).toContain("Action: Delete graph prod-memory");
    expect(approval.text).not.toContain("Expires");
  });
});

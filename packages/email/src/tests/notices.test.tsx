import { describe, expect, it } from "vitest";
import {
  invitationAcceptedEmail,
  keyCreatedEmail,
  keyExpiringEmail,
  keyRevokedEmail,
  memberRemovedEmail,
  organizationDeletedEmail,
  ownershipTransferredEmail,
  roleChangedEmail,
  usageSummaryEmail,
  usageWarningEmail,
} from "../index";

const keys = { organizationName: "Acme", keyName: "ci-deploy", keysUrl: "https://k" };

describe("notice emails", () => {
  it("names the key, who acted and links to the keys page", () => {
    const created = keyCreatedEmail({ ...keys, createdBy: "Dana", createdOn: "Nov 3, 2026" });
    expect(created.subject).toBe("New API key ci-deploy on Acme");
    expect(created.text).toContain("Review keys: https://k");
    const revoked = keyRevokedEmail({ ...keys, revokedBy: "Dana", revokedOn: "Nov 3, 2026" });
    expect(revoked.subject).toBe("API key ci-deploy revoked on Acme");
    const expiring = keyExpiringEmail({ ...keys, expiresOn: "Nov 10, 2026" });
    expect(expiring.subject).toBe("API key ci-deploy expires on Nov 10, 2026");
    expect(expiring.text).toContain("Create a new key: https://k");
  });

  it("tells members about joins, removals, role changes, new owners and deletion", () => {
    expect(
      invitationAcceptedEmail({
        organizationName: "Acme",
        memberName: "Sam",
        role: "admin",
        membersUrl: "https://m",
      }).text
    ).toContain("joined Acme as an admin.");
    expect(memberRemovedEmail({ organizationName: "Acme", removedBy: "Dana" }).subject).toBe(
      "You were removed from Acme"
    );
    expect(
      roleChangedEmail({
        organizationName: "Acme",
        role: "owner",
        changedBy: "Dana",
        organizationUrl: "https://o",
      }).subject
    ).toBe("You are now an owner of Acme");
    expect(
      ownershipTransferredEmail({
        organizationName: "Acme",
        previousOwnerName: "Dana",
        newOwnerName: "Sam",
        transferredOn: "Nov 3, 2026",
        organizationUrl: "https://o",
      }).subject
    ).toBe("Sam now owns Acme");
    const deleted = organizationDeletedEmail({
      organizationName: "Acme",
      deletedBy: "Dana",
      deletedOn: "Nov 3, 2026",
    });
    expect(deleted.subject).toBe("Acme was deleted");
    expect(deleted.html).not.toContain("<a ");
  });

  it("warns before the plan runs out and sums up a month", () => {
    const warning = usageWarningEmail({
      organizationName: "Acme",
      percentUsed: 80,
      usageUrl: "https://u",
      quotas: [{ key: "events", used: 8000, included: 10000, periodLabel: "this month" }],
    });
    expect(warning.subject).toBe("Acme used 80% of its plan");
    expect(warning.text).toContain("events: 8,000 of 10,000 this month");
    const summary = usageSummaryEmail({
      organizationName: "Acme",
      periodLabel: "October 2026",
      rows: [["Memory writes", "124,000"]],
      usageUrl: "https://u",
    });
    expect(summary.subject).toBe("Acme usage for October 2026");
    expect(summary.text).toContain("Memory writes: 124,000");
  });
});

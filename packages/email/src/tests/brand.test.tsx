import { describe, expect, it } from "vitest";
import { emailAssetsOrigin, invitationEmail, lowCreditsEmail } from "../index";

const invitation = {
  organizationName: "Acme",
  inviterName: "Dana",
  role: "member",
  acceptUrl: "https://accounts.locusgraph.com/",
  expiresOn: "Oct 24, 2026",
};

describe("email brand", () => {
  it("shows the LocusGraph mark and wordmark by default", () => {
    const { html, text } = invitationEmail(invitation);
    expect(html).toContain(`src="${emailAssetsOrigin}/email/locusgraph-mark.png"`);
    expect(html).toContain("<strong>locus</strong>");
    expect(text.startsWith("locusgraph")).toBe(true);
  });

  it("brands a SpendGraph email with its own mark, wordmark and name", () => {
    const email = invitationEmail({ ...invitation, product: "spendgraph" });
    expect(email.subject).toBe("Join Acme on SpendGraph");
    expect(email.html).toContain(`src="${emailAssetsOrigin}/email/spendgraph-mark.png"`);
    expect(email.html).toContain("<strong>spend</strong>");
    expect(email.html).not.toContain("LocusGraph");
  });

  it("keeps the mark decorative so the wordmark is what screen readers and blocked images show", () => {
    const { html } = lowCreditsEmail({
      organizationName: "Acme",
      balanceMicroUsd: 0,
      buyCreditsUrl: "https://b",
      product: "spendgraph",
    });
    expect(html).toContain('alt=""');
    expect(html).toContain('<span style="font-weight:300">graph</span>');
  });
});

import { describe, expect, it } from "vitest";
import { welcomeEmail } from "../index";

describe("account emails", () => {
  it("welcomes a new user by name and links to the dashboard", () => {
    const welcome = welcomeEmail({
      userName: "Dana",
      dashboardUrl: "https://d",
      docsUrl: "https://docs",
    });
    expect(welcome.subject).toBe("Welcome to LocusGraph");
    expect(welcome.text).toContain("Welcome, Dana");
    expect(welcome.text).toContain("Open dashboard: https://d");
    expect(welcome.text).toContain("Read the docs for a quick start and guides: https://docs");
  });

  it("names the product a SpendGraph user signed up for", () => {
    const welcome = welcomeEmail({
      product: "spendgraph",
      userName: "Dana",
      dashboardUrl: "https://d",
      docsUrl: "https://docs",
    });
    expect(welcome.subject).toBe("Welcome to SpendGraph");
    expect(welcome.text).toContain("Your SpendGraph account is ready.");
  });

  it("replaces the body when the app passes an override", () => {
    const welcome = welcomeEmail({
      product: "spendgraph",
      userName: "Dana",
      dashboardUrl: "https://d",
      docsUrl: "https://docs",
      overrides: { body: "Connect your first agent to start tracking spend." },
    });
    expect(welcome.text).toContain("Connect your first agent to start tracking spend.");
    expect(welcome.text).not.toContain("API key");
    expect(welcome.text).toContain("Open dashboard: https://d");
  });
});

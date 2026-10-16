import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ApprovalInbox } from "../index";
import { formatWaiting } from "../shared/time";

const now = Date.UTC(2026, 9, 17, 12, 0);
const noop = () => {};

const items = [
  {
    id: "a1",
    title: "Send invoice INV-2041",
    runName: "Billing agent",
    risk: "write" as const,
    requestedAt: now - 7 * 60_000,
    summary: "$1,240.00 to ops@acme.dev",
  },
  {
    id: "a2",
    title: "Delete 3 stale graphs",
    runName: "Graph cleanup",
    risk: "destructive" as const,
    requestedAt: now - 3 * 3_600_000,
  },
];

describe("ApprovalInbox", () => {
  it("lists pending approvals with waiting time", () => {
    const html = renderToStaticMarkup(
      <ApprovalInbox items={items} now={now} onApprove={noop} onDeny={noop} onApproveAll={noop} />
    );
    expect(html).toContain("Send invoice INV-2041");
    expect(html).toContain("7 min");
    expect(html).toContain("3 h");
    expect(html).toContain("Approve selected");
    expect(html).toContain("Destructive requests are approved one at a time.");
  });

  it("shows an empty state", () => {
    const html = renderToStaticMarkup(
      <ApprovalInbox items={[]} onApprove={noop} onDeny={noop} onApproveAll={noop} />
    );
    expect(html).toContain('data-slot="approval-inbox-empty"');
    expect(html).toContain("Nothing waiting for you");
    expect(html).not.toContain("Approve selected");
  });

  it("formats waiting time", () => {
    expect(formatWaiting(now - 10_000, now)).toBe("just now");
    expect(formatWaiting(now - 2 * 86_400_000, now)).toBe("2 d");
  });
});

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Inbox } from "../index";
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

describe("Inbox", () => {
  it("lists pending approvals with waiting time", () => {
    const html = renderToStaticMarkup(
      <Inbox items={items} now={now} onOpen={noop} onApproveAll={noop} />
    );
    expect(html).toContain("Send invoice INV-2041");
    expect(html).toContain("7 min");
    expect(html).toContain("3 h");
    expect(html).toContain("Approve selected");
    expect(html).toContain('data-slot="inbox-open"');
    expect(html).not.toContain("Approve Send invoice");
    expect(html).toContain("Destructive requests are approved one at a time.");
  });

  it("drops the bulk controls when every request is destructive", () => {
    const html = renderToStaticMarkup(
      <Inbox items={[items[1]]} now={now} onOpen={noop} onApproveAll={noop} />
    );
    expect(html).not.toContain("Approve selected");
    expect(html).not.toContain("Select all");
    expect(html).toContain("Destructive requests are approved one at a time.");
  });

  it("shows an empty state", () => {
    const html = renderToStaticMarkup(<Inbox items={[]} onOpen={noop} onApproveAll={noop} />);
    expect(html).toContain('data-slot="inbox-empty"');
    expect(html).toContain("Nothing waiting for you");
    expect(html).not.toContain("Approve selected");
  });

  it("formats waiting time", () => {
    expect(formatWaiting(now - 10_000, now)).toBe("just now");
    expect(formatWaiting(now - 2 * 86_400_000, now)).toBe("2 d");
  });

  it("virtualizes a long queue inside its own scroll area", () => {
    const many = Array.from({ length: 200 }, (_, index) => ({
      ...items[0],
      id: `apr_${index}`,
      title: `Send invoice ${index}`,
    }));
    const html = renderToStaticMarkup(
      <Inbox items={many} now={now} onOpen={noop} onApproveAll={noop} />
    );
    const rendered = html.match(/data-slot="inbox-item"/g) ?? [];
    expect(html).toContain('data-slot="inbox-scroll"');
    expect(html).toContain("200 waiting");
    expect(rendered.length).toBeGreaterThan(0);
    expect(rendered.length).toBeLessThan(40);
    expect(html).toContain('aria-setsize="200"');
    const plain = renderToStaticMarkup(
      <Inbox items={many} now={now} virtualize={false} onOpen={noop} onApproveAll={noop} />
    );
    expect(plain.match(/data-slot="inbox-item"/g)).toHaveLength(200);
  });
});

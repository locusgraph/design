import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ThreadList } from "../index";

const threads = [
  { id: "thr_1", title: "October spend by model", updatedAt: "2026-10-16T09:30:00.000Z" },
  { id: "thr_2", title: "Graph schema for invoices", updatedAt: "2026-10-02T14:00:00.000Z" },
];

describe("ThreadList", () => {
  it("marks the active conversation and groups threads by day", () => {
    const html = renderToStaticMarkup(
      <ThreadList
        threads={threads}
        activeId="thr_2"
        now="2026-10-17T12:00:00.000Z"
        onSelect={() => {}}
      />
    );
    expect(html).toContain('data-slot="thread-list"');
    expect(html.match(/aria-current="page"/g)).toHaveLength(1);
    expect(html).toMatch(/aria-current="page"[^>]*>.*Graph schema for invoices/);
    expect(html).toContain("Yesterday");
    expect(html).toContain("Oct 2, 2026");
    expect(html).toContain("09:30");
    expect(html).not.toContain("New chat");
    expect(html).not.toContain("Options for");
  });

  it("shows new chat and item menus only with callbacks", () => {
    const html = renderToStaticMarkup(
      <ThreadList threads={threads} onSelect={() => {}} onNew={() => {}} onArchive={() => {}} />
    );
    expect(html).toContain("New chat");
    expect(html).toContain('aria-label="Options for October spend by model"');
    expect(html).not.toContain('aria-current="page"');
  });

  it("labels threads from the current day as today", () => {
    const html = renderToStaticMarkup(
      <ThreadList threads={threads} now="2026-10-16T20:00:00.000Z" onSelect={() => {}} />
    );
    expect(html).toContain("Today");
    expect(html).not.toContain("Yesterday");
  });

  it("shows the empty text without threads", () => {
    const html = renderToStaticMarkup(<ThreadList threads={[]} onSelect={() => {}} />);
    expect(html).toContain("No conversations yet.");
    expect(html).not.toContain("<ul");
  });
});

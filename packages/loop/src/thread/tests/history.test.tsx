import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { History } from "../index";

function localIso(month: number, day: number, hour: number, minute = 0) {
  return new Date(2026, month - 1, day, hour, minute).toISOString();
}

const threads = [
  { id: "thr_1", title: "October spend by model", updatedAt: localIso(10, 16, 9, 30) },
  { id: "thr_2", title: "Graph schema for invoices", updatedAt: localIso(10, 2, 14) },
];

describe("History", () => {
  it("marks the active conversation and groups threads by day", () => {
    const html = renderToStaticMarkup(
      <History threads={threads} activeId="thr_2" now={localIso(10, 17, 12)} onSelect={() => {}} />
    );
    expect(html).toContain('data-slot="history"');
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
      <History threads={threads} onSelect={() => {}} onNew={() => {}} onArchive={() => {}} />
    );
    expect(html).toContain("New chat");
    expect(html).toContain('aria-label="Options for October spend by model"');
    expect(html).not.toContain('aria-current="page"');
  });

  it("labels threads from the current day as today", () => {
    const html = renderToStaticMarkup(
      <History threads={threads} now={localIso(10, 16, 20)} onSelect={() => {}} />
    );
    expect(html).toContain("Today");
    expect(html).not.toContain("Yesterday");
  });

  it("shows the empty text without threads", () => {
    const html = renderToStaticMarkup(<History threads={[]} onSelect={() => {}} />);
    expect(html).toContain("No conversations yet.");
    expect(html).not.toContain("<ul");
  });

  it("virtualizes a long history and keeps day headings and set sizes", () => {
    const many = Array.from({ length: 400 }, (_, index) => ({
      id: `thr_${index}`,
      title: `Thread ${index}`,
      updatedAt: localIso(10, 16, 23, 0),
    }));
    const html = renderToStaticMarkup(
      <History threads={many} now={localIso(10, 17, 12)} onSelect={() => {}} />
    );
    const rendered = html.match(/data-slot="history-item"/g) ?? [];
    expect(html).toContain('data-slot="history-list"');
    expect(html).toContain("Yesterday");
    expect(rendered.length).toBeGreaterThan(0);
    expect(rendered.length).toBeLessThan(60);
    expect(html).toContain('aria-setsize="400"');
    const plain = renderToStaticMarkup(
      <History threads={many} virtualize={false} onSelect={() => {}} />
    );
    expect(plain.match(/data-slot="history-item"/g)).toHaveLength(400);
  });
});

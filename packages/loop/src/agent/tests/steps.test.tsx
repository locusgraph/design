import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { AgentStep } from "../../types";
import { Steps } from "../index";

const steps: AgentStep[] = [
  { id: "1", title: "Read the graph", status: "done" },
  { id: "2", title: "Search memory", status: "running", detail: "memory.search" },
  { id: "3", title: "Write the summary", status: "pending" },
  { id: "4", title: "Notify the owner", status: "skipped" },
  { id: "5", title: "Retry the sync", status: "failed" },
];

describe("Steps", () => {
  it("renders one item per step with its status", () => {
    const html = renderToStaticMarkup(<Steps steps={steps} title="Plan" />);
    expect(html.match(/data-slot="step"/g)).toHaveLength(5);
    for (const status of ["done", "running", "pending", "skipped", "failed"]) {
      expect(html).toContain(`data-status="${status}"`);
    }
    expect(html).toContain("1 of 5 done");
    expect(html).toContain("memory.search");
  });

  it("marks the running step as current", () => {
    const html = renderToStaticMarkup(<Steps steps={steps} />);
    expect(html.match(/aria-current="step"/g)).toHaveLength(1);
    expect(html).toMatch(/aria-current="step"[^>]*>.*Search memory/);
  });

  it("renders an empty plan", () => {
    expect(renderToStaticMarkup(<Steps steps={[]} />)).toContain("0 of 0 done");
  });
});

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { ToolPart, ToolState } from "../../types";
import { Tool, toolStateLabels } from "../index";

const base: ToolPart = {
  type: "tool-memory.search",
  toolCallId: "call_1",
  state: "input-available",
  input: { query: "billing owner", limit: 5 },
};

const expectedLabels: Record<ToolState, string> = {
  "input-streaming": "Preparing",
  "input-available": "Running",
  "approval-requested": "Waiting for approval",
  "approval-responded": "Approved",
  "output-available": "Done",
  "output-error": "Failed",
  "output-denied": "Denied",
};

describe("Tool", () => {
  it.each(Object.entries(expectedLabels))("labels %s as %s", (state, label) => {
    const html = renderToStaticMarkup(<Tool part={{ ...base, state: state as ToolState }} />);
    expect(html).toContain(label);
    expect(toolStateLabels[state as ToolState]).toBe(label);
  });

  it("names the tool from its type or toolName", () => {
    expect(renderToStaticMarkup(<Tool part={base} />)).toContain("memory.search");
    const dynamic = renderToStaticMarkup(
      <Tool part={{ ...base, type: "dynamic-tool", toolName: "graph.write" }} />
    );
    expect(dynamic).toContain("graph.write");
  });

  it("renders input and output as pretty JSON when open", () => {
    const html = renderToStaticMarkup(
      <Tool part={{ ...base, state: "output-available", output: { hits: 2 } }} defaultOpen />
    );
    expect(html).toContain("&quot;query&quot;: &quot;billing owner&quot;");
    expect(html).toContain("&quot;hits&quot;: 2");
    expect(html).toContain('aria-expanded="true"');
  });

  it("hides the JSON when closed", () => {
    expect(renderToStaticMarkup(<Tool part={base} />)).not.toContain("billing owner");
  });

  it("shows the error text in the destructive color", () => {
    const html = renderToStaticMarkup(
      <Tool part={{ ...base, state: "output-error", errorText: "Graph is read-only" }} />
    );
    expect(html).toMatch(/text-destructive[^>]*>Graph is read-only/);
  });
});

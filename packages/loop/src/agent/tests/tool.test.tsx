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

  it("names the tool in words from its type or toolName", () => {
    expect(renderToStaticMarkup(<Tool part={base} />)).toContain("memory search");
    const dynamic = renderToStaticMarkup(
      <Tool part={{ ...base, type: "dynamic-tool", toolName: "graph.write" }} />
    );
    expect(dynamic).toContain("graph write");
  });

  it("reads as a verb and a target", () => {
    const done = { ...base, state: "output-available" as const };
    expect(renderToStaticMarkup(<Tool part={done} />)).toContain("Ran ");
    const html = renderToStaticMarkup(
      <Tool part={done} verb="Searched" activeVerb="Searching" target="who owns billing" />
    );
    expect(html).toContain("Searched ");
    expect(html).toContain("who owns billing");
    expect(renderToStaticMarkup(<Tool part={base} activeVerb="Searching" />)).toContain(
      "Searching "
    );
  });

  it("marks memory tools in the memory color", () => {
    const html = renderToStaticMarkup(
      <Tool part={{ ...base, state: "output-available" }} tone="memory" />
    );
    expect(html).toContain('data-tone="memory"');
    expect(html).toMatch(/text-memory[^>]*>memory search/);
  });

  it("shows the state word only when the call did not succeed", () => {
    const done = renderToStaticMarkup(<Tool part={{ ...base, state: "output-available" }} />);
    expect(done).toMatch(/class="sr-only"[^>]*>Done/);
    const failed = renderToStaticMarkup(<Tool part={{ ...base, state: "output-error" }} />);
    expect(failed).toMatch(/text-destructive[^>]*>Failed/);
    expect(failed).not.toContain("Ran ");
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

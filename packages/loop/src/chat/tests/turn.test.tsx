import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { AgentMessage } from "../../types";
import { Turn } from "../index";
import { groupParts } from "../turn/group-parts";

const userMessage: AgentMessage = {
  id: "msg_1",
  role: "user",
  parts: [
    { type: "text", text: "Why did spend jump yesterday?" },
    {
      type: "file",
      mediaType: "text/csv",
      url: "https://files.example/spend.csv",
      filename: "spend.csv",
    },
  ],
};

const assistantMessage: AgentMessage = {
  id: "msg_2",
  role: "assistant",
  parts: [
    { type: "reasoning", text: "Compare runs by model." },
    {
      type: "tool-query_spend",
      toolCallId: "call_1",
      state: "output-error",
      errorText: "Timed out",
    },
    { type: "text", text: "The **planner** agent retried 40 times." },
    {
      type: "source-url",
      sourceId: "s1",
      url: "https://spendgraph.example/runs/42",
      title: "Run 42",
    },
    { type: "source-url", sourceId: "s2", url: "https://spendgraph.example/runs/43" },
  ],
};

describe("Turn", () => {
  it("lays out a user message on the right with its attachments", () => {
    const html = renderToStaticMarkup(<Turn message={userMessage} />);
    expect(html).toContain('data-align="end"');
    expect(html).toContain('data-role="user"');
    expect(html).toContain("Why did spend jump yesterday?");
    expect(html).toContain("spend.csv");
    expect(html).not.toContain('data-slot="reply"');
  });

  it("renders reasoning, tool calls and sources with the rich components by default", () => {
    const html = renderToStaticMarkup(<Turn message={assistantMessage} />);
    expect(html).toContain('data-align="start"');
    expect(html).toContain("<strong>planner</strong>");
    expect(html).toContain("query spend");
    expect(html).toContain("Timed out");
    expect(html).toMatch(/Used <span[^>]*>2 sources<\/span>/);
    expect(html.indexOf('data-slot="thinking"')).toBeLessThan(html.indexOf('data-slot="tool"'));
    expect(html.indexOf('data-slot="tool"')).toBeLessThan(html.indexOf("planner"));
    expect(html.match(/data-kind="sources"/g)).toHaveLength(1);
    expect(html).toContain('data-slot="sources"');
  });

  it("pulls consecutive step lines together and keeps prose apart", () => {
    const html = renderToStaticMarkup(<Turn message={assistantMessage} />);
    expect(html).toMatch(/data-kind="tool" data-follows-line="true"/);
    expect(html).not.toMatch(/data-kind="reasoning" data-follows-line/);
    expect(html).not.toMatch(/data-kind="text" data-follows-line/);
  });

  it("uses render props for reasoning, tools and sources when given", () => {
    const html = renderToStaticMarkup(
      <Turn
        message={assistantMessage}
        renderReasoning={(part) => <i>rich {part.text}</i>}
        renderTool={(part) => <i>rich {part.toolCallId}</i>}
        renderSources={(parts) => <i>rich {parts.length} sources</i>}
      />
    );
    expect(html).toContain("rich Compare runs by model.");
    expect(html).toContain("rich call_1");
    expect(html).toContain("rich 2 sources");
    expect(html).not.toContain('data-slot="message-tool"');
  });
});

describe("groupParts", () => {
  it("numbers a later run of sources after the earlier ones", () => {
    const source = (sourceId: string) => ({
      type: "source-url" as const,
      sourceId,
      url: `https://${sourceId}.example`,
    });
    const segments = groupParts([
      source("a"),
      source("b"),
      { type: "text", text: "Two sources so far." },
      source("c"),
    ]);
    const firstIndexes = segments.flatMap((segment) =>
      segment.kind === "sources" ? [segment.firstIndex] : []
    );
    expect(firstIndexes).toEqual([1, 3]);
  });
});

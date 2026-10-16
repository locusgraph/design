import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { AgentMessage } from "../../types";
import { Turn } from "../index";

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
    expect(html).toContain("query_spend");
    expect(html).toContain("Timed out");
    expect(html).toContain("Used 2 sources");
    expect(html.indexOf('data-slot="thinking"')).toBeLessThan(html.indexOf('data-slot="tool"'));
    expect(html.indexOf('data-slot="tool"')).toBeLessThan(html.indexOf("planner"));
    expect(html.match(/data-kind="sources"/g)).toHaveLength(1);
    expect(html).toContain('data-slot="sources"');
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

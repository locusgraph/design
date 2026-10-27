import { describe, expect, it } from "vitest";
import { htmlToMarkdown } from "../../src/agent-docs/guide-markdown";

describe("htmlToMarkdown", () => {
  it("turns headings, lists, inline code and site links into Markdown", () => {
    const html =
      '<article><h1>Guide</h1><p>Use <code>gate.ask</code> with <a href="/loop/approval/approval">Approval</a>.</p><ul><li>One</li><li>Two</li></ul></article>';
    expect(htmlToMarkdown(html)).toBe(
      "# Guide\n\nUse `gate.ask` with [Approval](https://design.locusgraph.com/loop/approval/approval).\n\n- One\n- Two"
    );
  });

  it("keeps code blocks verbatim and drops buttons", () => {
    const html =
      '<div><pre class="shiki"><code>&lt;Chat /&gt;\n  &amp;&amp; ok</code></pre><button aria-label="Copy code"><svg></svg></button></div>';
    expect(htmlToMarkdown(html)).toBe("```\n<Chat />\n  && ok\n```");
  });
});

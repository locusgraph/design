import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { closeOpenCodeFence, Reply } from "../index";

const table = "| Model | Cost |\n| --- | --- |\n| gpt-5 | $4.20 |\n";

describe("Reply", () => {
  it("streams markdown with a table and marks itself busy", () => {
    const html = renderToStaticMarkup(
      <Reply state="streaming">{`Spend by model:\n\n${table}`}</Reply>
    );
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('data-state="streaming"');
    expect(html).toContain("<table");
    expect(html).toContain("<th");
    expect(html).toContain("gpt-5");
  });

  it("clears busy when done and opens links in a new tab", () => {
    const html = renderToStaticMarkup(
      <Reply>{"- one\n- [LocusGraph](https://locusgraph.com)\n\n`inline`"}</Reply>
    );
    expect(html).not.toContain("aria-busy");
    expect(html).toContain("<ul");
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("<code");
  });

  it("closes an open code fence while streaming so the block does not jump", () => {
    expect(closeOpenCodeFence("```ts\nconst a = 1")).toBe("```ts\nconst a = 1\n```");
    expect(closeOpenCodeFence("```ts\nconst a = 1\n```")).toBe("```ts\nconst a = 1\n```");
    const html = renderToStaticMarkup(<Reply state="streaming">{"```ts\nconst a = 1"}</Reply>);
    expect(html).toContain("<pre");
  });
});

describe("Reply code blocks", () => {
  it("renders fenced code through Code with its language", () => {
    const html = renderToStaticMarkup(<Reply>{"Run this:\n\n```ts\nconst cost = 42;\n```"}</Reply>);
    expect(html).toContain('data-slot="code"');
    expect(html).toContain('data-language="ts"');
    expect(html).toContain("const cost = 42;");
  });
});

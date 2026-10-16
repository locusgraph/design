import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { closeOpenCodeFence, Response } from "../index";

const table = "| Model | Cost |\n| --- | --- |\n| gpt-5 | $4.20 |\n";

describe("Response", () => {
  it("streams markdown with a table and announces politely", () => {
    const html = renderToStaticMarkup(
      <Response state="streaming">{`Spend by model:\n\n${table}`}</Response>
    );
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain('data-state="streaming"');
    expect(html).toContain("<table");
    expect(html).toContain("<th");
    expect(html).toContain("gpt-5");
  });

  it("stops announcing when done and opens links in a new tab", () => {
    const html = renderToStaticMarkup(
      <Response>{"- one\n- [LocusGraph](https://locusgraph.com)\n\n`inline`"}</Response>
    );
    expect(html).not.toContain("aria-live");
    expect(html).toContain("<ul");
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("<code");
  });

  it("closes an open code fence while streaming so the block does not jump", () => {
    expect(closeOpenCodeFence("```ts\nconst a = 1")).toBe("```ts\nconst a = 1\n```");
    expect(closeOpenCodeFence("```ts\nconst a = 1\n```")).toBe("```ts\nconst a = 1\n```");
    const html = renderToStaticMarkup(
      <Response state="streaming">{"```ts\nconst a = 1"}</Response>
    );
    expect(html).toContain("<pre");
  });
});

describe("Response code blocks", () => {
  it("renders fenced code through CodeBlock with its language", () => {
    const html = renderToStaticMarkup(
      <Response>{"Run this:\n\n```ts\nconst cost = 42;\n```"}</Response>
    );
    expect(html).toContain('data-slot="code-block"');
    expect(html).toContain('data-language="ts"');
    expect(html).toContain("const cost = 42;");
  });
});

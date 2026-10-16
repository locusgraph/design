import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Thinking } from "../index";

const text = "Search memory for the billing owner.\nThen check the last invoice.";

describe("Thinking", () => {
  it("shows Thinking and the full text, open, while streaming", () => {
    const html = renderToStaticMarkup(<Thinking text={text} state="streaming" />);
    expect(html).toContain("Thinking…");
    expect(html).toContain('aria-expanded="true"');
    expect(html).toContain("Then check the last invoice.");
  });

  it("shows the duration and only the first line once done", () => {
    const html = renderToStaticMarkup(<Thinking text={text} state="done" durationMs={4200} />);
    expect(html).toContain("Thought for 4s");
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain("Search memory for the billing owner.");
    expect(html).not.toContain("Then check the last invoice.");
  });

  it("formats minutes and stays open when asked", () => {
    const html = renderToStaticMarkup(
      <Thinking text={text} state="done" durationMs={65_000} defaultOpen />
    );
    expect(html).toContain("Thought for 1m 5s");
    expect(html).toContain("Then check the last invoice.");
  });
});

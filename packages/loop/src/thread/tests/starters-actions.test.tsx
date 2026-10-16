import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Actions, Starters } from "../index";

describe("Starters", () => {
  it("renders each prompt as a button", () => {
    const html = renderToStaticMarkup(
      <Starters
        onSelect={() => {}}
        suggestions={[
          "Why did spend jump on Tuesday?",
          { text: "Summarize the billing graph", label: "Billing graph" },
        ]}
      />
    );
    expect(html).toContain('data-slot="starters"');
    expect(html.match(/<button/g)).toHaveLength(2);
    expect(html).toContain("Why did spend jump on Tuesday?");
    expect(html).toContain("Billing graph");
    expect(html).not.toContain("Summarize the billing graph");
  });

  it("renders nothing without suggestions", () => {
    expect(renderToStaticMarkup(<Starters onSelect={() => {}} suggestions={[]} />)).toBe("");
  });
});

describe("Actions", () => {
  it("renders nothing without callbacks", () => {
    expect(renderToStaticMarkup(<Actions branch={{ index: 1, count: 3 }} />)).toBe("");
  });

  it("renders only the actions whose callbacks are passed", () => {
    const html = renderToStaticMarkup(<Actions onCopy={() => {}} />);
    expect(html).toContain('aria-label="Copy"');
    expect(html).not.toContain('aria-label="Retry"');
    expect(html).not.toContain('aria-label="Good response"');
  });

  it("shows the branch label and pressed feedback", () => {
    const html = renderToStaticMarkup(
      <Actions
        onRetry={() => {}}
        feedback="up"
        onFeedback={() => {}}
        branch={{ index: 1, count: 3 }}
        onBranchChange={() => {}}
      />
    );
    expect(html).toContain("2 / 3");
    expect(html).toContain('aria-label="Retry"');
    expect(html).toMatch(
      /aria-label="Good response"[^>]*aria-pressed="true"|aria-pressed="true"[^>]*aria-label="Good response"/
    );
    expect(html).toMatch(/aria-pressed="false"/);
  });

  it("disables previous on the first branch", () => {
    const html = renderToStaticMarkup(
      <Actions branch={{ index: 0, count: 2 }} onBranchChange={() => {}} />
    );
    expect(html).toContain("1 / 2");
    expect(html).toMatch(
      /disabled=""[^>]*aria-label="Previous version"|aria-label="Previous version"[^>]*disabled=""/
    );
  });
});

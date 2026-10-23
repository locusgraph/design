import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Context, Cost, CostSteps, ModelPicker } from "../index";

describe("Context", () => {
  it("is a meter with its percent", () => {
    const html = renderToStaticMarkup(<Context usedTokens={50_000} limitTokens={200_000} />);
    expect(html).toContain('role="meter"');
    expect(html).toContain('aria-valuenow="25"');
    expect(html).toContain('data-status="ok"');
    expect(html).toContain("50k / 200k");
  });

  it("turns amber near the limit and red when full", () => {
    const near = renderToStaticMarkup(
      <Context usedTokens={170_000} limitTokens={200_000} variant="ring" />
    );
    expect(near).toContain('data-status="near"');
    expect(near).toContain("text-warn");
    expect(near).toContain('aria-valuenow="85"');
    const full = renderToStaticMarkup(<Context usedTokens={200_000} limitTokens={200_000} />);
    expect(full).toContain('data-status="full"');
    expect(full).toContain("text-destructive");
    expect(full).toContain('aria-valuenow="100"');
  });

  it("is focusable when it has a breakdown", () => {
    const html = renderToStaticMarkup(
      <Context
        usedTokens={1_000}
        limitTokens={8_000}
        breakdown={[{ label: "System prompt", tokens: 1_000 }]}
      />
    );
    expect(html).toContain('tabindex="0"');
  });
});

describe("Cost", () => {
  const failed = {
    inputTokens: 1_200,
    outputTokens: 0,
    costMicroUsd: 3_600,
    model: "claude-sonnet",
    failed: true,
  };
  const succeeded = {
    inputTokens: 1_250,
    outputTokens: 420,
    costMicroUsd: 10_050,
    model: "claude-sonnet",
  };
  const attempts = [failed, succeeded];

  it("shows tokens, model and cost compactly", () => {
    const html = renderToStaticMarkup(<Cost usage={succeeded} />);
    expect(html).toContain("1.3k in");
    expect(html).toContain("420 out");
    expect(html).toContain("$0.0101");
    expect(html).toContain("claude-sonnet");
  });

  it("marks failed attempts and their wasted cost in red", () => {
    const html = renderToStaticMarkup(<Cost usage={attempts} variant="detailed" />);
    expect(html).toContain("$0.0137");
    expect(html).toContain("text-destructive");
    expect(html).toContain("Failed");
    expect(html).toContain("line-through");
    expect(renderToStaticMarkup(<Cost usage={attempts} />)).toContain("1 failed attempt · $0.0036");
  });
});

describe("CostSteps", () => {
  const steps = [
    {
      id: "plan",
      title: "Plan",
      status: "done" as const,
      usage: { inputTokens: 900, outputTokens: 300, costMicroUsd: 2_000_000 },
      durationMs: 1_200,
    },
    {
      id: "search",
      title: "Search memory",
      status: "failed" as const,
      usage: { inputTokens: 400, outputTokens: 0, costMicroUsd: 500_000 },
      durationMs: 800,
    },
  ];

  it("totals cost, tokens, time and waste", () => {
    const html = renderToStaticMarkup(<CostSteps steps={steps} />);
    expect(html).toContain("$2.50");
    expect(html).toContain("1,300 in · 300 out");
    expect(html).toContain("2.0s");
    expect(html).toContain("Wasted on failures");
    expect(html).toContain('data-wasted="true"');
    expect(html).toContain("width:100%");
  });

  it("says when there are no steps", () => {
    expect(renderToStaticMarkup(<CostSteps steps={[]} />)).toContain("No steps have run yet.");
  });
});

describe("ModelPicker", () => {
  it("shows the selected model and its provider", () => {
    const html = renderToStaticMarkup(
      <ModelPicker
        value="sonnet"
        onChange={() => {}}
        models={[
          { id: "haiku", name: "Claude Haiku", provider: "Anthropic", speed: "fast" },
          {
            id: "sonnet",
            name: "Claude Sonnet",
            provider: "Anthropic",
            inputPerMillionMicroUsd: 3_000_000,
            outputPerMillionMicroUsd: 15_000_000,
            speed: "balanced",
          },
        ]}
      />
    );
    expect(html).toContain('aria-label="Model: Claude Sonnet"');
    expect(html).toContain("Anthropic");
    expect(html).not.toContain("Claude Haiku");
  });
});

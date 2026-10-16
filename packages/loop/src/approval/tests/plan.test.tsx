import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PlanReview, Question } from "../index";
import { applyStepAction } from "../plan/plan-steps";

const steps = [
  { id: "s1", title: "Read the Acme graph" },
  { id: "s2", title: "Merge duplicate customers", detail: "142 pairs" },
  { id: "s3", title: "Write the merged graph" },
];

const noop = () => {};

describe("PlanReview", () => {
  it("lists editable steps with move and remove controls", () => {
    const html = renderToStaticMarkup(
      <PlanReview steps={steps} onApprove={noop} onCancel={noop} />
    );
    expect(html).toContain('value="Merge duplicate customers"');
    expect(html).toContain("Move step 1 up");
    expect(html).toContain("Remove step 3");
    expect(html).toContain("Run 3 steps");
  });

  it("reorders and removes steps", () => {
    expect(applyStepAction(steps, "s2", "up").map((step) => step.id)).toEqual(["s2", "s1", "s3"]);
    expect(applyStepAction(steps, "s3", "down")).toBe(steps);
    expect(applyStepAction(steps, "s1", "remove").map((step) => step.id)).toEqual(["s2", "s3"]);
  });

  it("shows the decision once approved", () => {
    const html = renderToStaticMarkup(
      <PlanReview
        steps={steps}
        decision={{ approved: true, by: "Ravi", at: Date.UTC(2026, 9, 17, 9, 5) }}
        onApprove={noop}
        onCancel={noop}
      />
    );
    expect(html).toContain("Approved by");
    expect(html).not.toContain("Run 3 steps");
  });
});

describe("Question", () => {
  const options = [
    { id: "prod", label: "Production", description: "acme-prod" },
    { id: "staging", label: "Staging" },
  ];

  it("offers pill choices as a radio group", () => {
    const html = renderToStaticMarkup(
      <Question question="Which graph should I update?" options={options} onAnswer={noop} />
    );
    expect(html).toContain('role="radiogroup"');
    expect(html).toContain('aria-checked="false"');
    expect(html).toContain("Send answer");
    expect(html).not.toContain("<textarea");
  });

  it("asks for free text when there are no options", () => {
    const html = renderToStaticMarkup(<Question question="Name the new graph" onAnswer={noop} />);
    expect(html).toContain("<textarea");
    expect(html).toContain("Your answer");
  });

  it("shows the answer once answered", () => {
    const html = renderToStaticMarkup(
      <Question
        question="Which graph should I update?"
        options={options}
        answer={{ optionId: "staging", text: "test first", by: "Maya Chen" }}
        onAnswer={noop}
      />
    );
    expect(html).toContain("Staging · test first");
    expect(html).toContain("Answered by Maya Chen");
    expect(html).not.toContain("Send answer");
  });
});

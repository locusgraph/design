import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { installDom } from "../../shared/virtual/tests/dom";
import type { ToolPart } from "../../types";
import {
  Approval,
  type ApprovalDecision,
  ApprovalGate,
  type ApprovalGateController,
  DecisionLog,
  useApprovalGate,
} from "../index";

const noop = () => {};

const writePart: ToolPart = {
  type: "tool-update_plan",
  toolCallId: "call_1",
  state: "approval-requested",
  input: { plan: "pro" },
};

let root: Root | undefined;
let container: HTMLElement;
let gate: ApprovalGateController;

function Harness() {
  gate = useApprovalGate({ now: () => "2026-10-27T12:00:00.000Z" });
  return (
    <>
      <ApprovalGate gate={gate} />
      <DecisionLog entries={gate.log} />
    </>
  );
}

function button(label: string) {
  return [...container.querySelectorAll("button")].find((each) => each.textContent === label);
}

async function ask(toolName: string, risk?: "write" | "destructive") {
  const asked: { decision?: Promise<ApprovalDecision> } = {};
  await act(async () => {
    asked.decision = gate.ask({ toolName, risk, input: { plan: "pro" }, title: `Run ${toolName}` });
  });
  return asked;
}

beforeAll(installDom);

afterEach(async () => {
  await act(async () => root?.unmount());
  container.remove();
});

async function mount() {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () => root?.render(<Harness />));
}

describe("useApprovalGate", () => {
  it("waits for the person and logs the decision", async () => {
    await mount();
    const asked = await ask("update_plan");
    await act(async () => button("Run update plan")?.click());
    expect((await asked.decision)?.approved).toBe(true);
    expect(container.querySelector('[data-slot="decision-log"] li')?.textContent).toContain(
      "Run update_plan"
    );
  });

  it("approves the same tool on its own after allow for this run, but never a destructive one", async () => {
    await mount();
    const first = await ask("update_plan");
    await act(async () => button("Allow for this run")?.click());
    expect((await first.decision)?.approved).toBe(true);
    const second = await ask("update_plan");
    expect((await second.decision)?.by).toBe("Allowed for this run");
    expect(container.querySelector('[data-kind="rule"]')).not.toBeNull();
    await ask("update_plan", "destructive");
    expect(button("Allow for this run")).toBeUndefined();
    expect(button("Run update plan")).toBeDefined();
  });
});

describe("Approval changes", () => {
  it("shows what changes, before and after", () => {
    const html = renderToStaticMarkup(
      <Approval
        part={writePart}
        changes={[{ label: "Plan", before: "Free", after: "Pro" }]}
        onApprove={noop}
        onDeny={noop}
      />
    );
    expect(html).toContain('data-slot="change-preview"');
    expect(html).toContain("<del");
    expect(html).toContain("Free");
    expect(html).toContain("Pro");
  });
});

describe("DecisionLog", () => {
  it("says when nothing was decided yet", () => {
    expect(renderToStaticMarkup(<DecisionLog entries={[]} />)).toContain("No decisions yet.");
  });

  it("uses the verbs of each kind", () => {
    const html = renderToStaticMarkup(
      <DecisionLog
        entries={[
          {
            id: "a",
            title: "Spend $1.35",
            kind: "spend",
            decision: { approved: false, by: "Dana", at: "2026-10-27T12:00:00.000Z" },
          },
        ]}
      />
    );
    expect(html).toContain("Stopped by Dana");
  });

  it("joins each decision to the next with a rail, none after the last", () => {
    const decision = { approved: true, by: "You", at: "2026-10-27T12:00:00.000Z" };
    const html = renderToStaticMarkup(
      <DecisionLog
        entries={[
          { id: "a", title: "Move to Pro", decision },
          { id: "b", title: "Rotate key", decision },
          { id: "c", title: "Revoke key", decision },
        ]}
      />
    );
    expect(html.match(/data-slot="decision-log-rail"/g)).toHaveLength(2);
  });
});

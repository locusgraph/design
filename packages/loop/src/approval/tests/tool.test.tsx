import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { ToolPart } from "../../types";
import { Approval, ArgsEditor } from "../index";
import { validateDrafts, valuesFromDrafts } from "../tool/args/args-validation";

const deletePart: ToolPart = {
  type: "tool-delete_files",
  toolCallId: "call_1",
  state: "approval-requested",
  input: { paths: ["graphs/acme/old.json", "graphs/acme/tmp.json"], dryRun: false },
};

const noop = () => {};

describe("Approval", () => {
  it("lists the inputs readably and names the approve action", () => {
    const html = renderToStaticMarkup(
      <Approval part={deletePart} actionLabel="Delete 2 files" onApprove={noop} onDeny={noop} />
    );
    expect(html).toContain('data-slot="approval"');
    expect(html).toContain("delete files");
    expect(html).toContain("Dry run");
    expect(html).toContain("graphs/acme/old.json, graphs/acme/tmp.json");
    expect(html).toContain("Delete 2 files");
    expect(html).toContain("Show raw");
    expect(html).toContain("Writes data");
  });

  it("uses stronger copy for destructive tools", () => {
    const html = renderToStaticMarkup(
      <Approval part={deletePart} risk="destructive" onApprove={noop} onDeny={noop} />
    );
    expect(html).toContain('data-risk="destructive"');
    expect(html).toContain("This can&#x27;t be undone.");
    expect(html).toContain("Destructive");
    expect(html).toContain("Run delete files");
  });

  it("shows who decided and when instead of the buttons", () => {
    const html = renderToStaticMarkup(
      <Approval
        part={{ ...deletePart, state: "approval-responded" }}
        decision={{
          approved: false,
          by: "Maya Chen",
          at: Date.UTC(2026, 9, 17, 14, 32),
          reason: "Wrong folder",
        }}
        onApprove={noop}
        onDeny={noop}
      />
    );
    expect(html).toContain("Denied by Maya Chen");
    expect(html).toContain("Oct 17, 2026, 2:32 PM UTC");
    expect(html).toContain("Reason: Wrong folder");
    expect(html).not.toContain("Run delete files");
  });

  it("shows raw JSON when the input is not an object", () => {
    const html = renderToStaticMarkup(
      <Approval part={{ ...deletePart, input: "rm -rf" }} onApprove={noop} onDeny={noop} />
    );
    expect(html).toContain("&quot;rm -rf&quot;");
    expect(html).not.toContain("Show raw");
  });
});

const fields = [
  { name: "to", label: "Recipient", type: "text" as const, required: true },
  { name: "amount", label: "Amount", type: "number" as const, min: 1, max: 500 },
  { name: "notify", label: "Notify", type: "boolean" as const },
  {
    name: "currency",
    label: "Currency",
    type: "select" as const,
    options: [{ value: "usd", label: "USD" }],
  },
];

describe("ArgsEditor", () => {
  it("renders a field per schema entry with the initial values", () => {
    const html = renderToStaticMarkup(
      <ArgsEditor
        toolName="send_invoice"
        fields={fields}
        initialValues={{ to: "ops@acme.dev", amount: 120, currency: "usd" }}
        onApprove={noop}
        onCancel={noop}
      />
    );
    expect(html).toContain('value="ops@acme.dev"');
    expect(html).toContain('value="120"');
    expect(html).toContain("Recipient<span");
    expect(html).toContain("Run send_invoice with these inputs");
  });

  it("validates required, number range and select values", () => {
    const errors = validateDrafts(fields, {
      to: " ",
      amount: "900",
      notify: true,
      currency: "eur",
    });
    expect(errors).toEqual({
      to: "Recipient is required.",
      amount: "Amount must be at most 500.",
      currency: "Choose one of the listed currency options.",
    });
    expect(
      valuesFromDrafts(fields, { to: "a", amount: "12.5", notify: false, currency: "" })
    ).toEqual({ to: "a", amount: 12.5, notify: false });
  });
});

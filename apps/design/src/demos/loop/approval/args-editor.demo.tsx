import { type ArgField, ArgsEditor } from "@locusgraph/loop";
import { defineDemo, select } from "../../../registry/define-demo";

const fields: ArgField[] = [
  { name: "to", label: "Recipient", type: "text", required: true },
  {
    name: "amountUsd",
    label: "Amount (USD)",
    type: "number",
    required: true,
    min: 1,
    max: 5000,
    description: "Invoices over $5,000 need a finance review.",
  },
  {
    name: "terms",
    label: "Payment terms",
    type: "select",
    options: [
      { value: "net15", label: "Net 15" },
      { value: "net30", label: "Net 30" },
      { value: "due", label: "Due on receipt" },
    ],
  },
  { name: "attachPdf", label: "Attach PDF", type: "boolean" },
];

const initialValues = { to: "ap@northwind.io", amountUsd: 1240, terms: "net30", attachPdf: true };

const riskOptions = ["write", "destructive"] as const;

function GraphRetention() {
  return (
    <div className="w-full max-w-xl">
      <ArgsEditor
        toolName="prune_graph"
        risk="destructive"
        actionLabel="Prune acme-events"
        fields={[
          { name: "graph", label: "Graph", type: "text", required: true },
          { name: "olderThanDays", label: "Older than (days)", type: "number", min: 30 },
          { name: "dryRun", label: "Dry run first", type: "boolean" },
        ]}
        initialValues={{ graph: "acme-events", olderThanDays: 90, dryRun: true }}
        onApprove={() => {}}
        onCancel={() => {}}
      />
    </div>
  );
}

export default defineDemo({
  title: "Args Editor",
  description:
    "Lets a person correct a tool's inputs before approving. Fields come from a small schema; validation runs on submit and focus moves to the first field to fix.",
  controls: { risk: select(riskOptions, "write") },
  playground: ({ risk }) => (
    <div className="w-full max-w-xl">
      <ArgsEditor
        toolName="send_invoice"
        risk={risk}
        actionLabel="Send INV-2041"
        fields={fields}
        initialValues={initialValues}
        onApprove={() => {}}
        onCancel={() => {}}
      />
    </div>
  ),
  code: ({ risk }) =>
    `<ArgsEditor\n  toolName="send_invoice"\n  risk="${risk}"\n  actionLabel="Send INV-2041"\n  fields={fields}\n  initialValues={part.input}\n  onApprove={(input) => approveWithInput(part.toolCallId, input)}\n  onCancel={closeEditor}\n/>`,
  props: [
    { name: "toolName", type: "string" },
    {
      name: "fields",
      type: '{ name; label; type: "text" | "number" | "boolean" | "select"; options?; required?; min?; max?; description? }[]',
    },
    {
      name: "initialValues",
      type: "Record<string, string | number | boolean>",
      defaultValue: "{}",
    },
    { name: "risk", type: "RiskLevel", defaultValue: '"write"' },
    { name: "actionLabel", type: "string" },
    { name: "onApprove", type: "(editedInput: ArgValues) => void" },
    { name: "onCancel", type: "() => void" },
  ],
  examples: {
    GraphRetention: {
      description: "A destructive LocusGraph tool with a dry-run switch.",
      component: GraphRetention,
    },
  },
  isNew: true,
});

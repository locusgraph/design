import { DecisionLog, type DecisionLogEntry } from "@locusgraph/loop";
import { defineDemo, toggle } from "../../../registry/define-demo";

const at = (minute: number) => Date.UTC(2026, 9, 27, 14, minute);

const entries: DecisionLogEntry[] = [
  {
    id: "d1",
    title: "Send INV-2041",
    decision: { approved: true, by: "Maya Chen", at: at(2) },
  },
  {
    id: "d2",
    title: "Send INV-2042",
    kind: "rule",
    decision: { approved: true, by: "Allowed for this run", at: at(3) },
  },
  {
    id: "d3",
    title: "Spend $1.35 on the next step",
    kind: "spend",
    decision: { approved: true, by: "Maya Chen", at: at(9) },
    detail: "The run would reach $5.47 of a $5.00 cap.",
  },
  {
    id: "d4",
    title: "Delete 3 nodes",
    decision: {
      approved: false,
      by: "Ravi Patel",
      at: at(14),
      reason: "Archive them instead of deleting.",
    },
  },
];

export default defineDemo({
  title: "Decision Log",
  description:
    "Every approve, deny, spend and stop in a run, with who decided, when and why. `useApprovalGate` fills one for you in `gate.log`.",
  controls: { empty: toggle(false) },
  playground: ({ empty }) => (
    <div className="w-full max-w-xl">
      <DecisionLog entries={empty ? [] : entries} />
    </div>
  ),
  code: () => "<DecisionLog entries={gate.log} />",
  props: [
    {
      name: "entries",
      type: "{ id; title; kind?: approval | spend | stop | rule; decision; detail? }[]",
    },
    { name: "emptyText", type: "string", defaultValue: '"No decisions yet."' },
  ],
  examples: {},
  isNew: true,
});

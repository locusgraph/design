import { Inbox, type PendingApproval } from "@locusgraph/loop";
import { defineDemo, toggle } from "../../../registry/define-demo";

const now = Date.UTC(2026, 9, 17, 12, 0);
const minute = 60_000;

const items: PendingApproval[] = [
  {
    id: "apr_1",
    title: "Send invoice INV-2041",
    runName: "Billing agent",
    risk: "write",
    requestedAt: now - 7 * minute,
    summary: "$1,240.00 to ap@northwind.io",
  },
  {
    id: "apr_2",
    title: "Raise run cap to $12.00",
    runName: "Q4 vendor reconciliation",
    risk: "write",
    requestedAt: now - 42 * minute,
    summary: "Spent $9.80 of a $10.00 cap",
  },
  {
    id: "apr_3",
    title: "Delete 3 stale graphs",
    runName: "Graph cleanup",
    risk: "destructive",
    requestedAt: now - 3 * 60 * minute,
    summary: "acme-tmp, acme-old, acme-test-2",
  },
  {
    id: "apr_4",
    title: "Write 12 memories",
    runName: "Support triage",
    risk: "write",
    requestedAt: now - 26 * 60 * minute,
  },
];

function Empty() {
  return (
    <div className="w-full max-w-2xl">
      <Inbox items={[]} onApprove={() => {}} onDeny={() => {}} onApproveAll={() => {}} />
    </div>
  );
}

export default defineDemo({
  title: "Inbox",
  description:
    "Every approval waiting across runs, with how long each has waited. Select several to approve together; destructive requests are approved one at a time.",
  controls: { empty: toggle(false) },
  playground: ({ empty }) => (
    <div className="w-full max-w-2xl">
      <Inbox
        items={empty ? [] : items}
        now={now}
        onApprove={() => {}}
        onDeny={() => {}}
        onApproveAll={() => {}}
      />
    </div>
  ),
  code: () =>
    "<Inbox\n  items={pending}\n  onApprove={(id) => respond(id, true)}\n  onDeny={(id) => respond(id, false)}\n  onApproveAll={(ids) => ids.forEach((id) => respond(id, true))}\n/>",
  props: [
    { name: "items", type: "{ id; title; runName; risk; requestedAt; summary? }[]" },
    { name: "now", type: "number", defaultValue: "Date.now()" },
    { name: "title", type: "string", defaultValue: '"Waiting for approval"' },
    { name: "onApprove", type: "(id: string) => void" },
    { name: "onDeny", type: "(id: string) => void" },
    { name: "onApproveAll", type: "(ids: string[]) => void" },
  ],
  examples: {
    Empty: { description: "Nothing waiting.", component: Empty },
  },
  isNew: true,
});

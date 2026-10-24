import { Inbox, type PendingApproval } from "@locusgraph/loop";
import { useState } from "react";
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

function Playground({ empty }: { empty: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const opened = items.find((item) => item.id === openId);
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <Inbox
        items={empty ? [] : items}
        now={now}
        openId={openId}
        onOpen={setOpenId}
        onApproveAll={() => {}}
      />
      {opened && !empty && (
        <p className="px-2 text-sm text-faint">
          Opens the approval for <span className="text-foreground">{opened.title}</span>.
        </p>
      )}
    </div>
  );
}

const longQueue: PendingApproval[] = Array.from({ length: 300 }, (_, index) => ({
  ...items[index % items.length],
  id: `apr_long_${index}`,
  requestedAt: now - index * 4 * minute,
}));

function LongQueue() {
  return (
    <div className="w-full max-w-2xl">
      <Inbox items={longQueue} now={now} onOpen={() => {}} onApproveAll={() => {}} />
    </div>
  );
}

function Empty() {
  return (
    <div className="w-full max-w-2xl">
      <Inbox items={[]} onOpen={() => {}} onApproveAll={() => {}} />
    </div>
  );
}

export default defineDemo({
  title: "Inbox",
  description:
    "Every approval waiting across runs, with how long each has waited. Click a request to open its full approval and decide with the inputs in view; select several safe ones to approve together.",
  controls: { empty: toggle(false) },
  playground: ({ empty }) => <Playground empty={empty} />,
  code: () =>
    "<Inbox\n  items={pending}\n  openId={openId}\n  onOpen={setOpenId}\n  onApproveAll={(ids) => ids.forEach((id) => respond(id, true))}\n/>",
  props: [
    { name: "items", type: "{ id; title; runName; risk; requestedAt; summary? }[]" },
    { name: "now", type: "number", defaultValue: "Date.now()" },
    { name: "title", type: "string", defaultValue: '"Waiting for approval"' },
    { name: "openId", type: "string | null", defaultValue: "null" },
    { name: "onOpen", type: "(id: string) => void" },
    { name: "onApproveAll", type: "(ids: string[]) => void" },
    { name: "virtualize", type: "boolean", defaultValue: "true" },
  ],
  examples: {
    Empty: { description: "Nothing waiting.", component: Empty },
    LongQueue: {
      description:
        "300 approvals. Above 50 the list scrolls inside the panel and only the rows near the viewport are mounted.",
      component: LongQueue,
    },
  },
  isNew: true,
});

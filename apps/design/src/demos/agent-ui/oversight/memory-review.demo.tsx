import { MemoryReview } from "@locusgraph/agent-ui";
import { defineDemo, toggle } from "../../../registry/define-demo";

const memories = [
  { id: "mem_1", text: "Acme invoices in EUR with net 30 terms.", kind: "fact" },
  { id: "mem_2", text: "Maya prefers weekly spend summaries on Mondays.", kind: "preference" },
  {
    id: "mem_3",
    text: "Northwind AP contact: Jonas Berg, +46 70 123 45 67.",
    kind: "contact",
    sensitive: true,
  },
  { id: "mem_4", text: "The acme-staging graph mirrors prod nightly at 02:00 UTC.", kind: "fact" },
];

function NothingToReview() {
  return (
    <div className="w-full max-w-xl">
      <MemoryReview memories={[]} onSubmit={() => {}} />
    </div>
  );
}

export default defineDemo({
  title: "Memory Review",
  description:
    "LocusGraph proposes memories from a run. Keep, edit or discard each one before it is written; sensitive ones are flagged and start as discard.",
  controls: { decided: toggle(false) },
  playground: ({ decided }) => (
    <div className="w-full max-w-xl">
      <MemoryReview
        memories={memories}
        autoFocus={false}
        decision={
          decided
            ? { approved: true, by: "Maya Chen", at: Date.UTC(2026, 9, 17, 11, 40) }
            : undefined
        }
        onSubmit={() => {}}
      />
    </div>
  ),
  code: () =>
    "<MemoryReview\n  memories={proposed}\n  onSubmit={({ kept, edited, discarded }) => writeMemories([...kept, ...edited])}\n/>",
  props: [
    {
      name: "memories",
      type: "{ id: string; text: string; kind?: string; sensitive?: boolean }[]",
    },
    { name: "title", type: "string", defaultValue: '"Review new memories"' },
    { name: "description", type: "string" },
    { name: "decision", type: "ApprovalDecision" },
    { name: "onSubmit", type: "(result: { kept; edited; discarded }) => void" },
  ],
  examples: {
    NothingToReview: { description: "An empty list says so.", component: NothingToReview },
  },
  isNew: true,
});

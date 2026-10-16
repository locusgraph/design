import { MemoryRecall } from "@locusgraph/agent-ui";
import { defineDemo, toggle } from "../../../registry/define-demo";

const memories = [
  {
    id: "mem_7Hq2",
    label: "Acme prefers invoices on the 1st",
    kind: "preference",
    relevance: 0.94,
    snippet: "Finance asked to move billing to the first business day of the month.",
  },
  {
    id: "mem_9Kd1",
    label: "Dana Ruiz is the billing contact",
    kind: "person",
    relevance: 0.81,
    snippet: "Dana approves plan changes above $500 per month.",
  },
  {
    id: "node_Acme",
    label: "Acme Corp",
    kind: "entity",
    relevance: 0.77,
  },
  {
    id: "mem_2Lp8",
    label: "Pro plan renews on annual terms",
    kind: "fact",
    relevance: 0.58,
    snippet: "Signed in March; renewal notice goes out 30 days ahead.",
  },
  {
    id: "mem_4Ze3",
    label: "Prior dispute over overage fees",
    kind: "event",
    relevance: 0.32,
  },
];

export default defineDemo({
  title: "Memory Recall",
  description:
    "The memories and graph nodes LocusGraph recalled for this answer, each with its kind and relevance, as ruled rows. Collapsed, it reads as a single line.",
  controls: { open: toggle(true) },
  playground: ({ open }) => (
    <div className="w-full max-w-xl">
      <MemoryRecall
        key={String(open)}
        memories={memories}
        defaultOpen={open}
        onOpenMemory={() => {}}
      />
    </div>
  ),
  code: ({ open }) =>
    `<MemoryRecall memories={recall.memories}${open ? " defaultOpen" : ""} onOpenMemory={openMemory} />`,
  props: [
    { name: "memories", type: "MemoryRef[]" },
    { name: "onOpenMemory", type: "(id: string) => void" },
    { name: "defaultOpen", type: "boolean", defaultValue: "false" },
  ],
  examples: {},
  isNew: true,
});

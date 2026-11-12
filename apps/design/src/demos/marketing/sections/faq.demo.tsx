import { Faq } from "@locusgraph/marketing";
import { defineDemo, select } from "../../../registry/define-demo";

const aligns = ["start", "center"] as const;

const items = [
  {
    question: "Is there a free plan?",
    answer: "Yes. The free plan includes one graph and 10,000 events a month.",
  },
  {
    question: "What counts as an event?",
    answer: "Every priced step an agent takes: a model call, a tool call or a search.",
  },
  {
    question: "Can agents spend without approval?",
    answer: "Only under the limits you set. Anything above them waits for a person.",
  },
  { question: "Can I cancel any time?", answer: "Yes. Paid plans stop at the end of the month." },
];

export default defineDemo({
  title: "FAQ",
  description:
    "Common questions on the existing `Accordion`, one open at a time. Answers can hold links and lists.",
  controls: { align: select(aligns, "start") },
  playground: ({ align }) => (
    <div className="w-full [&_[data-slot=accordion]]:mx-auto">
      <Faq align={align} eyebrow="FAQ" title="Questions, answered" items={items} />
    </div>
  ),
  code: () => `<Faq
  title="Questions, answered"
  items={[{ question: "Is there a free plan?", answer: "Yes." }]}
/>`,
  props: [
    { name: "items", type: "{ question, answer }[]" },
    { name: "eyebrow, title, description", type: "ReactNode", defaultValue: "the section heading" },
    { name: "align", type: '"start" | "center"', defaultValue: '"start"' },
    { name: "id", type: "string" },
  ],
  examples: {},
  isNew: true,
});

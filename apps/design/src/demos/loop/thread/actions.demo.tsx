import { Actions, type MessageFeedback } from "@locusgraph/loop";
import { useState } from "react";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const answers = [
  "September spend was $1,284.20, up 18% on August, driven by the support agent.",
  "Spend rose to $1,284.20 in September. The support agent's longer prompts account for most of it.",
  "September: $1,284.20 (+18%). Support agent, gpt-4.1, 61% of the increase.",
];

type Reveal = "always" | "hover";

function Playground({ withBranches, reveal }: { withBranches: boolean; reveal: Reveal }) {
  const [feedback, setFeedback] = useState<MessageFeedback>(null);
  const [branch, setBranch] = useState(1);
  return (
    <div className="group/message flex w-full max-w-xl flex-col gap-2">
      <p className="text-sm">{answers[branch]}</p>
      <Actions
        onCopy={() => {}}
        onRetry={() => {}}
        feedback={feedback}
        onFeedback={setFeedback}
        branch={withBranches ? { index: branch, count: answers.length } : undefined}
        onBranchChange={setBranch}
        reveal={reveal}
      />
    </div>
  );
}

function CopyOnly() {
  return (
    <div className="group/message flex w-full max-w-xl flex-col items-end gap-1">
      <p className="max-w-[85%] bg-muted px-3.5 py-2 text-sm">
        How much did the support agent spend in September?
      </p>
      <Actions onCopy={() => {}} align="end" reveal="hover" />
    </div>
  );
}

export default defineDemo({
  title: "Actions",
  description:
    "Quiet icon buttons under a message: copy, retry, feedback and a switcher between regenerated versions. Each action shows only when its callback is passed. Once feedback is given only the chosen thumb stays.",
  controls: { branches: toggle(true), reveal: select(["always", "hover"] as const) },
  playground: ({ branches, reveal }) => <Playground withBranches={branches} reveal={reveal} />,
  code: ({ branches, reveal }) =>
    `<Actions\n  onCopy={() => copy(text)}\n  onRetry={regenerate}\n  feedback={feedback}\n  onFeedback={setFeedback}${
      branches ? "\n  branch={{ index, count }}\n  onBranchChange={setIndex}" : ""
    }${reveal === "hover" ? '\n  reveal="hover"' : ""}\n/>`,
  props: [
    { name: "onCopy", type: "() => void" },
    { name: "onRetry", type: "() => void" },
    { name: "feedback", type: '"up" | "down" | null', defaultValue: "null" },
    { name: "onFeedback", type: "(feedback: MessageFeedback) => void" },
    { name: "branch", type: "{ index: number; count: number }" },
    { name: "onBranchChange", type: "(index: number) => void" },
    { name: "align", type: '"start" | "end"', defaultValue: '"start"' },
    { name: "reveal", type: '"always" | "hover"', defaultValue: '"always"' },
  ],
  examples: {
    CopyOnly: {
      description:
        'A user message: only onCopy, aligned to the end, shown when the message is hovered. Use reveal="hover" on every message except the latest reply.',
      component: CopyOnly,
    },
  },
  isNew: true,
});

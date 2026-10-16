import { Actions, type MessageFeedback } from "@locusgraph/loop";
import { useState } from "react";
import { defineDemo, toggle } from "../../../registry/define-demo";

const answers = [
  "September spend was $1,284.20, up 18% on August, driven by the support agent.",
  "Spend rose to $1,284.20 in September. The support agent's longer prompts account for most of it.",
  "September: $1,284.20 (+18%). Support agent, gpt-4.1, 61% of the increase.",
];

function Playground({ withBranches }: { withBranches: boolean }) {
  const [feedback, setFeedback] = useState<MessageFeedback>(null);
  const [branch, setBranch] = useState(1);
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <p className="text-sm">{answers[branch]}</p>
      <Actions
        onCopy={() => {}}
        onRetry={() => {}}
        feedback={feedback}
        onFeedback={setFeedback}
        branch={withBranches ? { index: branch, count: answers.length } : undefined}
        onBranchChange={setBranch}
      />
    </div>
  );
}

function CopyOnly() {
  return (
    <div className="flex w-full max-w-xl flex-col items-end gap-1">
      <p className="max-w-[85%] bg-muted px-3.5 py-2 text-sm">
        How much did the support agent spend in September?
      </p>
      <Actions onCopy={() => {}} />
    </div>
  );
}

export default defineDemo({
  title: "Actions",
  description:
    "Icon buttons under an assistant message: copy, retry, feedback and a switcher between regenerated versions. Each action shows only when its callback is passed.",
  controls: { branches: toggle(true) },
  playground: ({ branches }) => <Playground withBranches={branches} />,
  code: ({ branches }) =>
    `<Actions\n  onCopy={() => copy(text)}\n  onRetry={regenerate}\n  feedback={feedback}\n  onFeedback={setFeedback}${
      branches ? "\n  branch={{ index, count }}\n  onBranchChange={setIndex}" : ""
    }\n/>`,
  props: [
    { name: "onCopy", type: "() => void" },
    { name: "onRetry", type: "() => void" },
    { name: "feedback", type: '"up" | "down" | null', defaultValue: "null" },
    { name: "onFeedback", type: "(feedback: MessageFeedback) => void" },
    { name: "branch", type: "{ index: number; count: number }" },
    { name: "onBranchChange", type: "(index: number) => void" },
  ],
  examples: {
    CopyOnly: {
      description: "Pass only onCopy for a user message.",
      component: CopyOnly,
    },
  },
  isNew: true,
});

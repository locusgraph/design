import { Question } from "@locusgraph/agent-ui";
import { defineDemo, select } from "../../../registry/define-demo";

const modeOptions = ["choices", "choices-and-text", "text", "answered"] as const;

const graphOptions = [
  { id: "prod", label: "acme-prod", description: "Live, 18,204 nodes" },
  { id: "staging", label: "acme-staging", description: "Copy from Oct 12" },
  { id: "new", label: "A new graph" },
];

function FreeText() {
  return (
    <div className="w-full max-w-lg">
      <Question
        question="What should I call the new SpendGraph budget?"
        textPlaceholder="For example, Q4 inference"
        autoFocus={false}
        onAnswer={() => {}}
      />
    </div>
  );
}

export default defineDemo({
  title: "Question",
  description:
    "The agent asks something mid-run. Numbered choices you can pick with 1–9, a free answer, or both. The run waits until you send; the answered state shows what was chosen and by whom.",
  controls: { mode: select(modeOptions, "choices-and-text") },
  playground: ({ mode }) => (
    <div className="w-full max-w-lg">
      <Question
        question="Which graph should I merge the duplicates into?"
        options={mode === "text" ? undefined : graphOptions}
        allowText={mode !== "choices"}
        autoFocus={false}
        answer={
          mode === "answered"
            ? {
                optionId: "staging",
                text: "Test there first",
                by: "Maya Chen",
                at: Date.UTC(2026, 9, 17, 10, 14),
              }
            : undefined
        }
        onAnswer={() => {}}
      />
    </div>
  ),
  code: () =>
    `<Question\n  question={question.text}\n  options={question.options}\n  allowText\n  answer={question.answer}\n  onAnswer={(answer) => addToolResult({ toolCallId, output: answer })}\n/>`,
  props: [
    { name: "question", type: "string" },
    { name: "options", type: "{ id: string; label: string; description?: string }[]" },
    { name: "allowText", type: "boolean", defaultValue: "true when there are no options" },
    { name: "submitLabel", type: "string", defaultValue: '"Send answer"' },
    { name: "answer", type: "{ optionId?; text?; by?; at? }" },
    { name: "onAnswer", type: "(answer: { optionId?: string; text?: string }) => void" },
  ],
  examples: {
    FreeText: { description: "Without options it asks for a typed answer.", component: FreeText },
  },
  isNew: true,
});

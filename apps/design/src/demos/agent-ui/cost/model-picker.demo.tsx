import { type ModelOption, ModelSelector } from "@locusgraph/agent-ui";
import { useState } from "react";
import { defineDemo } from "../../../registry/define-demo";

const models: ModelOption[] = [
  {
    id: "claude-haiku-4.5",
    name: "Claude Haiku 4.5",
    provider: "Anthropic",
    inputPerMillionMicroUsd: 1_000_000,
    outputPerMillionMicroUsd: 5_000_000,
    speed: "fast",
    contextTokens: 200_000,
  },
  {
    id: "claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    inputPerMillionMicroUsd: 3_000_000,
    outputPerMillionMicroUsd: 15_000_000,
    speed: "balanced",
    contextTokens: 1_000_000,
  },
  {
    id: "claude-opus-4.1",
    name: "Claude Opus 4.1",
    provider: "Anthropic",
    inputPerMillionMicroUsd: 15_000_000,
    outputPerMillionMicroUsd: 75_000_000,
    speed: "deep",
    contextTokens: 200_000,
  },
  {
    id: "gpt-5-mini",
    name: "GPT-5 mini",
    provider: "OpenAI",
    inputPerMillionMicroUsd: 250_000,
    outputPerMillionMicroUsd: 2_000_000,
    speed: "fast",
    contextTokens: 400_000,
  },
];

function ChooseModel() {
  const [value, setValue] = useState("claude-sonnet-4.5");
  return (
    <div className="flex h-[24rem] w-full justify-center">
      <ModelSelector models={models} value={value} onChange={setValue} />
    </div>
  );
}

export default defineDemo({
  title: "Model Selector",
  description:
    "A quiet trigger with the model and its provider. The menu lists each model with speed, context size and price per million tokens, and checks the one in use. Small enough for a prompt input's model slot.",
  previewHeight: "tall",
  controls: {},
  playground: () => <ChooseModel />,
  code: () => `<ModelSelector models={models} value={modelId} onChange={setModelId} />`,
  props: [
    { name: "models", type: "ModelOption[]" },
    { name: "value", type: "string" },
    { name: "onChange", type: "(id: string) => void" },
    { name: "label", type: "string", defaultValue: "Model" },
    { name: "disabled", type: "boolean", defaultValue: "false" },
  ],
  examples: {},
  isNew: true,
});

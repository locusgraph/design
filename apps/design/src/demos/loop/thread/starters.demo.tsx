import { Starters } from "@locusgraph/loop";
import { useState } from "react";
import { defineDemo, select } from "../../../registry/define-demo";

const products = ["spendgraph", "locusgraph"] as const;

const prompts = {
  spendgraph: [
    "Why did LLM spend jump on Tuesday?",
    "Which workflow costs the most per run?",
    "Forecast October spend for the support agent",
    "Show models I could swap to save money",
  ],
  locusgraph: [
    "What do we know about the Acme account?",
    "Summarize the billing graph",
    "Which memories mention the Stripe migration?",
  ],
} as const;

function Playground({ product }: { product: (typeof products)[number] }) {
  const [chosen, setChosen] = useState<string | null>(null);
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Starters suggestions={[...prompts[product]]} onSelect={setChosen} />
      <p className="eyebrow">{chosen ? `Sent: ${chosen}` : "Pick a prompt"}</p>
    </div>
  );
}

function ShortLabels() {
  return (
    <div className="w-full max-w-xl">
      <Starters
        onSelect={() => {}}
        suggestions={[
          {
            label: "Top cost drivers",
            text: "List the five workflows that cost the most this month",
          },
          { label: "Budget alerts", text: "Which teams are over 80% of their monthly budget?" },
          { label: "Idle keys", text: "Which API keys have not been used in 30 days?" },
        ]}
      />
    </div>
  );
}

export default defineDemo({
  title: "Starters",
  description:
    "Starter prompts as ruled rows for an empty conversation. Selecting one hands its text to onSelect.",
  controls: { product: select(products) },
  playground: ({ product }) => <Playground product={product} />,
  code: () => `<Starters suggestions={prompts} onSelect={(text) => sendMessage({ text })} />`,
  props: [
    { name: "suggestions", type: "Starter[]" },
    { name: "onSelect", type: "(text: string) => void" },
    { name: "disabled", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    ShortLabels: {
      description: "A suggestion can show a short label and send a longer prompt.",
      component: ShortLabels,
    },
  },
  isNew: true,
});

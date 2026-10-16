import { Context } from "@locusgraph/loop";
import { defineDemo, select } from "../../../registry/define-demo";

const levels = { comfortable: 74_200, near: 168_400, full: 200_000 } as const;
const levelOptions = ["comfortable", "near", "full"] as const;
const variants = ["bar", "ring"] as const;

function breakdownFor(usedTokens: number) {
  const system = 3_100;
  const recalled = Math.round(usedTokens * 0.22);
  const tools = Math.round(usedTokens * 0.31);
  return [
    { label: "System prompt", tokens: system },
    { label: "Recalled memories", tokens: recalled },
    { label: "Tool results", tokens: tools },
    { label: "Chat", tokens: usedTokens - system - recalled - tools },
  ];
}

function InComposer() {
  return (
    <div className="flex w-[28rem] max-w-full items-center justify-between bg-card py-2 pr-2 pl-4 text-sm text-muted-foreground ring-1 ring-border">
      <span>Ask about Acme's billing…</span>
      <Context
        variant="ring"
        usedTokens={levels.near}
        limitTokens={200_000}
        breakdown={breakdownFor(levels.near)}
      />
    </div>
  );
}

export default defineDemo({
  title: "Context",
  description:
    "Context window used against its limit. Amber from 80%, red when full. With a breakdown, hover or focus shows what fills the window.",
  controls: { level: select(levelOptions, "near"), variant: select(variants) },
  playground: ({ level, variant }) => (
    <div className="h-[20rem] w-[22rem] max-w-full">
      <Context
        variant={variant}
        usedTokens={levels[level]}
        limitTokens={200_000}
        breakdown={breakdownFor(levels[level])}
      />
    </div>
  ),
  code: ({ variant }) =>
    `<Context\n  variant="${variant}"\n  usedTokens={context.usedTokens}\n  limitTokens={model.contextTokens}\n  breakdown={context.breakdown}\n/>`,
  props: [
    { name: "usedTokens", type: "number" },
    { name: "limitTokens", type: "number" },
    { name: "breakdown", type: "{ label: string; tokens: number }[]" },
    { name: "variant", type: variants.join(" | "), defaultValue: "bar" },
    { name: "label", type: "string", defaultValue: "Context" },
  ],
  examples: {
    InComposer: {
      description: "The ring variant fits beside the composer.",
      component: InComposer,
    },
  },
  isNew: true,
});

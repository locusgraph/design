import { RunCost } from "@locusgraph/agent-ui";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const variants = ["compact", "detailed"] as const;

const timedOut = {
  inputTokens: 18_420,
  outputTokens: 0,
  costMicroUsd: 55_260,
  model: "claude-sonnet-4.5",
  failed: true,
};

const answered = {
  inputTokens: 18_960,
  outputTokens: 1_284,
  costMicroUsd: 76_140,
  model: "claude-sonnet-4.5",
};

function UnderMessage() {
  return (
    <div className="flex max-w-md flex-col gap-2 text-sm">
      <p>Acme's next invoice moves to November 1st, prorated for the 12 extra days.</p>
      <RunCost usage={[timedOut, answered]} />
    </div>
  );
}

export default defineDemo({
  title: "Run Cost",
  description:
    "Tokens and cost for one message or run. Pass one RunUsage or every attempt; failed attempts are counted and their wasted cost shown in red.",
  controls: { variant: select(variants, "detailed"), withFailure: toggle(true) },
  playground: ({ variant, withFailure }) => (
    <div className="w-[32rem] max-w-full">
      <RunCost variant={variant} usage={withFailure ? [timedOut, answered] : answered} />
    </div>
  ),
  code: ({ variant }) => `<RunCost variant="${variant}" usage={run.attempts} />`,
  props: [
    { name: "usage", type: "RunUsage | RunUsage[]" },
    { name: "variant", type: variants.join(" | "), defaultValue: "compact" },
    { name: "label", type: "string", defaultValue: "Run cost" },
  ],
  examples: {
    UnderMessage: {
      description: "The compact variant as a footer under an assistant message.",
      component: UnderMessage,
    },
  },
  isNew: true,
});

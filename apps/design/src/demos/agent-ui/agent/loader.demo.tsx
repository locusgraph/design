import { Loader } from "@locusgraph/agent-ui";
import { defineDemo, select, text } from "../../../registry/define-demo";

const variants = ["dots", "shimmer"] as const;

function Labels() {
  return (
    <div className="flex flex-col items-start gap-3">
      <Loader variant="shimmer" label="Searching memory…" />
      <Loader variant="shimmer" label="Writing to graph_acme…" />
      <Loader variant="shimmer" label="Summing September spend…" />
    </div>
  );
}

export default defineDemo({
  title: "Loader",
  description:
    "Shows the agent is working: typing dots, or a shimmering label. Both are a status region with a label for screen readers.",
  controls: { variant: select(variants), label: text("Thinking…") },
  playground: ({ variant, label }) => <Loader variant={variant} label={label} />,
  code: ({ variant, label }) =>
    `<Loader${variant === "dots" ? "" : ` variant="${variant}"`}${label === "Thinking…" ? "" : ` label="${label}"`} />`,
  props: [
    { name: "variant", type: '"dots" | "shimmer"', defaultValue: '"dots"' },
    { name: "label", type: "string", defaultValue: '"Thinking…"' },
  ],
  examples: { Labels },
  isNew: true,
});

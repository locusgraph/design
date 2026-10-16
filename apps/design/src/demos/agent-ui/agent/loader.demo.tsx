import { Loader, type LoaderVariant, loaderVariants } from "@locusgraph/agent-ui";
import { defineDemo, select, text, toggle } from "../../../registry/define-demo";

const galleryLabels: Record<LoaderVariant, string> = {
  dots: "Typing dots",
  shimmer: "Searching memory…",
  glyph: "Pondering…",
  orb: "Breathing orb",
  gradient: "Thinking…",
  bars: "Listening bars",
  spinner: "Loading results…",
  locus: "Walking the graph…",
};

function Gallery() {
  return (
    <div className="grid w-[36rem] max-w-full grid-cols-1 divide-y ring-1 ring-border sm:grid-cols-2 sm:divide-y-0">
      {loaderVariants.map((variant) => (
        <div
          key={variant}
          className="flex items-center justify-between gap-4 px-4 py-3.5 sm:border-b sm:odd:border-r"
        >
          <Loader variant={variant} label={galleryLabels[variant]} showLabel />
          <span className="font-mono text-[11px] text-muted-foreground">{variant}</span>
        </div>
      ))}
    </div>
  );
}

function LocusGraph() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Loader variant="locus" showLabel={false} className="text-[40px]" />
      <Loader variant="shimmer" label="Recalling 18,204 nodes from acme-customers…" />
    </div>
  );
}

function Steps() {
  return (
    <div className="flex flex-col items-start gap-3">
      <Loader variant="glyph" label="Reading the acme-customers graph…" />
      <Loader variant="spinner" label="Writing to graph_acme…" />
      <Loader variant="gradient" label="Summing September spend…" />
    </div>
  );
}

export default defineDemo({
  title: "Loader",
  description:
    "Shows the agent is working. Eight variants: typing dots, a shimmering label, a cycling star glyph like Claude Code, a breathing orb like ChatGPT, a gradient sparkle like Gemini, equalizer bars, a ring spinner, and the LocusGraph burst whose rays light up in a sweep. Every variant is a status region, scales with font size and holds still under reduced motion.",
  controls: {
    variant: select(loaderVariants, "locus"),
    label: text("Thinking…"),
    showLabel: toggle(true),
  },
  playground: ({ variant, label, showLabel }) => (
    <Loader variant={variant} label={label} showLabel={showLabel} />
  ),
  code: ({ variant, label, showLabel }) =>
    `<Loader${variant === "dots" ? "" : ` variant="${variant}"`}${label === "Thinking…" ? "" : ` label="${label}"`}${showLabel ? "" : " showLabel={false}"} />`,
  props: [
    {
      name: "variant",
      type: '"dots" | "shimmer" | "glyph" | "orb" | "gradient" | "bars" | "spinner" | "locus"',
      defaultValue: '"dots"',
    },
    { name: "label", type: "string", defaultValue: '"Thinking…"' },
    {
      name: "showLabel",
      type: "boolean",
      defaultValue: "true for shimmer, glyph, gradient, spinner, locus",
    },
  ],
  examples: { Gallery, LocusGraph, Steps },
  isNew: true,
});

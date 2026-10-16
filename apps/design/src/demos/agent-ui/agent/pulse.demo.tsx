import { Pulse, type PulseTone, type PulseVariant, pulseVariants } from "@locusgraph/agent-ui";
import { defineDemo, select, text, toggle } from "../../../registry/define-demo";

const galleryLabels: Record<PulseVariant, string> = {
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
      {pulseVariants.map((variant) => (
        <div
          key={variant}
          className="flex items-center justify-between gap-4 px-4 py-3.5 sm:border-b sm:odd:border-r"
        >
          <Pulse variant={variant} label={galleryLabels[variant]} showLabel />
          <span className="eyebrow">{variant}</span>
        </div>
      ))}
    </div>
  );
}

function LocusGraph() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Pulse variant="locus" showLabel={false} className="text-[40px]" />
      <Pulse variant="shimmer" label="Recalling 18,204 nodes from acme-customers…" />
    </div>
  );
}

function Steps() {
  return (
    <div className="flex flex-col items-start gap-3">
      <Pulse variant="glyph" label="Reading the acme-customers graph…" />
      <Pulse variant="spinner" label="Writing to graph_acme…" />
      <Pulse variant="gradient" label="Summing September spend…" />
    </div>
  );
}

function BrandTone() {
  return (
    <div className="flex flex-col items-start gap-3">
      <Pulse variant="glyph" tone="brand" label="Pondering…" />
      <Pulse variant="gradient" tone="brand" label="Thinking…" />
    </div>
  );
}

const tones: PulseTone[] = ["neutral", "brand"];

export default defineDemo({
  title: "Pulse",
  description:
    "Shows the agent is working. Eight variants: typing dots, a shimmering label, a cycling star glyph like Claude Code, a breathing orb like ChatGPT, a gradient sparkle like Gemini, equalizer bars, a ring spinner, and the LocusGraph burst whose rays light up in a sweep. Every variant is a status region, scales with font size and holds still under reduced motion.",
  controls: {
    variant: select(pulseVariants, "locus"),
    label: text("Thinking…"),
    showLabel: toggle(true),
    tone: select(tones, "neutral"),
  },
  playground: ({ variant, label, showLabel, tone }) => (
    <Pulse variant={variant} label={label} showLabel={showLabel} tone={tone} />
  ),
  code: ({ variant, label, showLabel, tone }) =>
    `<Pulse${variant === "dots" ? "" : ` variant="${variant}"`}${label === "Thinking…" ? "" : ` label="${label}"`}${showLabel ? "" : " showLabel={false}"}${tone === "neutral" ? "" : ` tone="${tone}"`} />`,
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
    { name: "tone", type: '"neutral" | "brand"', defaultValue: '"neutral"' },
  ],
  examples: { Gallery, LocusGraph, Steps, BrandTone },
  isNew: true,
});

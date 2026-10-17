import { LocusGraphMark } from "@locusgraph/brand";
import { Button } from "@locusgraph/components";
import { defineDemo, select } from "../../../registry/define-demo";
import { brandPatterns, PatternPreview } from "./patterns/pattern-preview";

function HeroPanel() {
  return (
    <div className="locus-brand-grid flex w-[44rem] max-w-full flex-col items-center gap-5 overflow-hidden px-6 py-20 text-center ring-1 ring-border">
      <LocusGraphMark className="locus-ignites size-12" />
      <span className="locus-tracked">Memory for agents</span>
      <h2 className="font-heading text-3xl font-semibold tracking-[-0.02em]">
        Agents that remember what they learn
      </h2>
      <p className="max-w-md text-sm text-muted-foreground">
        LocusGraph stores what your agents learn as a graph, so the next run starts where the last
        one stopped.
      </p>
      <div className="flex gap-2">
        <Button>Start building</Button>
        <Button variant="outline">Read the docs</Button>
      </div>
    </div>
  );
}

function QuietHeader() {
  return (
    <div className="locus-brand-grid-quiet flex h-64 w-[44rem] max-w-full flex-col gap-1.5 overflow-hidden p-8 ring-1 ring-border">
      <span className="locus-eyebrow">acme-customers</span>
      <h2 className="font-heading text-2xl font-semibold tracking-[-0.02em]">Usage</h2>
      <p className="text-sm text-muted-foreground">18,204 nodes written this month.</p>
    </div>
  );
}

function LoadingLabel() {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="locus-shimmer text-sm text-muted-foreground">Recalling 18,204 nodes…</span>
      <span className="locus-shimmer font-heading text-xl font-semibold">Building your graph</span>
    </div>
  );
}

export default defineDemo({
  title: "Patterns",
  description:
    "Brand backgrounds and effects from @locusgraph/tokens: locus-brand-grid for heroes, locus-brand-grid-quiet for app headers, locus-ignites for the mark's entrance, locus-tracked for kickers and locus-shimmer for loading text. All hold still under reduced motion.",
  controls: { pattern: select(brandPatterns, "locus-brand-grid") },
  playground: ({ pattern }) => <PatternPreview pattern={pattern} />,
  code: ({ pattern }) => {
    if (pattern === "locus-ignites") return '<LocusGraphMark className="locus-ignites size-16" />';
    if (pattern === "locus-tracked")
      return '<span className="locus-tracked">Memory for agents</span>';
    if (pattern === "locus-shimmer")
      return '<span className="locus-shimmer">Walking the graph…</span>';
    return `<section className="${pattern} overflow-hidden">…</section>`;
  },
  props: [
    {
      name: "locus-brand-grid",
      type: "class",
      defaultValue: "grid, dots and a glow that breathes every 7s",
    },
    { name: "locus-brand-grid-quiet", type: "class", defaultValue: "dots fading from the top" },
    { name: "locus-ignites", type: "class", defaultValue: "900ms entrance" },
    { name: "locus-tracked", type: "class", defaultValue: "10px, 0.32em tracking, uppercase" },
    { name: "locus-shimmer", type: "utility", defaultValue: "--locus-shimmer-duration: 2s" },
    { name: "--locus-brand-glow", type: "color", defaultValue: "#0099ff" },
  ],
  examples: {
    HeroPanel: {
      description:
        "A hero: locus-brand-grid behind, the mark ignites, a locus-tracked kicker over the title.",
      component: HeroPanel,
    },
    QuietHeader: {
      description:
        "locus-brand-grid-quiet under an app page header, where the full grid would be loud.",
      component: QuietHeader,
    },
    LoadingLabel: {
      description: "locus-shimmer on text that names what is loading.",
      component: LoadingLabel,
    },
  },
  isNew: true,
});

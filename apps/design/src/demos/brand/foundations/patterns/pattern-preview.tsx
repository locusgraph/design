import { LocusGraphMark, LocusGraphWordmark } from "@locusgraph/brand";
import { Button } from "@locusgraph/components";
import { ArrowCounterClockwise as RotateCcw } from "@phosphor-icons/react/ssr";
import { useState } from "react";

export const brandPatterns = [
  "locus-brand-grid",
  "locus-brand-grid-quiet",
  "locus-ignites",
  "locus-tracked",
  "locus-shimmer",
] as const;

export type BrandPattern = (typeof brandPatterns)[number];

export const patternUsage: Record<BrandPattern, string> = {
  "locus-brand-grid": "Hero and sign-in backgrounds: dotted grid with a breathing glow.",
  "locus-brand-grid-quiet": "App page headers: a faint dot field that fades out down the page.",
  "locus-ignites": "The mark's entrance: scales up from a blur once, on first paint.",
  "locus-tracked": "Wide uppercase kicker above a hero title.",
  "locus-shimmer": "A light sweep across text while something is loading.",
};

function IgnitingMark() {
  const [run, setRun] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <LocusGraphMark key={run} className="locus-ignites size-16" />
      <Button variant="outline" size="sm" onClick={() => setRun((current) => current + 1)}>
        <RotateCcw weight="bold" aria-hidden />
        Replay
      </Button>
    </div>
  );
}

function PatternContent({ pattern }: { pattern: BrandPattern }) {
  if (pattern === "locus-ignites") return <IgnitingMark />;
  if (pattern === "locus-tracked") return <span className="locus-tracked">Memory for agents</span>;
  if (pattern === "locus-shimmer") {
    return <span className="locus-shimmer text-lg text-muted-foreground">Walking the graph…</span>;
  }
  return <LocusGraphWordmark withMark className="text-3xl" />;
}

const backgroundPatterns: BrandPattern[] = ["locus-brand-grid", "locus-brand-grid-quiet"];

export function PatternPreview({ pattern }: { pattern: BrandPattern }) {
  const background = backgroundPatterns.includes(pattern) ? pattern : "";
  return (
    <div className="flex w-full max-w-3xl flex-col ring-1 ring-border">
      <div className={`${background} flex h-72 items-center justify-center overflow-hidden`}>
        <PatternContent pattern={pattern} />
      </div>
      <div className="flex flex-col gap-0.5 border-t px-4 py-3">
        <code className="font-mono text-xs">.{pattern}</code>
        <span className="text-xs text-muted-foreground">{patternUsage[pattern]}</span>
      </div>
    </div>
  );
}

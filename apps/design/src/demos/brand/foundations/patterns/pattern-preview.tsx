import { Reset as RotateCcw } from "@carbon/icons-react";
import { LocusGraphMark, LocusGraphWordmark } from "@locusgraph/brand";
import { Button } from "@locusgraph/components";
import { useState } from "react";

export const brandPatterns = [
  "brand-grid",
  "brand-grid-quiet",
  "ignites",
  "tracked",
  "shimmer",
] as const;

export type BrandPattern = (typeof brandPatterns)[number];

export const patternUsage: Record<BrandPattern, string> = {
  "brand-grid": "Hero and sign-in backgrounds: dotted grid with a breathing glow.",
  "brand-grid-quiet": "App page headers: a faint dot field that fades out down the page.",
  ignites: "The mark's entrance: scales up from a blur once, on first paint.",
  tracked: "Wide uppercase kicker above a hero title.",
  shimmer: "A light sweep across text while something is loading.",
};

function IgnitingMark() {
  const [run, setRun] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <LocusGraphMark key={run} className="ignites size-16" />
      <Button variant="outline" size="sm" onClick={() => setRun((current) => current + 1)}>
        <RotateCcw />
        Replay
      </Button>
    </div>
  );
}

function PatternContent({ pattern }: { pattern: BrandPattern }) {
  if (pattern === "ignites") return <IgnitingMark />;
  if (pattern === "tracked") return <span className="tracked">Memory for agents</span>;
  if (pattern === "shimmer") {
    return <span className="shimmer text-lg text-muted-foreground">Walking the graph…</span>;
  }
  return <LocusGraphWordmark withMark className="text-3xl" />;
}

const backgroundPatterns: BrandPattern[] = ["brand-grid", "brand-grid-quiet"];

export function PatternPreview({ pattern }: { pattern: BrandPattern }) {
  const background = backgroundPatterns.includes(pattern) ? pattern : "";
  return (
    <div className="flex w-full max-w-3xl flex-col ring-1 ring-border">
      <div className={`${background} flex h-72 items-center justify-center overflow-hidden`}>
        <PatternContent pattern={pattern} />
      </div>
      <div className="flex items-center justify-between gap-4 border-t px-4 py-3">
        <code className="font-mono text-xs">.{pattern}</code>
        <span className="text-right text-xs text-muted-foreground">{patternUsage[pattern]}</span>
      </div>
    </div>
  );
}

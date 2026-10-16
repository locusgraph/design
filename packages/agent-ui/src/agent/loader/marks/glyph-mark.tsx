import { cn } from "@locusgraph/components";
import { useEffect, useState } from "react";
import type { LoaderTone } from "../loader-tone";
import { prefersReducedMotion } from "../use-loop-animation";

const glyphs = ["·", "✢", "✳", "✶", "✻", "✽", "✻", "✶", "✳", "✢"];
const restingGlyph = "✻";

export function GlyphMark({ tone = "neutral" }: { tone?: LoaderTone }) {
  const [index, setIndex] = useState<number>();
  useEffect(() => {
    if (prefersReducedMotion()) return;
    setIndex(0);
    const timer = window.setInterval(
      () => setIndex((current) => ((current ?? 0) + 1) % glyphs.length),
      120
    );
    return () => window.clearInterval(timer);
  }, []);
  return (
    <span
      aria-hidden
      data-slot="loader-glyph"
      className={cn(
        "inline-flex w-[1.1em] justify-center font-mono text-[1.15em] leading-none",
        tone === "brand" ? "text-orange-500" : "text-foreground/70"
      )}
    >
      {index === undefined ? restingGlyph : glyphs[index]}
    </span>
  );
}

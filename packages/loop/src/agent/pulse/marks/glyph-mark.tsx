import { cn } from "@locusgraph/components";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../../../shared/reduced-motion";
import type { PulseTone } from "../pulse-tone";

const glyphs = ["·", "✢", "✳", "✶", "✻", "✽", "✻", "✶", "✳", "✢"];
const restingGlyph = "✻";

export function GlyphMark({ tone = "neutral" }: { tone?: PulseTone }) {
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
      data-slot="pulse-glyph"
      className={cn(
        "inline-flex w-[1.1em] justify-center font-mono text-[1.15em] leading-none",
        tone === "brand" ? "text-[var(--s2)]" : "text-foreground/70"
      )}
    >
      {index === undefined ? restingGlyph : glyphs[index]}
    </span>
  );
}

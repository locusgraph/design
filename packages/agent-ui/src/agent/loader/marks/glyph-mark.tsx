import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../use-loop-animation";

const glyphs = ["·", "✢", "✳", "✶", "✻", "✽", "✻", "✶", "✳", "✢"];
const restingGlyph = "✻";

export function GlyphMark() {
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
      className="inline-flex w-[1.1em] justify-center font-mono text-[1.15em] leading-none text-orange-500"
    >
      {index === undefined ? restingGlyph : glyphs[index]}
    </span>
  );
}

import { cn } from "@locusgraph/components";
import type { ReactNode } from "react";
import { GradientLabel } from "./gradient-label";
import type { LoaderTone } from "./loader-tone";
import { BarsMark } from "./marks/bars-mark";
import { GlyphMark } from "./marks/glyph-mark";
import { LocusMark } from "./marks/locus-mark";
import { OrbMark } from "./marks/orb-mark";
import { SpinnerMark } from "./marks/spinner-mark";

export type { LoaderTone };

export type LoaderVariant =
  | "dots"
  | "shimmer"
  | "glyph"
  | "orb"
  | "gradient"
  | "bars"
  | "spinner"
  | "locus";

export const loaderVariants: LoaderVariant[] = [
  "dots",
  "shimmer",
  "glyph",
  "orb",
  "gradient",
  "bars",
  "spinner",
  "locus",
];

export type LoaderProps = {
  variant?: LoaderVariant;
  label?: string;
  showLabel?: boolean;
  tone?: LoaderTone;
  className?: string;
};

const dotDelays = ["[animation-delay:0ms]", "[animation-delay:200ms]", "[animation-delay:400ms]"];

function TypingDots() {
  return (
    <span aria-hidden className="flex h-5 items-center gap-1">
      {dotDelays.map((delay) => (
        <span
          key={delay}
          className={cn(
            "size-1.5 rounded-full bg-muted-foreground/70 motion-safe:animate-pulse",
            delay
          )}
        />
      ))}
    </span>
  );
}

type MarkProps = { tone: LoaderTone };

const marks: Partial<Record<LoaderVariant, (props: MarkProps) => ReactNode>> = {
  dots: TypingDots,
  glyph: GlyphMark,
  orb: OrbMark,
  bars: BarsMark,
  spinner: SpinnerMark,
  locus: LocusMark,
};

const labelShownByDefault: Record<LoaderVariant, boolean> = {
  dots: false,
  shimmer: true,
  glyph: true,
  orb: false,
  gradient: true,
  bars: false,
  spinner: true,
  locus: true,
};

type VisibleLabelProps = { variant: LoaderVariant; label: string; tone: LoaderTone };

function VisibleLabel({ variant, label, tone }: VisibleLabelProps) {
  if (variant === "gradient") return <GradientLabel label={label} tone={tone} />;
  const shimmers = variant === "shimmer" || variant === "glyph" || variant === "locus";
  return <span className={cn(shimmers && "motion-safe:shimmer")}>{label}</span>;
}

export function Loader({
  variant = "dots",
  label = "Thinking…",
  showLabel,
  tone = "neutral",
  className,
}: LoaderProps) {
  const Mark = marks[variant];
  const labelVisible = showLabel ?? labelShownByDefault[variant];
  return (
    <span
      data-slot="loader"
      data-variant={variant}
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center gap-2 text-sm text-muted-foreground", className)}
    >
      {Mark && <Mark tone={tone} />}
      {labelVisible ? (
        <VisibleLabel variant={variant} label={label} tone={tone} />
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </span>
  );
}

"use client";

import { cn } from "@locusgraph/components";
import { StarFour as SparkleIcon } from "@phosphor-icons/react/ssr";
import type { PulseTone } from "./pulse-tone";
import { useLoopAnimation } from "./use-loop-animation";

const drift: Keyframe[] = [{ backgroundPosition: "0% 50%" }, { backgroundPosition: "200% 50%" }];
const turn: Keyframe[] = [
  { transform: "rotate(0deg) scale(1)" },
  { transform: "rotate(180deg) scale(0.8)" },
  { transform: "rotate(360deg) scale(1)" },
];

const toneIcon: Record<PulseTone, string> = {
  neutral: "fill-muted-foreground text-muted-foreground",
  brand: "fill-memory text-memory",
};

const toneText: Record<PulseTone, string> = {
  neutral:
    "bg-[linear-gradient(90deg,var(--color-faint)_25%,var(--color-foreground)_50%,var(--color-faint)_75%)]",
  brand:
    "bg-[linear-gradient(90deg,var(--color-interactive),var(--color-memory),var(--locus-s5),var(--color-interactive))]",
};

type GradientLabelProps = { label: string; tone?: PulseTone };

export function GradientLabel({ label, tone = "neutral" }: GradientLabelProps) {
  const text = useLoopAnimation<HTMLSpanElement>(drift, 2600, 0, "linear");
  const icon = useLoopAnimation<SVGSVGElement>(turn, 2600);
  return (
    <span className="inline-flex items-center gap-1.5">
      <SparkleIcon
        weight="fill"
        ref={icon}
        aria-hidden
        className={cn("size-[1.05em]", toneIcon[tone])}
      />
      <span
        ref={text}
        data-slot="pulse-gradient"
        className={cn(
          "bg-[length:200%_100%] bg-clip-text font-medium text-transparent",
          toneText[tone]
        )}
      >
        {label}
      </span>
    </span>
  );
}

import { cn } from "@locusgraph/components";
import { SparkleIcon } from "lucide-react";
import type { LoaderTone } from "./loader-tone";
import { useLoopAnimation } from "./use-loop-animation";

const drift: Keyframe[] = [{ backgroundPosition: "0% 50%" }, { backgroundPosition: "200% 50%" }];
const turn: Keyframe[] = [
  { transform: "rotate(0deg) scale(1)" },
  { transform: "rotate(180deg) scale(0.8)" },
  { transform: "rotate(360deg) scale(1)" },
];

const toneIcon: Record<LoaderTone, string> = {
  neutral: "fill-foreground/70 text-foreground/70",
  brand: "fill-violet-500 text-violet-500",
};

const toneText: Record<LoaderTone, string> = {
  neutral:
    "bg-[linear-gradient(90deg,var(--color-muted-foreground),var(--color-foreground),var(--color-muted-foreground))]",
  brand:
    "bg-[linear-gradient(90deg,var(--color-sky-500),var(--color-violet-500),var(--color-pink-500),var(--color-sky-500))]",
};

type GradientLabelProps = { label: string; tone?: LoaderTone };

export function GradientLabel({ label, tone = "neutral" }: GradientLabelProps) {
  const text = useLoopAnimation<HTMLSpanElement>(drift, 2600, 0, "linear");
  const icon = useLoopAnimation<SVGSVGElement>(turn, 2600);
  return (
    <span className="inline-flex items-center gap-1.5">
      <SparkleIcon ref={icon} aria-hidden className={cn("size-[1.05em]", toneIcon[tone])} />
      <span
        ref={text}
        data-slot="loader-gradient"
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

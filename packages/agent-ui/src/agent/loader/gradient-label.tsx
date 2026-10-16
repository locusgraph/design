import { SparkleIcon } from "lucide-react";
import { useLoopAnimation } from "./use-loop-animation";

const drift: Keyframe[] = [{ backgroundPosition: "0% 50%" }, { backgroundPosition: "200% 50%" }];
const turn: Keyframe[] = [
  { transform: "rotate(0deg) scale(1)" },
  { transform: "rotate(180deg) scale(0.8)" },
  { transform: "rotate(360deg) scale(1)" },
];

export function GradientLabel({ label }: { label: string }) {
  const text = useLoopAnimation<HTMLSpanElement>(drift, 2600, 0, "linear");
  const icon = useLoopAnimation<SVGSVGElement>(turn, 2600);
  return (
    <span className="inline-flex items-center gap-1.5">
      <SparkleIcon
        ref={icon}
        aria-hidden
        className="size-[1.05em] fill-violet-500 text-violet-500"
      />
      <span
        ref={text}
        data-slot="loader-gradient"
        className="bg-[linear-gradient(90deg,var(--color-sky-500),var(--color-violet-500),var(--color-pink-500),var(--color-sky-500))] bg-[length:200%_100%] bg-clip-text font-medium text-transparent"
      >
        {label}
      </span>
    </span>
  );
}

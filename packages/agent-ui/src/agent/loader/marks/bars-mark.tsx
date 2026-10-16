import { useLoopAnimation } from "../use-loop-animation";

const bounce: Keyframe[] = [
  { transform: "scaleY(0.35)" },
  { transform: "scaleY(1)" },
  { transform: "scaleY(0.35)" },
];

const barDelays = [0, 140, 280, 420];

function Bar({ delay }: { delay: number }) {
  const ref = useLoopAnimation<HTMLSpanElement>(bounce, 900, delay);
  return (
    <span
      ref={ref}
      className="h-full w-[0.16em] origin-center scale-y-[0.35] rounded-full bg-current"
    />
  );
}

export function BarsMark() {
  return (
    <span
      aria-hidden
      data-slot="loader-bars"
      className="inline-flex h-[1em] items-center gap-[0.14em] text-foreground/70"
    >
      {barDelays.map((delay) => (
        <Bar key={delay} delay={delay} />
      ))}
    </span>
  );
}

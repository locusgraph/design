import { useLoopAnimation } from "../use-loop-animation";

const breathe: Keyframe[] = [
  { transform: "scale(1)", opacity: 1 },
  { transform: "scale(0.62)", opacity: 0.55 },
  { transform: "scale(1)", opacity: 1 },
];

export function OrbMark() {
  const ref = useLoopAnimation<HTMLSpanElement>(breathe, 1500);
  return (
    <span aria-hidden className="inline-flex size-[1.25em] items-center justify-center">
      <span ref={ref} data-slot="pulse-orb" className="size-[0.8em] rounded-full bg-foreground" />
    </span>
  );
}

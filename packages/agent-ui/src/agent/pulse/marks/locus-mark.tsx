import { LocusGraphMark } from "@locusgraph/brand";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../use-loop-animation";

const sweepMs = 1800;
const markCenter = { x: 14.5, y: 13 };
const rayGlow: Keyframe[] = [{ opacity: 0.3 }, { opacity: 1, offset: 0.12 }, { opacity: 0.3 }];

function sweepDelay(path: SVGPathElement) {
  const box = path.getBBox();
  const angle = Math.atan2(
    box.y + box.height / 2 - markCenter.y,
    box.x + box.width / 2 - markCenter.x
  );
  const turn = (angle + Math.PI) / (2 * Math.PI);
  return -(1 - turn) * sweepMs;
}

function animateRays(svg: SVGSVGElement) {
  const rays = [...svg.querySelectorAll("path")];
  if (rays.length === 0 || typeof rays[0]?.getBBox !== "function") return [];
  return rays.map((ray) =>
    ray.animate(rayGlow, {
      duration: sweepMs,
      delay: sweepDelay(ray),
      easing: "linear",
      iterations: Number.POSITIVE_INFINITY,
    })
  );
}

export function LocusMark() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg || prefersReducedMotion()) return;
    const animations = animateRays(svg);
    return () => {
      for (const animation of animations) animation.cancel();
    };
  }, []);
  return (
    <LocusGraphMark
      ref={ref}
      data-slot="pulse-locus"
      className="h-[1.35em] w-auto text-foreground"
    />
  );
}

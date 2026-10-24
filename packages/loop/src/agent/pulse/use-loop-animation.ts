"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../../shared/reduced-motion";

export function useLoopAnimation<T extends Element>(
  keyframes: Keyframe[],
  duration: number,
  delay = 0,
  easing = "ease-in-out"
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof element.animate !== "function" || prefersReducedMotion()) return;
    const animation = element.animate(keyframes, {
      duration,
      delay,
      easing,
      iterations: Number.POSITIVE_INFINITY,
    });
    return () => animation.cancel();
  }, [keyframes, duration, delay, easing]);
  return ref;
}

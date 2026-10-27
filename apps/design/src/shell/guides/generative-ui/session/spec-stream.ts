import type { Spec } from "@json-render/core";
import { useEffect, useState } from "react";

const elementDelayMs = 260;

function childrenOf(spec: Spec, id: string): string[] {
  return spec.elements[id]?.children ?? [];
}

export function elementOrder(spec: Spec): string[] {
  const order: string[] = [];
  const queue = [spec.root];
  while (queue.length > 0) {
    const id = queue.shift();
    if (!id || order.includes(id) || !spec.elements[id]) continue;
    order.push(id);
    queue.push(...childrenOf(spec, id));
  }
  return order;
}

export function partialSpec(spec: Spec, shownCount: number): Spec {
  const shown = new Set(elementOrder(spec).slice(0, shownCount));
  const elements = Object.fromEntries(
    Object.entries(spec.elements)
      .filter(([id]) => shown.has(id))
      .map(([id, element]) => [
        id,
        element.children
          ? { ...element, children: element.children.filter((child) => shown.has(child)) }
          : element,
      ])
  );
  return { ...spec, elements };
}

export function gatedActionCount(spec: Spec) {
  return Object.values(spec.elements).filter((element) => element.on).length;
}

function prefersReducedMotion() {
  return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export function useSpecStream(spec: Spec, runId: number) {
  const total = elementOrder(spec).length;
  const [shown, setShown] = useState(total);
  useEffect(() => {
    if (runId === 0 || prefersReducedMotion()) {
      setShown(Number.POSITIVE_INFINITY);
      return;
    }
    setShown(0);
    const timer = globalThis.setInterval(() => {
      setShown((current) => current + 1);
    }, elementDelayMs);
    return () => globalThis.clearInterval(timer);
  }, [runId]);
  const shownCount = Math.min(shown, total);
  return { shownCount, total, streaming: shownCount < total };
}

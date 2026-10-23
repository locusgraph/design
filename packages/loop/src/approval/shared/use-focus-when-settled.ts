import { type RefObject, useEffect, useRef } from "react";

function focusWasDropped() {
  const active = document.activeElement;
  return active === null || active === document.body;
}

export function useFocusWhenSettled<Element extends HTMLElement>(
  waiting: boolean
): RefObject<Element | null> {
  const ref = useRef<Element | null>(null);
  const wasWaiting = useRef(waiting);
  useEffect(() => {
    if (wasWaiting.current && !waiting && focusWasDropped()) {
      ref.current?.focus({ preventScroll: true });
    }
    wasWaiting.current = waiting;
  }, [waiting]);
  return ref;
}

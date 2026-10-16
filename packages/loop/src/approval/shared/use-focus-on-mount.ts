import { type RefObject, useEffect, useRef } from "react";

export function useFocusOnMount<Element extends HTMLElement>(
  enabled: boolean
): RefObject<Element | null> {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    if (enabled) ref.current?.focus({ preventScroll: true });
  }, [enabled]);
  return ref;
}

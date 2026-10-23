import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../shared/reduced-motion";

const bottomThresholdPx = 48;

function distanceFromBottom(element: HTMLElement): number {
  return element.scrollHeight - element.scrollTop - element.clientHeight;
}

export function useStickToBottom() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stuckRef = useRef(true);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const pinToBottom = useCallback(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, []);

  const handleScroll = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    const atBottom = distanceFromBottom(viewport) <= bottomThresholdPx;
    stuckRef.current = atBottom;
    setIsAtBottom(atBottom);
  }, []);

  const scrollToLatest = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    stuckRef.current = true;
    setIsAtBottom(true);
    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content || typeof ResizeObserver === "undefined") {
      return;
    }
    pinToBottom();
    const observer = new ResizeObserver(() => {
      if (stuckRef.current) {
        pinToBottom();
      }
    });
    observer.observe(content);
    return () => observer.disconnect();
  }, [pinToBottom]);

  return { viewportRef, contentRef, isAtBottom, handleScroll, scrollToLatest };
}

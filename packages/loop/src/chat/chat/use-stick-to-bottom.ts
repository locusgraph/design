import { useCallback, useEffect, useRef, useState } from "react";

const bottomThresholdPx = 48;

function distanceFromBottom(element: HTMLElement): number {
  return element.scrollHeight - element.scrollTop - element.clientHeight;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

type ScrollSnapshot = { top: number; height: number };

function scrolledUpByReader(viewport: HTMLElement, previous: ScrollSnapshot): boolean {
  return viewport.scrollTop < previous.top && viewport.scrollHeight === previous.height;
}

export function useStickToBottom() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stuckRef = useRef(true);
  const lastScrollRef = useRef<ScrollSnapshot>({ top: 0, height: 0 });
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
    const readerScrolledUp = scrolledUpByReader(viewport, lastScrollRef.current);
    lastScrollRef.current = { top: viewport.scrollTop, height: viewport.scrollHeight };
    if (atBottom) {
      stuckRef.current = true;
    } else if (readerScrolledUp) {
      stuckRef.current = false;
    } else if (stuckRef.current) {
      pinToBottom();
    }
    setIsAtBottom(stuckRef.current);
  }, [pinToBottom]);

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

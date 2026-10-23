import { useEffect } from "react";

const popupSelector = [
  "[data-radix-popper-content-wrapper]",
  "[data-sonner-toast]",
  "[data-slot=popover-content]",
  "[data-slot=hover-card-content]",
  "[data-slot=tooltip-content]",
].join(",");
const popupMargin = 16;

function lowestPopupBottom() {
  let bottom = 0;
  for (const popup of document.querySelectorAll(popupSelector)) {
    const rect = popup.getBoundingClientRect();
    if (rect.height === 0) continue;
    const clippedAbove = rect.top < popupMargin;
    const roomToFlipBelow = window.innerHeight + rect.height + popupMargin;
    bottom = Math.max(bottom, clippedAbove ? roomToFlipBelow : rect.bottom + popupMargin);
  }
  return bottom;
}

function neededHeight(content: HTMLElement) {
  return Math.max(content.offsetHeight, lowestPopupBottom());
}

export function useReportFrameHeight(content: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const element = content.current;
    if (!element) return;
    let frame = 0;
    let lastHeight = -1;
    const report = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (element.childElementCount === 0) return;
        const height = Math.ceil(neededHeight(element));
        if (height === lastHeight) return;
        lastHeight = height;
        window.parent.postMessage({ type: "frame-height", height }, window.location.origin);
      });
    };
    const resize = new ResizeObserver(report);
    resize.observe(element);
    const mutations = new MutationObserver(report);
    mutations.observe(document.body, { childList: true, subtree: true, attributes: true });
    window.addEventListener("resize", report);
    report();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      mutations.disconnect();
      window.removeEventListener("resize", report);
    };
  }, [content]);
}

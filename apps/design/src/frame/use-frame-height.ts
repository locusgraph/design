import { useEffect } from "react";

const popupSelector = [
  "[data-radix-popper-content-wrapper]",
  "[data-sonner-toast]",
  "[data-slot=popover-content]",
  "[data-slot=hover-card-content]",
  "[data-slot=tooltip-content]",
  "[data-slot=combobox-content]",
].join(",");
const popupMargin = 16;
const viewportPinnedSelector = "[data-sonner-toaster]";

const subpixelSlack = 2;

function scrollsVertically(element: Element) {
  const overflow = getComputedStyle(element).overflowY;
  return overflow === "auto" || overflow === "scroll";
}

function hiddenScrollHeight(popup: Element) {
  let hidden = 0;
  for (const element of [popup, ...popup.querySelectorAll("*")]) {
    if (!scrollsVertically(element)) continue;
    hidden = Math.max(hidden, element.scrollHeight - element.clientHeight);
  }
  return hidden > subpixelSlack ? hidden : 0;
}

function naturalPopupHeight(popup: Element, renderedHeight: number) {
  const maxHeight = Number.parseFloat(getComputedStyle(popup).maxHeight);
  const natural = renderedHeight + hiddenScrollHeight(popup);
  return Number.isNaN(maxHeight) ? natural : Math.min(natural, maxHeight);
}

function lowestPopupBottom() {
  let bottom = 0;
  for (const popup of document.querySelectorAll(popupSelector)) {
    const rendered = popup.getBoundingClientRect();
    if (rendered.height === 0) continue;
    const height = naturalPopupHeight(popup, rendered.height);
    if (popup.closest(viewportPinnedSelector)) {
      bottom = Math.max(bottom, height + popupMargin * 2);
      continue;
    }
    const clippedAbove = rendered.top < popupMargin;
    const roomToFlipBelow = window.innerHeight + height + popupMargin;
    bottom = Math.max(bottom, clippedAbove ? roomToFlipBelow : rendered.top + height + popupMargin);
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

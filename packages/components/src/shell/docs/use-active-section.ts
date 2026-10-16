import { useCallback, useEffect, useRef, useState } from "react";

const SMOOTH_SCROLL_MS = 800;

function isWindowScrolledToBottom() {
  const pageHeight = document.documentElement.scrollHeight;
  const canScroll = pageHeight > window.innerHeight + 2;
  return canScroll && window.innerHeight + window.scrollY >= pageHeight - 2;
}

const ACTIVE_LINE_PX = 120;

function lastSectionAboveLine(ids: string[]) {
  let current = ids[0];
  for (const id of ids) {
    const top = document.getElementById(id)?.getBoundingClientRect().top;
    if (top !== undefined && top <= ACTIVE_LINE_PX) {
      current = id;
    }
  }
  return current;
}

function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const pinnedUntil = useRef(0);
  const followScroll = useCallback((id: string) => {
    if (Date.now() > pinnedUntil.current) {
      setActiveId(id);
    }
  }, []);
  const pinSection = useCallback((id: string) => {
    pinnedUntil.current = Date.now() + SMOOTH_SCROLL_MS;
    setActiveId(id);
  }, []);
  const idsKey = sectionIds.join(" ");

  useEffect(() => {
    const ids = idsKey.split(" ").filter(Boolean);
    let frame = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const lastId = ids.at(-1);
        const current = isWindowScrolledToBottom() && lastId ? lastId : lastSectionAboveLine(ids);
        if (current) {
          followScroll(current);
        }
      });
    };
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [idsKey, followScroll]);

  return [activeId, pinSection] as const;
}

export { useActiveSection };

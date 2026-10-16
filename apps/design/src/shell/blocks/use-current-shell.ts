import { useEffect, useState } from "react";

const ACTIVE_LINE_PX = 160;

function lastShellAboveLine(ids: string[]) {
  let current = ids[0] ?? "";
  for (const id of ids) {
    const top = document.getElementById(id)?.getBoundingClientRect().top;
    if (top !== undefined && top <= ACTIVE_LINE_PX) {
      current = id;
    }
  }
  return current;
}

export function useCurrentShell(ids: string[]) {
  const [currentId, setCurrentId] = useState(ids[0] ?? "");
  const idsKey = ids.join(" ");

  useEffect(() => {
    const shellIds = idsKey.split(" ").filter(Boolean);
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setCurrentId(lastShellAboveLine(shellIds)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [idsKey]);

  return currentId;
}

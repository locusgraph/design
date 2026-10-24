import { shellContentId } from "@locusgraph/components";
import { useEffect, useRef, useState } from "react";

function focusContentIfFocusWasLost() {
  if (document.activeElement && document.activeElement !== document.body) return;
  document.getElementById(shellContentId)?.focus({ preventScroll: true });
}

export function RouteAnnouncer({ path, title }: { path: string; title: string }) {
  const [announcement, setAnnouncement] = useState("");
  const previousPath = useRef(path);

  useEffect(() => {
    if (previousPath.current === path) return;
    previousPath.current = path;
    setAnnouncement(title);
    focusContentIfFocusWasLost();
  }, [path, title]);

  return (
    <p aria-live="polite" aria-atomic="true" className="sr-only">
      {announcement}
    </p>
  );
}

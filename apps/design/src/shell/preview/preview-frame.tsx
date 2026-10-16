import { cn } from "@locusgraph/components";
import { useEffect, useRef, useState } from "react";
import type { PreviewHeight } from "../../registry/define-demo";
import type { Viewport } from "../../url-state";
import {
  type FrameRenderMessage,
  isFrameHeightMessage,
  isFrameReadyMessage,
} from "./frame-messages";

type PreviewFrameProps = { message: FrameRenderMessage; viewport: Viewport; height: PreviewHeight };

const AUTO_MIN_HEIGHT = 200;
const TALL_HEIGHT = 360;

function useFrameEvents(frame: React.RefObject<HTMLIFrameElement | null>) {
  const [ready, setReady] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow) {
        return;
      }
      if (isFrameReadyMessage(event.data)) {
        setReady(true);
      }
      if (isFrameHeightMessage(event.data)) {
        setContentHeight(event.data.height);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [frame]);
  return { ready, contentHeight };
}

export function PreviewFrame({ message, viewport, height }: PreviewFrameProps) {
  const frame = useRef<HTMLIFrameElement>(null);
  const { ready, contentHeight } = useFrameEvents(frame);
  const frameHeight = height === "tall" ? TALL_HEIGHT : Math.max(AUTO_MIN_HEIGHT, contentHeight);

  useEffect(() => {
    if (ready) {
      frame.current?.contentWindow?.postMessage(message, window.location.origin);
    }
  }, [ready, message]);

  return (
    <div className="flex justify-center">
      <iframe
        ref={frame}
        title="Component preview"
        src="/frame.html"
        style={{ height: frameHeight }}
        className={cn(
          "border-0 transition-[width,height] duration-200",
          viewport === "mobile" ? "w-[375px] border-x" : "w-full"
        )}
      />
    </div>
  );
}

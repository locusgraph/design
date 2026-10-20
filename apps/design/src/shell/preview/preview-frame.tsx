import { cn } from "@locusgraph/components";
import { Pulse } from "@locusgraph/loop";
import { useEffect, useRef, useState } from "react";
import type { PreviewHeight } from "../../registry/define-demo";
import type { Viewport } from "../../url-state";
import {
  type FrameRenderMessage,
  isFrameHeightMessage,
  isFrameReadyMessage,
} from "./frame-messages";

type PreviewFrameProps = {
  message: FrameRenderMessage;
  viewport: Viewport;
  height: PreviewHeight;
  expectedHeight?: number;
};

const AUTO_MIN_HEIGHT = 200;
const TALL_HEIGHT = 480;

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

function useWaitedTooLong(ms: number) {
  const [waited, setWaited] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setWaited(true), ms);
    return () => clearTimeout(timer);
  }, [ms]);
  return waited;
}

function frameHeightFor(
  height: PreviewHeight,
  contentHeight: number,
  measured: boolean,
  expectedHeight: number | undefined
) {
  if (!measured) return expectedHeight ?? AUTO_MIN_HEIGHT;
  return height === "tall" ? Math.max(TALL_HEIGHT, contentHeight) : contentHeight;
}

export function PreviewFrame({ message, viewport, height, expectedHeight }: PreviewFrameProps) {
  const frame = useRef<HTMLIFrameElement>(null);
  const { ready, contentHeight } = useFrameEvents(frame);
  const waitedTooLong = useWaitedTooLong(2000);
  const measured = contentHeight > 0 || waitedTooLong;
  const frameHeight = frameHeightFor(height, contentHeight, measured, expectedHeight);
  const [initialTheme] = useState(message.theme);

  useEffect(() => {
    if (ready) {
      frame.current?.contentWindow?.postMessage(message, window.location.origin);
    }
  }, [ready, message]);

  return (
    <div className="relative flex justify-center">
      {!measured && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Pulse variant="locus" label="Loading preview…" className="text-muted-foreground" />
        </div>
      )}
      <iframe
        ref={frame}
        title="Component preview"
        src={`/frame.html?theme=${initialTheme}`}
        style={{ height: frameHeight, colorScheme: message.theme }}
        className={cn(
          "border-0 transition-[width,opacity] duration-200",
          !measured && "opacity-0",
          viewport === "mobile" ? "w-[375px] border-x" : "w-full"
        )}
      />
    </div>
  );
}

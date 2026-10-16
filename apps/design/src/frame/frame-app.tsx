import { cn, Toaster } from "@locusgraph/components";
import { useEffect, useRef, useState } from "react";
import { useDemoEntry } from "../registry/load-demos";
import {
  type FrameRenderMessage,
  frameReadyMessage,
  isFrameRenderMessage,
} from "../shell/preview/frame-messages";
import { previewBackgroundClass } from "../shell/preview/preview-toolbar";
import { useDocumentTheme } from "../shell/theme";

function useRenderMessage() {
  const [message, setMessage] = useState<FrameRenderMessage | null>(null);
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === window.location.origin && isFrameRenderMessage(event.data)) {
        setMessage(event.data);
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage(frameReadyMessage, window.location.origin);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  return message;
}

function useReportContentHeight(content: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const element = content.current;
    if (!element) {
      return;
    }
    const observer = new ResizeObserver(() => {
      window.parent.postMessage(
        { type: "frame-height", height: element.offsetHeight },
        window.location.origin
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [content]);
}

export function FrameApp() {
  const message = useRenderMessage();
  const content = useRef<HTMLDivElement>(null);
  useReportContentHeight(content);
  useDocumentTheme(message?.theme ?? "light");
  const entry = useDemoEntry(message?.path);
  return (
    <main
      className={cn(
        "flex min-h-svh items-center justify-center",
        previewBackgroundClass[message?.background ?? "surface"]
      )}
    >
      <div ref={content} className="flex max-w-full items-center justify-center p-10">
        {entry?.demo.playground(message?.values as never)}
      </div>
      <Toaster theme={message?.theme ?? "light"} position="bottom-right" />
    </main>
  );
}

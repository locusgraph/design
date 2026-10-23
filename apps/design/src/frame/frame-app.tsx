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
import type { Theme } from "../url-state";
import { useReportFrameHeight } from "./use-frame-height";

const themeFromUrl: Theme =
  new URLSearchParams(window.location.search).get("theme") === "dark" ? "dark" : "light";

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

export function FrameApp() {
  const message = useRenderMessage();
  const content = useRef<HTMLDivElement>(null);
  useReportFrameHeight(content);
  const theme = message?.theme ?? themeFromUrl;
  useDocumentTheme(theme);
  const entry = useDemoEntry(message?.path);
  return (
    <main
      className={cn(
        "flex min-h-svh justify-center",
        entry?.demo.previewHeight === "tall" ? "items-center" : "items-start",
        previewBackgroundClass[message?.background ?? "surface"]
      )}
    >
      <div ref={content} className="flex w-full max-w-full items-center justify-center p-10">
        {entry?.demo.playground(message?.values as never)}
      </div>
      <Toaster theme={theme} position="bottom-right" />
    </main>
  );
}

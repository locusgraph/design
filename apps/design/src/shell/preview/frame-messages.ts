import type { ControlValue } from "../../registry/define-demo";
import type { PreviewBackground, Theme } from "../../url-state";

export type FrameRenderMessage = {
  type: "render";
  path: string;
  values: Record<string, ControlValue>;
  theme: Theme;
  background: PreviewBackground;
};

export type FrameHeightMessage = { type: "frame-height"; height: number };

export const frameReadyMessage = { type: "frame-ready" } as const;

function hasType(data: unknown, type: string) {
  return typeof data === "object" && data !== null && (data as { type?: unknown }).type === type;
}

export function isFrameRenderMessage(data: unknown): data is FrameRenderMessage {
  return hasType(data, "render");
}

export function isFrameReadyMessage(data: unknown) {
  return hasType(data, "frame-ready");
}

export function isFrameHeightMessage(data: unknown): data is FrameHeightMessage {
  return hasType(data, "frame-height");
}

"use client";

import {
  CheckCircle as CircleCheckIcon,
  Info as InfoIcon,
  CircleNotch as Loader2Icon,
  XCircle as OctagonXIcon,
  Warning as TriangleAlertIcon,
} from "@phosphor-icons/react/ssr";
import type * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const toasterColors = {
  "--normal-bg": "var(--locus-popover)",
  "--normal-text": "var(--locus-popover-foreground)",
  "--normal-border": "var(--locus-border)",
  "--border-radius": "var(--locus-radius)",
  "--width": "22.5rem",
} as React.CSSProperties;

const quietCardClassNames = {
  toast:
    "items-start! gap-3! p-4! font-sans! shadow-[var(--locus-overlay-shadow)]! [&_[data-icon]]:mt-0.5",
  content: "gap-0.5!",
  title: "text-sm! leading-snug! font-medium!",
  description: "text-xs! leading-snug! text-muted-foreground!",
  actionButton:
    "h-control-xs! self-center! rounded-full! bg-primary! px-3! font-heading! text-xs! font-medium! text-primary-foreground! locus-focus-ring",
  cancelButton:
    "h-control-xs! self-center! rounded-full! bg-muted! px-3! font-heading! text-xs! font-medium! text-foreground! locus-focus-ring",
  closeButton:
    "border-border! bg-popover! text-muted-foreground! hover:text-foreground! locus-focus-ring",
  success: "[&_[data-icon]]:text-good",
  info: "[&_[data-icon]]:text-interactive",
  warning: "[&_[data-icon]]:text-warn",
  error: "[&_[data-icon]]:text-destructive",
};

function Toaster({
  theme = "system",
  expand = true,
  gap = 8,
  toastOptions,
  ...props
}: ToasterProps) {
  return (
    <Sonner
      theme={theme}
      expand={expand}
      gap={gap}
      className="toaster group"
      toastOptions={{
        ...toastOptions,
        classNames: { ...quietCardClassNames, ...toastOptions?.classNames },
      }}
      icons={{
        success: <CircleCheckIcon weight="bold" aria-hidden className="size-4" />,
        info: <InfoIcon weight="bold" aria-hidden className="size-4" />,
        warning: <TriangleAlertIcon weight="bold" aria-hidden className="size-4" />,
        error: <OctagonXIcon weight="bold" aria-hidden className="size-4" />,
        loading: (
          <Loader2Icon weight="bold" aria-hidden className="size-4 motion-safe:animate-spin" />
        ),
      }}
      style={toasterColors}
      {...props}
    />
  );
}

export { toast } from "sonner";
export { Toaster };

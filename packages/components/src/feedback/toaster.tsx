"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import type * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

function statusColors(type: string, color: string) {
  return {
    [`--${type}-bg`]: `color-mix(in srgb, var(${color}) 8%, var(--popover))`,
    [`--${type}-border`]: `color-mix(in srgb, var(${color}) 30%, var(--popover))`,
    [`--${type}-text`]: `var(${color})`,
  };
}

const toasterColors = {
  "--normal-bg": "var(--popover)",
  "--normal-text": "var(--popover-foreground)",
  "--normal-border": "var(--border)",
  "--border-radius": "var(--radius)",
  ...statusColors("success", "--good"),
  ...statusColors("info", "--info"),
  ...statusColors("warning", "--warn"),
  ...statusColors("error", "--bad"),
} as React.CSSProperties;

function Toaster({ theme = "system", ...props }: ToasterProps) {
  return (
    <Sonner
      theme={theme}
      richColors
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={toasterColors}
      {...props}
    />
  );
}

export { toast } from "sonner";
export { Toaster };

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

const toasterColors = {
  "--normal-bg": "var(--popover)",
  "--normal-text": "var(--popover-foreground)",
  "--normal-border": "var(--border)",
  "--border-radius": "var(--radius)",
} as React.CSSProperties;

const statusRuleClassNames = {
  success: "border-l-2! border-l-good! [&_[data-icon]]:text-good",
  info: "border-l-2! border-l-info! [&_[data-icon]]:text-info",
  warning: "border-l-2! border-l-warn! [&_[data-icon]]:text-warn",
  error: "border-l-2! border-l-destructive! [&_[data-icon]]:text-destructive",
};

function Toaster({ theme = "system", toastOptions, ...props }: ToasterProps) {
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        ...toastOptions,
        classNames: { ...statusRuleClassNames, ...toastOptions?.classNames },
      }}
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

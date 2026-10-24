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
} as React.CSSProperties;

const statusRuleClassNames = {
  success: "border-l-2! border-l-good! [&_[data-icon]]:text-good",
  info: "border-l-2! border-l-interactive! [&_[data-icon]]:text-interactive",
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

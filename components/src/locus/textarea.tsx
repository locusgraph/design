import type * as React from "react";

import { cn } from "../lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-primary-800 placeholder:text-primary-600 selection:text-primary-foreground border-input min-h-[80px] w-full min-w-0 border px-3 py-2 text-base shadow-xs transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring",
        "aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };

import { cn } from "@locusgraph/components";
import type { ComponentProps } from "react";

export function ApprovalPanel({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "flex min-w-0 flex-col gap-4 bg-card p-5 text-card-foreground ring-1 ring-border",
        className
      )}
      {...props}
    />
  );
}

export function LiveStatus({ message }: { message: string }) {
  return (
    <p role="status" aria-live="polite" className="sr-only">
      {message}
    </p>
  );
}

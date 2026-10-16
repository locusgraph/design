import { cn } from "cn";
import type * as React from "react";
import { Skeleton } from "../status/skeleton";

function SkeletonBar({ className, ...props }: React.ComponentProps<typeof Skeleton>) {
  return (
    <Skeleton
      aria-hidden="true"
      className={cn("rounded-none bg-muted motion-reduce:animate-none", className)}
      {...props}
    />
  );
}

function SkeletonLoadingLabel({ children = "Loading…" }: { children?: React.ReactNode }) {
  return (
    <span data-slot="skeleton-loading-label" className="sr-only">
      {children}
    </span>
  );
}

const skeletonRootProps = { role: "status", "aria-busy": true } as const;

export { SkeletonBar, SkeletonLoadingLabel, skeletonRootProps };

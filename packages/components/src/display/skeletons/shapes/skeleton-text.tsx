import type * as React from "react";
import { cn } from "../../../cn";
import { SkeletonBar, SkeletonLoadingLabel, skeletonRootProps } from "../skeleton-parts";

type SkeletonTextProps = React.ComponentProps<"div"> & {
  lines?: number;
  label?: string;
};

function lineWidth(index: number, lines: number) {
  return lines > 1 && index === lines - 1 ? "w-3/5" : "w-full";
}

function SkeletonText({ lines = 3, label, className, ...props }: SkeletonTextProps) {
  const count = Math.max(1, Math.floor(lines));
  return (
    <div
      data-slot="skeleton-text"
      {...skeletonRootProps}
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    >
      {Array.from({ length: count }, (_, index) => (
        <SkeletonBar
          // biome-ignore lint/suspicious/noArrayIndexKey: placeholder lines have no identity
          key={index}
          data-slot="skeleton-text-line"
          className={cn("h-4", lineWidth(index, count))}
        />
      ))}
      <SkeletonLoadingLabel>{label}</SkeletonLoadingLabel>
    </div>
  );
}

export { SkeletonText };

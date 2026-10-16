import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";
import { SkeletonBar, SkeletonLoadingLabel, skeletonRootProps } from "../skeleton-parts";

const skeletonButtonVariants = cva("rounded-full", {
  variants: {
    size: {
      sm: "h-8 w-20",
      default: "h-9 w-24",
      lg: "h-10 w-28",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type SkeletonButtonProps = React.ComponentProps<"div"> &
  VariantProps<typeof skeletonButtonVariants> & { label?: string };

function SkeletonButton({ size = "default", label, className, ...props }: SkeletonButtonProps) {
  return (
    <div
      data-slot="skeleton-button"
      data-size={size}
      {...skeletonRootProps}
      className={cn("inline-flex shrink-0", className)}
      {...props}
    >
      <SkeletonBar className={skeletonButtonVariants({ size })} />
      <SkeletonLoadingLabel>{label}</SkeletonLoadingLabel>
    </div>
  );
}

export { SkeletonButton, skeletonButtonVariants };

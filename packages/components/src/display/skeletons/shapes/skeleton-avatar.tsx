import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../../../cn";
import { SkeletonBar, SkeletonLoadingLabel, skeletonRootProps } from "../skeleton-parts";

const skeletonAvatarVariants = cva("rounded-full", {
  variants: {
    size: {
      sm: "size-6",
      md: "size-8",
      lg: "size-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SkeletonAvatarProps = React.ComponentProps<"div"> &
  VariantProps<typeof skeletonAvatarVariants> & { label?: string };

function SkeletonAvatar({ size = "md", label, className, ...props }: SkeletonAvatarProps) {
  return (
    <div
      data-slot="skeleton-avatar"
      data-size={size}
      {...skeletonRootProps}
      className={cn("inline-flex shrink-0", className)}
      {...props}
    >
      <SkeletonBar className={skeletonAvatarVariants({ size })} />
      <SkeletonLoadingLabel>{label}</SkeletonLoadingLabel>
    </div>
  );
}

export { SkeletonAvatar, skeletonAvatarVariants };

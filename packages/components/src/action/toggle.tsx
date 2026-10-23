"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as TogglePrimitive from "radix-ui/toggle";
import * as React from "react";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-ring hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-foreground/10 data-[state=on]:text-foreground dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-muted hover:text-foreground data-[state=on]:border-foreground/30",
      },
      size: {
        default: "h-control min-w-control px-2.5",
        sm: "h-control-sm min-w-control-sm px-2",
        lg: "h-control-lg min-w-control-lg px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };

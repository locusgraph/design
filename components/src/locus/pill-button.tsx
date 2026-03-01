import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "../lib/utils";

const pillButtonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-light transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-primary-200 hover:bg-primary focus:bg-primary-500 text-primary-900 hover:text-primary-foreground focus:text-primary-foreground",
        secondary:
          "bg-primary-900 text-primary-300 border border-primary-600 hover:border-primary focus:bg-primary-800 focus:border-primary-300",
        destructive:
          "bg-destructive-800 text-destructive-100 hover:bg-destructive-500 hover:text-destructive focus:bg-destructive-400 focus:text-destructive-800",
        "destructive-outline":
          "bg-transparent border border-destructive-700 text-destructive-500 hover:bg-destructive-foreground hover:text-destructive-background focus:bg-destructive-800 focus:text-destructive-background",
        confirm:
          "bg-confirm-800 text-confirm-100 hover:bg-confirm-500 hover:text-confirm focus:bg-confirm-400 focus:text-confirm-800",
        ghost:
          "hover:bg-primary-800 hover:text-primary-background focus:bg-primary-900 focus:text-primary-background",
        link: "text-primary-200 hover:underline hover:text-primary-background focus:underline focus:text-teal-500",
      },
      size: {
        xs: "min-h-6 gap-1 px-2 py-0.5 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        lg: "min-h-8 gap-1.5 px-3 py-1 has-[>svg]:px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xs",
    },
  },
);

function PillButton({
  className,
  variant = "default",
  size = "xs",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof pillButtonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="pill-button"
      data-variant={variant}
      data-size={size}
      className={cn(pillButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { PillButton, pillButtonVariants };

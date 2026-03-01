import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap text-sm font-light transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-primary-200 hover:bg-primary focus:bg-primary-500 text-primary-900 hover:text-primary-foreground focus:text-primary-foreground",
        secondary:
          "bg-primary-900 text-primary-300 border border-primary-600 hover:border-primary focus:bg-primary-800 focus:border-primary-300",
        destructive:
          "bg-destructive-800 text-destructive-100 hover:bg-destructive-500 hover:text-destructive focus:bg-destructive-400 focus:text-destructive-800",
        "destructive-icon":
          "bg-destructive-900 text-destructive-600 focus:bg-destructive-600 focus:text-destructive-foreground",
        "destructive-outline":
          "bg-transparent border border-destructive-700 text-destructive-500 hover:bg-destructive-foreground hover:text-destructive-background focus:bg-destructive-800 focus:text-destructive-background",
        confirm:
          "bg-confirm-800 text-confirm-100 hover:bg-confirm-500 hover:text-confirm focus:bg-confirm-400 focus:text-confirm-800",
        "confirm-icon":
          "bg-confirm-900 text-confirm-600 focus:bg-confirm-600 focus:text-confirm-foreground",
        ghost:
          "hover:bg-primary-800 hover:text-primary-background focus:bg-primary-900 focus:text-primary-background",
        link: "text-primary-200 hover:underline hover:text-primary-background focus:underline focus:text-teal-500",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

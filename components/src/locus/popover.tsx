import * as PopoverPrimitive from "@radix-ui/react-popover";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "../lib/utils";
import { Button } from "./button";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const PopoverClose = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => (
  <PopoverPrimitive.Close
    ref={ref}
    className={cn("absolute right-4 top-4", className)}
    asChild={asChild}
    {...props}
  >
    {asChild ? (
      props.children
    ) : (
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="text-muted-foreground hover:text-popover-foreground"
      >
        <X className="size-3" aria-hidden />
        <span className="sr-only">Close</span>
      </Button>
    )}
  </PopoverPrimitive.Close>
));
PopoverClose.displayName = PopoverPrimitive.Close.displayName;

export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent, PopoverClose };

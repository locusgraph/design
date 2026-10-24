"use client";

import { Check as CheckIcon, Minus as MinusIcon } from "@phosphor-icons/react/ssr";
import * as CheckboxPrimitive from "radix-ui/checkbox";
import * as React from "react";
import { cn } from "../../cn";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-none border border-faint shadow-xs transition-shadow outline-none",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
        "locus-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="group/indicator flex items-center justify-center text-current"
      >
        <CheckIcon
          weight="bold"
          aria-hidden
          className="size-3.5 group-data-[state=indeterminate]/indicator:hidden"
        />
        <MinusIcon
          weight="bold"
          aria-hidden
          className="hidden size-3.5 group-data-[state=indeterminate]/indicator:block"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@locusgraph/components";
import type { ComponentProps, ReactNode } from "react";

type ActionButtonProps = Omit<ComponentProps<typeof Button>, "aria-label" | "children"> & {
  label: string;
  children: ReactNode;
};

export function ActionButton({ label, children, ...props }: ActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={label}
          className="text-muted-foreground hover:text-foreground"
          {...props}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

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
          size="icon-sm"
          aria-label={label}
          className="text-muted-foreground hover:bg-accent hover:text-foreground [&_svg]:size-4"
          {...props}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

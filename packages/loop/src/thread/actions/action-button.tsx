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
          className="text-faint hover:bg-transparent hover:text-interactive disabled:opacity-40 aria-pressed:text-foreground dark:hover:bg-transparent [&_svg]:size-4"
          {...props}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

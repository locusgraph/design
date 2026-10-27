"use client";

import { Button, cn } from "@locusgraph/components";
import type { BlockAction, BlockActionVariant } from "../types";

type BlockActionsProps = {
  actions: BlockAction[];
  defaultVariant: BlockActionVariant;
  onAction?: (actionId: string) => void;
  className?: string;
};

export function BlockActions({ actions, defaultVariant, onAction, className }: BlockActionsProps) {
  return (
    <div data-slot="block-actions" className={cn("flex flex-wrap items-center gap-2", className)}>
      {actions.map((action) => (
        <Button
          key={action.id}
          type="button"
          size="sm"
          variant={action.variant ?? defaultVariant}
          disabled={action.disabled}
          data-action-id={action.id}
          onClick={() => onAction?.(action.id)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}

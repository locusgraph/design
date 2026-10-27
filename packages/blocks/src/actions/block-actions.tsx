"use client";

import { Button, cn, Spinner } from "@locusgraph/components";
import { Check as CheckIcon } from "@phosphor-icons/react/ssr";
import type { BlockAction, BlockActionVariant } from "../types";

type BlockActionsProps = {
  actions: BlockAction[];
  defaultVariant: BlockActionVariant;
  onAction?: (actionId: string) => void;
  pendingActionId?: string;
  locked?: boolean;
  className?: string;
};

export function BlockActions({
  actions,
  defaultVariant,
  onAction,
  pendingActionId,
  locked = false,
  className,
}: BlockActionsProps) {
  return (
    <div data-slot="block-actions" className={cn("flex flex-wrap items-center gap-2", className)}>
      {actions.map((action) => (
        <Button
          key={action.id}
          type="button"
          size="sm"
          variant={action.variant ?? defaultVariant}
          disabled={action.disabled || locked}
          aria-busy={action.id === pendingActionId || undefined}
          data-action-id={action.id}
          onClick={() => onAction?.(action.id)}
        >
          {action.id === pendingActionId && <Spinner aria-hidden="true" role={undefined} />}
          {action.label}
        </Button>
      ))}
    </div>
  );
}

export function BlockActionOutcome({ label, className }: { label: string; className?: string }) {
  return (
    <p
      data-slot="block-action-outcome"
      className={cn("flex min-h-control-sm items-center gap-1.5 text-sm", className)}
    >
      <CheckIcon weight="bold" aria-hidden className="shrink-0 text-good" />
      {label}
    </p>
  );
}

"use client";

import { cn, TooltipProvider } from "@locusgraph/components";
import { CheckIcon, CopyIcon, RefreshCwIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { useCopied } from "../use-copied";
import { ActionButton } from "./action-button";
import { BranchSwitcher, type MessageBranch } from "./branch-switcher";

export type MessageFeedback = "up" | "down" | null;

type MessageActionsProps = ComponentProps<"div"> & {
  onCopy?: () => void;
  onRetry?: () => void;
  feedback?: MessageFeedback;
  onFeedback?: (feedback: MessageFeedback) => void;
  branch?: MessageBranch;
  onBranchChange?: (index: number) => void;
};

function toggledFeedback(current: MessageFeedback, chosen: "up" | "down"): MessageFeedback {
  return current === chosen ? null : chosen;
}

export function MessageActions({
  onCopy,
  onRetry,
  feedback = null,
  onFeedback,
  branch,
  onBranchChange,
  className,
  ...props
}: MessageActionsProps) {
  const { copied, markCopied } = useCopied();
  const showBranch = branch !== undefined && branch.count > 1 && onBranchChange !== undefined;
  if (!onCopy && !onRetry && !onFeedback && !showBranch) {
    return null;
  }
  return (
    <TooltipProvider>
      <div
        data-slot="message-actions"
        role="toolbar"
        aria-label="Message actions"
        className={cn("flex items-center gap-0.5", className)}
        {...props}
      >
        {showBranch && <BranchSwitcher branch={branch} onBranchChange={onBranchChange} />}
        {showBranch && (onCopy || onRetry || onFeedback) && (
          <span aria-hidden className="mx-1 h-3.5 w-px bg-border" />
        )}
        {onCopy && (
          <ActionButton
            label={copied ? "Copied" : "Copy"}
            onClick={() => {
              onCopy();
              markCopied();
            }}
          >
            {copied ? <CheckIcon className="text-emerald-500" /> : <CopyIcon />}
          </ActionButton>
        )}
        {onRetry && (
          <ActionButton label="Retry" onClick={onRetry}>
            <RefreshCwIcon />
          </ActionButton>
        )}
        {onFeedback && (
          <>
            <ActionButton
              label="Good response"
              aria-pressed={feedback === "up"}
              className={cn(feedback === "up" && "text-foreground")}
              onClick={() => onFeedback(toggledFeedback(feedback, "up"))}
            >
              <ThumbsUpIcon className={cn(feedback === "up" && "fill-current")} />
            </ActionButton>
            <ActionButton
              label="Bad response"
              aria-pressed={feedback === "down"}
              className={cn(feedback === "down" && "text-foreground")}
              onClick={() => onFeedback(toggledFeedback(feedback, "down"))}
            >
              <ThumbsDownIcon className={cn(feedback === "down" && "fill-current")} />
            </ActionButton>
          </>
        )}
        {copied && (
          <span role="status" className="sr-only">
            Copied
          </span>
        )}
      </div>
    </TooltipProvider>
  );
}

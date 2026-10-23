"use client";

import { cn, TooltipProvider } from "@locusgraph/components";
import {
  Check as CheckIcon,
  Copy as CopyIcon,
  ArrowsClockwise as RefreshCwIcon,
  ThumbsDown as ThumbsDownIcon,
  ThumbsUp as ThumbsUpIcon,
} from "@phosphor-icons/react/ssr";
import type { ComponentProps } from "react";
import { useCopied } from "../use-copied";
import { ActionButton } from "./action-button";
import { BranchSwitcher, type MessageBranch } from "./branch-switcher";

export type MessageFeedback = "up" | "down" | null;

type ActionsProps = ComponentProps<"div"> & {
  onCopy?: () => void;
  onRetry?: () => void;
  feedback?: MessageFeedback;
  onFeedback?: (feedback: MessageFeedback) => void;
  branch?: MessageBranch;
  onBranchChange?: (index: number) => void;
  align?: "start" | "end";
  reveal?: "always" | "hover";
};

function toggledFeedback(current: MessageFeedback, chosen: "up" | "down"): MessageFeedback {
  return current === chosen ? null : chosen;
}

function showsThumb(feedback: MessageFeedback, thumb: "up" | "down") {
  return feedback === null || feedback === thumb;
}

const alignClasses = { start: "-ml-2", end: "-mr-2 justify-end" };

const revealOnMessageHover =
  "opacity-0 transition-opacity duration-150 group-hover/message:opacity-100 focus-within:opacity-100 has-[[aria-pressed=true]]:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100";

export function Actions({
  onCopy,
  onRetry,
  feedback = null,
  onFeedback,
  branch,
  onBranchChange,
  align = "start",
  reveal = "always",
  className,
  ...props
}: ActionsProps) {
  const { copied, markCopied } = useCopied();
  const showBranch = branch !== undefined && branch.count > 1 && onBranchChange !== undefined;
  if (!onCopy && !onRetry && !onFeedback && !showBranch) {
    return null;
  }
  return (
    <TooltipProvider>
      <div
        data-slot="actions"
        role="toolbar"
        aria-label="Message actions"
        data-reveal={reveal}
        className={cn(
          "flex items-center",
          alignClasses[align],
          reveal === "hover" && revealOnMessageHover,
          className
        )}
        {...props}
      >
        {showBranch && <BranchSwitcher branch={branch} onBranchChange={onBranchChange} />}
        {onCopy && (
          <ActionButton
            label={copied ? "Copied" : "Copy"}
            onClick={() => {
              onCopy();
              markCopied();
            }}
          >
            {copied ? (
              <CheckIcon weight="bold" aria-hidden className="text-good" />
            ) : (
              <CopyIcon weight="bold" aria-hidden />
            )}
          </ActionButton>
        )}
        {onRetry && (
          <ActionButton label="Retry" onClick={onRetry}>
            <RefreshCwIcon weight="bold" aria-hidden />
          </ActionButton>
        )}
        {onFeedback && (
          <>
            {showsThumb(feedback, "up") && (
              <ActionButton
                label="Good response"
                aria-pressed={feedback === "up"}
                onClick={() => onFeedback(toggledFeedback(feedback, "up"))}
              >
                <ThumbsUpIcon
                  weight={feedback === "up" ? "fill" : "bold"}
                  aria-hidden
                  className={cn(feedback === "up" && "text-good")}
                />
              </ActionButton>
            )}
            {showsThumb(feedback, "down") && (
              <ActionButton
                label="Bad response"
                aria-pressed={feedback === "down"}
                onClick={() => onFeedback(toggledFeedback(feedback, "down"))}
              >
                <ThumbsDownIcon
                  weight={feedback === "down" ? "fill" : "bold"}
                  aria-hidden
                  className={cn(feedback === "down" && "text-bad")}
                />
              </ActionButton>
            )}
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

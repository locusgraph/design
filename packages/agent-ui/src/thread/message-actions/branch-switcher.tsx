import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ActionButton } from "./action-button";

export type MessageBranch = { index: number; count: number };

type BranchSwitcherProps = {
  branch: MessageBranch;
  onBranchChange: (index: number) => void;
};

export function BranchSwitcher({ branch, onBranchChange }: BranchSwitcherProps) {
  const position = branch.index + 1;
  return (
    <div
      data-slot="branch-switcher"
      role="group"
      aria-label="Response versions"
      className="flex items-center"
    >
      <ActionButton
        label="Previous version"
        disabled={branch.index <= 0}
        onClick={() => onBranchChange(branch.index - 1)}
      >
        <ChevronLeftIcon />
      </ActionButton>
      <span
        aria-live="polite"
        className="min-w-10 text-center font-mono text-[11.5px] text-muted-foreground tabular-nums"
      >
        {`${position} / ${branch.count}`}
      </span>
      <ActionButton
        label="Next version"
        disabled={position >= branch.count}
        onClick={() => onBranchChange(branch.index + 1)}
      >
        <ChevronRightIcon />
      </ActionButton>
    </div>
  );
}

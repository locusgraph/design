import { Button, Input } from "@locusgraph/components";
import { ArrowDownIcon, ArrowUpIcon, Trash2Icon } from "lucide-react";
import type { PlanStepDraft } from "../types";

export type StepAction = "up" | "down" | "remove";

type PlanStepRowProps = {
  idPrefix: string;
  step: PlanStepDraft;
  position: number;
  count: number;
  onRename: (title: string) => void;
  onAction: (action: StepAction) => void;
};

export function stepControlId(idPrefix: string, stepId: string, action: StepAction | "title") {
  return `${idPrefix}-${stepId}-${action}`;
}

export function PlanStepRow({
  idPrefix,
  step,
  position,
  count,
  onRename,
  onAction,
}: PlanStepRowProps) {
  const number = position + 1;
  const controls: {
    action: StepAction;
    label: string;
    icon: typeof ArrowUpIcon;
    disabled: boolean;
  }[] = [
    { action: "up", label: `Move step ${number} up`, icon: ArrowUpIcon, disabled: position === 0 },
    {
      action: "down",
      label: `Move step ${number} down`,
      icon: ArrowDownIcon,
      disabled: position === count - 1,
    },
    { action: "remove", label: `Remove step ${number}`, icon: Trash2Icon, disabled: count === 1 },
  ];
  return (
    <li data-slot="plan-step" className="flex items-start gap-3 px-3 py-2.5">
      <span
        aria-hidden
        className="mt-2 w-5 shrink-0 text-right font-mono text-xs text-muted-foreground tabular-nums"
      >
        {number}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Input
          id={stepControlId(idPrefix, step.id, "title")}
          aria-label={`Step ${number} title`}
          value={step.title}
          aria-invalid={step.title.trim() === "" || undefined}
          onChange={(event) => onRename(event.target.value)}
        />
        {step.detail && <p className="text-xs text-muted-foreground">{step.detail}</p>}
      </div>
      <div className="flex shrink-0 gap-0.5 pt-0.5">
        {controls.map(({ action, label, icon: Icon, disabled }) => (
          <Button
            key={action}
            id={stepControlId(idPrefix, step.id, action)}
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={label}
            title={label}
            disabled={disabled}
            onClick={() => onAction(action)}
          >
            <Icon aria-hidden />
          </Button>
        ))}
      </div>
    </li>
  );
}

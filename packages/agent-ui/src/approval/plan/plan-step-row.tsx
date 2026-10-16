import { Button, cn } from "@locusgraph/components";
import { ArrowDownIcon, ArrowUpIcon, PencilIcon, Trash2Icon } from "lucide-react";
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

type StepControl = {
  id: string;
  label: string;
  icon: typeof ArrowUpIcon;
  disabled: boolean;
  onClick: () => void;
  danger?: boolean;
};

export function stepControlId(idPrefix: string, stepId: string, action: StepAction | "title") {
  return `${idPrefix}-${stepId}-${action}`;
}

function selectInputById(id: string) {
  const element = document.getElementById(id);
  if (element instanceof HTMLInputElement) {
    element.focus();
    element.select();
  }
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
  const titleId = stepControlId(idPrefix, step.id, "title");
  const blank = step.title.trim() === "";
  const controls: StepControl[] = [
    {
      id: `${idPrefix}-${step.id}-edit`,
      label: `Edit step ${number}`,
      icon: PencilIcon,
      disabled: false,
      onClick: () => selectInputById(titleId),
    },
    {
      id: stepControlId(idPrefix, step.id, "up"),
      label: `Move step ${number} up`,
      icon: ArrowUpIcon,
      disabled: position === 0,
      onClick: () => onAction("up"),
    },
    {
      id: stepControlId(idPrefix, step.id, "down"),
      label: `Move step ${number} down`,
      icon: ArrowDownIcon,
      disabled: position === count - 1,
      onClick: () => onAction("down"),
    },
    {
      id: stepControlId(idPrefix, step.id, "remove"),
      label: `Remove step ${number}`,
      icon: Trash2Icon,
      disabled: count === 1,
      onClick: () => onAction("remove"),
      danger: true,
    },
  ];
  return (
    <li
      data-slot="plan-step"
      className="group flex items-start gap-3 px-5 py-2.5 focus-within:bg-accent/50 hover:bg-accent/50 motion-safe:transition-colors"
    >
      <span
        aria-hidden
        className="mt-0.5 flex size-5 shrink-0 items-center justify-center font-mono text-[11px] text-muted-foreground tabular-nums ring-1 ring-input"
      >
        {number}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <input
          id={titleId}
          aria-label={`Step ${number} title`}
          value={step.title}
          placeholder="Name this step"
          aria-invalid={blank || undefined}
          onChange={(event) => onRename(event.target.value)}
          className={cn(
            "-mx-1.5 h-6 min-w-0 bg-transparent px-1.5 text-sm font-medium outline-none placeholder:font-normal placeholder:text-muted-foreground focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-ring",
            blank && "ring-1 ring-destructive/70"
          )}
        />
        {step.detail && <p className="text-xs text-muted-foreground">{step.detail}</p>}
      </div>
      <div className="flex shrink-0 gap-0.5 sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100 sm:motion-safe:transition-opacity">
        {controls.map(({ id, label, icon: Icon, disabled, onClick, danger }) => (
          <Button
            key={id}
            id={id}
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={label}
            title={label}
            disabled={disabled}
            onClick={onClick}
            className={cn(
              "text-muted-foreground hover:text-foreground",
              danger && "hover:text-destructive"
            )}
          >
            <Icon aria-hidden />
          </Button>
        ))}
      </div>
    </li>
  );
}

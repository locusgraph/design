import { Button } from "@locusgraph/components";
import { ListChecksIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { DecisionLine } from "../shared/decision-line";
import { ApprovalPanel, LiveStatus } from "../shared/panel";
import { useFocusOnMount } from "../shared/use-focus-on-mount";
import type { ApprovalDecision, PlanStepDraft } from "../types";
import { PlanStepRow, type StepAction, stepControlId } from "./plan-step-row";
import { applyStepAction, describeStepAction, focusAfterAction } from "./plan-steps";

export type PlanApprovalProps = {
  steps: PlanStepDraft[];
  title?: string;
  description?: string;
  actionLabel?: string;
  decision?: ApprovalDecision;
  onApprove: (steps: PlanStepDraft[]) => void;
  onCancel: () => void;
  autoFocus?: boolean;
  className?: string;
};

export function PlanApproval({
  steps: initialSteps,
  title = "Review the plan",
  description = "The agent will run these steps in order. Edit, reorder or remove steps before it starts.",
  actionLabel,
  decision,
  onApprove,
  onCancel,
  autoFocus = true,
  className,
}: PlanApprovalProps) {
  const idPrefix = useId();
  const [steps, setSteps] = useState(initialSteps);
  const [announcement, setAnnouncement] = useState("");
  const [pendingFocus, setPendingFocus] = useState<{ id: string } | null>(null);
  const approveRef = useFocusOnMount<HTMLButtonElement>(autoFocus && !decision);
  const hasBlankTitle = steps.some((step) => step.title.trim() === "");

  useEffect(() => {
    if (pendingFocus) document.getElementById(pendingFocus.id)?.focus();
  }, [pendingFocus]);

  function handleAction(stepId: string, position: number, action: StepAction) {
    const next = applyStepAction(steps, stepId, action);
    const focus = focusAfterAction(next, stepId, action);
    setSteps(next);
    setAnnouncement(describeStepAction(position, action));
    setPendingFocus(focus ? { id: stepControlId(idPrefix, focus.stepId, focus.control) } : null);
  }

  return (
    <ApprovalPanel data-slot="plan-approval" aria-label={title} className={className}>
      <header className="flex flex-col gap-1">
        <span className="flex items-center gap-2 text-sm font-medium">
          <ListChecksIcon aria-hidden className="size-4 text-muted-foreground" />
          {title}
        </span>
        {!decision && <p className="text-sm text-muted-foreground">{description}</p>}
      </header>
      {decision ? (
        <>
          <ol className="flex flex-col divide-y divide-line text-sm ring-1 ring-border">
            {initialSteps.map((step, position) => (
              <li key={step.id} className="flex gap-3 px-3 py-2">
                <span className="w-5 text-right font-mono text-xs text-muted-foreground">
                  {position + 1}
                </span>
                {step.title}
              </li>
            ))}
          </ol>
          <DecisionLine decision={decision} deniedVerb="Cancelled" />
        </>
      ) : (
        <>
          <ol className="flex flex-col divide-y divide-line ring-1 ring-border">
            {steps.map((step, position) => (
              <PlanStepRow
                key={step.id}
                idPrefix={idPrefix}
                step={step}
                position={position}
                count={steps.length}
                onRename={(nextTitle) =>
                  setSteps((current) =>
                    current.map((item) =>
                      item.id === step.id ? { ...item, title: nextTitle } : item
                    )
                  )
                }
                onAction={(action) => handleAction(step.id, position, action)}
              />
            ))}
          </ol>
          {hasBlankTitle && <p className="text-xs text-destructive">Every step needs a title.</p>}
          <div className="flex flex-wrap gap-2">
            <Button
              ref={approveRef}
              type="button"
              size="sm"
              disabled={hasBlankTitle || steps.length === 0}
              onClick={() =>
                onApprove(steps.map((step) => ({ ...step, title: step.title.trim() })))
              }
            >
              {actionLabel ?? `Run ${steps.length} ${steps.length === 1 ? "step" : "steps"}`}
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </>
      )}
      <LiveStatus
        message={decision ? (decision.approved ? "Plan approved" : "Plan cancelled") : announcement}
      />
    </ApprovalPanel>
  );
}

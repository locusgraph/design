import { Button, cn } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import {
  ArrowRight as ArrowRightIcon,
  ListChecks as ListChecksIcon,
} from "@phosphor-icons/react/ssr";
import { useEffect, useId, useState } from "react";
import { LiveStatus } from "../../shared/panel";
import { ApprovalHeadline, SettledLine } from "../shared/approval-line";
import { DecisionSummary } from "../shared/decision-line";
import { useFocusOnMount } from "../shared/use-focus-on-mount";
import type { ApprovalDecision, PlanStepDraft } from "../types";
import { PlanStepRow, type StepAction, stepControlId } from "./plan-step-row";
import { applyStepAction, describeStepAction, focusAfterAction } from "./plan-steps";

export type PlanReviewProps = {
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

function DecidedSteps({ steps }: { steps: PlanStepDraft[] }) {
  return (
    <ol className="flex flex-col gap-1 pt-2 text-sm text-muted-foreground">
      {steps.map((step, position) => (
        <li key={step.id} className="flex gap-3">
          <span className="w-4 shrink-0 text-xs leading-5 text-faint tabular-nums">
            {position + 1}
          </span>
          <span className="min-w-0">{step.title}</span>
        </li>
      ))}
    </ol>
  );
}

export function PlanReview({
  steps: initialSteps,
  title = "Review the plan",
  description = "The agent will run these steps in order. Edit, reorder or remove steps before it starts.",
  actionLabel,
  decision,
  onApprove,
  onCancel,
  autoFocus = true,
  className,
}: PlanReviewProps) {
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

  function renameStep(stepId: string, nextTitle: string) {
    setSteps((current) =>
      current.map((item) => (item.id === stepId ? { ...item, title: nextTitle } : item))
    );
  }

  const stepCount = pluralize(steps.length, "step");
  return (
    <section
      data-slot="plan-review"
      data-decided={decision ? true : undefined}
      aria-label={title}
      className={cn("flex min-w-0 flex-col", !decision && "gap-3", className)}
    >
      {decision ? (
        <SettledLine
          name={pluralize(initialSteps.length, "step")}
          verb="Planned"
          icon={<ListChecksIcon weight="bold" aria-hidden />}
        >
          <DecisionSummary
            decision={decision}
            deniedVerb="Cancelled"
            result={
              decision.approved
                ? `${pluralize(initialSteps.length, "step")} approved`
                : "Plan cancelled"
            }
          />
          <DecidedSteps steps={initialSteps} />
        </SettledLine>
      ) : (
        <>
          <ApprovalHeadline
            name={stepCount}
            action="to run"
            icon={<ListChecksIcon weight="bold" aria-hidden />}
          />
          <p className="-mt-2 text-sm text-faint">{description}</p>
          <ol className="flex flex-col">
            {steps.map((step, position) => (
              <PlanStepRow
                key={step.id}
                idPrefix={idPrefix}
                step={step}
                position={position}
                count={steps.length}
                onRename={(nextTitle) => renameStep(step.id, nextTitle)}
                onAction={(action) => handleAction(step.id, position, action)}
              />
            ))}
          </ol>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button
              ref={approveRef}
              type="button"
              size="sm"
              disabled={hasBlankTitle || steps.length === 0}
              onClick={() =>
                onApprove(steps.map((step) => ({ ...step, title: step.title.trim() })))
              }
            >
              {actionLabel ?? `Run ${stepCount}`}
              <ArrowRightIcon weight="bold" aria-hidden />
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            {hasBlankTitle && (
              <span className="text-xs text-destructive">Every step needs a title.</span>
            )}
          </div>
        </>
      )}
      <LiveStatus
        message={decision ? (decision.approved ? "Plan approved" : "Plan cancelled") : announcement}
      />
    </section>
  );
}

"use client";

import { ArrowRight as ArrowRightIcon, ListChecked as ListChecksIcon } from "@carbon/icons-react";
import { Button } from "@locusgraph/components";
import { pluralize } from "@locusgraph/utils";
import { useEffect, useId, useState } from "react";
import {
  ApprovalPanel,
  LiveStatus,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelTitle,
} from "../../shared/panel";
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
    <ol className="flex flex-col gap-1 pl-6.5 text-sm text-muted-foreground">
      {steps.map((step, position) => (
        <li key={step.id} className="flex gap-3">
          <span className="w-4 shrink-0 font-mono text-xs leading-5 tabular-nums">
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

  return (
    <ApprovalPanel
      data-slot="plan-review"
      data-decided={decision ? true : undefined}
      aria-label={title}
      className={className}
    >
      <PanelHeader
        icon={<ListChecksIcon aria-hidden />}
        eyebrow="Plan"
        status={decision ? (decision.approved ? "Approved" : "Cancelled") : "Waiting for you"}
        tone={decision ? (decision.approved ? "done" : "danger") : "waiting"}
        aside={pluralize(steps.length, "step")}
      />
      <PanelTitle className={decision ? "text-muted-foreground" : undefined}>{title}</PanelTitle>
      {decision ? (
        <PanelBody>
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
        </PanelBody>
      ) : (
        <>
          <p className="px-5 pt-1 text-sm text-muted-foreground">{description}</p>
          <PanelBody className="pb-0">
            <ol className="-mx-5 flex flex-col divide-y border-t">
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
          </PanelBody>
          <PanelFooter className="justify-between">
            {hasBlankTitle ? (
              <span className="text-xs text-destructive">Every step needs a title.</span>
            ) : (
              <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
                The run starts when you approve
              </span>
            )}
            <span className="ml-auto flex gap-2">
              <Button type="button" size="sm" variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                ref={approveRef}
                type="button"
                size="sm"
                disabled={hasBlankTitle || steps.length === 0}
                onClick={() =>
                  onApprove(steps.map((step) => ({ ...step, title: step.title.trim() })))
                }
              >
                {actionLabel ?? `Run ${pluralize(steps.length, "step")}`}
                <ArrowRightIcon aria-hidden />
              </Button>
            </span>
          </PanelFooter>
        </>
      )}
      <LiveStatus
        message={decision ? (decision.approved ? "Plan approved" : "Plan cancelled") : announcement}
      />
    </ApprovalPanel>
  );
}

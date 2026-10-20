"use client";

import { Edit as SquarePenIcon } from "@carbon/icons-react";
import { Button, cn } from "@locusgraph/components";
import { useId, useMemo, useState } from "react";
import {
  ApprovalPanel,
  LiveStatus,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelTitle,
} from "../../../shared/panel";
import type { RiskLevel } from "../../../types";
import { DecisionSummary } from "../../shared/decision-line";
import { riskCopy, riskLabels, riskRing } from "../../shared/risk-badge";
import { useFocusOnMount } from "../../shared/use-focus-on-mount";
import type { ApprovalDecision, ArgField, ArgValues } from "../../types";
import { ArgsField } from "./args-field";
import { draftsFrom, validateDrafts, valuesFromDrafts } from "./args-validation";

export type ArgsEditorProps = {
  toolName: string;
  fields: ArgField[];
  initialValues?: ArgValues;
  risk?: RiskLevel;
  actionLabel?: string;
  description?: string;
  decision?: ApprovalDecision;
  onApprove: (editedInput: ArgValues) => void;
  onCancel: () => void;
  autoFocus?: boolean;
  className?: string;
};

function errorSummary(count: number) {
  return count === 1 ? "1 field needs a fix." : `${count} fields need a fix.`;
}

export function ArgsEditor({
  toolName,
  fields,
  initialValues = {},
  risk = "write",
  actionLabel,
  description,
  decision,
  onApprove,
  onCancel,
  autoFocus = false,
  className,
}: ArgsEditorProps) {
  const baseId = useId();
  const [drafts, setDrafts] = useState(() => draftsFrom(fields, initialValues));
  const [showErrors, setShowErrors] = useState(false);
  const errors = useMemo(() => validateDrafts(fields, drafts), [fields, drafts]);
  const errorCount = Object.keys(errors).length;
  const visibleErrors = showErrors ? errors : {};
  const destructive = risk === "destructive";
  const submitRef = useFocusOnMount<HTMLButtonElement>(autoFocus && !decision);
  return (
    <ApprovalPanel
      data-slot="args-editor"
      data-risk={risk}
      aria-label={`Edit ${toolName} inputs`}
      data-state={decision ? (decision.approved ? "approved" : "denied") : "editing"}
      className={cn(!decision && riskRing[risk], className)}
    >
      <PanelHeader
        icon={<SquarePenIcon aria-hidden />}
        eyebrow={decision ? "Tool call" : "Edit before approving"}
        aside={riskLabels[risk]}
        status={decision ? (decision.approved ? "Approved" : "Cancelled") : "Waiting for you"}
        tone={decision ? (decision.approved ? "done" : "danger") : "waiting"}
      />
      <PanelTitle className={cn("truncate font-mono", decision && "text-muted-foreground")}>
        {toolName}
      </PanelTitle>
      {decision ? (
        <PanelBody className="pt-3">
          <DecisionSummary
            decision={decision}
            deniedVerb="Cancelled"
            result={
              decision.approved
                ? `${toolName} approved with edited inputs`
                : `${toolName} cancelled`
            }
          />
        </PanelBody>
      ) : (
        <>
          <p className="px-5 pt-1 text-sm text-muted-foreground">
            {description ?? riskCopy[risk](toolName)} The tool runs with what you send.
          </p>
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              const firstInvalid = fields.find((field) => errors[field.name]);
              if (firstInvalid) {
                setShowErrors(true);
                const control = event.currentTarget.elements.namedItem(firstInvalid.name);
                if (control instanceof HTMLElement) control.focus();
                return;
              }
              onApprove(valuesFromDrafts(fields, drafts));
            }}
          >
            <PanelBody className="gap-5 pt-5">
              {fields.map((field) => (
                <ArgsField
                  key={field.name}
                  id={`${baseId}-${field.name}`}
                  field={field}
                  draft={drafts[field.name]}
                  error={visibleErrors[field.name]}
                  onChange={(draft) =>
                    setDrafts((current) => ({ ...current, [field.name]: draft }))
                  }
                />
              ))}
            </PanelBody>
            <PanelFooter className="justify-between">
              <span
                className={cn(
                  "hidden font-mono text-[11px] sm:inline",
                  showErrors && errorCount > 0 ? "text-destructive" : "text-muted-foreground"
                )}
              >
                {showErrors && errorCount > 0 ? errorSummary(errorCount) : "The run is paused"}
              </span>
              <span className="flex flex-wrap gap-2">
                <Button type="button" size="sm" variant="ghost" onClick={onCancel}>
                  Cancel
                </Button>
                <Button
                  ref={submitRef}
                  type="submit"
                  size="sm"
                  variant={destructive ? "destructive" : "default"}
                >
                  {actionLabel ?? `Run ${toolName} with these inputs`}
                </Button>
              </span>
            </PanelFooter>
          </form>
        </>
      )}
      <LiveStatus message={showErrors && errorCount > 0 ? errorSummary(errorCount) : ""} />
    </ApprovalPanel>
  );
}

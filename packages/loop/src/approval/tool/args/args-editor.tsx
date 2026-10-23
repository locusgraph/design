import { Edit as SquarePenIcon } from "@carbon/icons-react";
import { Button, cn } from "@locusgraph/components";
import { useId, useMemo, useState } from "react";
import { humanToolName } from "../../../agent/tool/tool-status";
import { LiveStatus } from "../../../shared/panel";
import type { RiskLevel } from "../../../types";
import { ApprovalHeadline, SettledLine } from "../../shared/approval-line";
import { DecisionSummary } from "../../shared/decision-line";
import { riskCopy } from "../../shared/risk-badge";
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
  const name = humanToolName(toolName);
  const submitRef = useFocusOnMount<HTMLButtonElement>(autoFocus && !decision);
  const hasErrorSummary = showErrors && errorCount > 0;
  return (
    <section
      data-slot="args-editor"
      data-risk={risk}
      data-tool-name={toolName}
      aria-label={`Edit ${name} inputs`}
      data-state={decision ? (decision.approved ? "approved" : "denied") : "editing"}
      className={cn("flex min-w-0 flex-col", !decision && "gap-3", className)}
    >
      {decision ? (
        <SettledLine name={name} icon={<SquarePenIcon />}>
          <DecisionSummary
            decision={decision}
            deniedVerb="Cancelled"
            result={decision.approved ? `${name} approved with edited inputs` : `${name} cancelled`}
          />
        </SettledLine>
      ) : (
        <>
          <ApprovalHeadline
            name={name}
            risk={risk}
            action="to run"
            icon={destructive ? undefined : <SquarePenIcon />}
          />
          <p className="-mt-2 text-sm text-faint">{description ?? riskCopy[risk]()}</p>
          <form
            noValidate
            className="flex flex-col gap-2"
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
            {fields.map((field) => (
              <ArgsField
                key={field.name}
                id={`${baseId}-${field.name}`}
                field={field}
                draft={drafts[field.name]}
                error={visibleErrors[field.name]}
                onChange={(draft) => setDrafts((current) => ({ ...current, [field.name]: draft }))}
              />
            ))}
            <div className="flex flex-wrap items-center gap-2 pt-3 pl-36">
              <Button
                ref={submitRef}
                type="submit"
                size="sm"
                variant={destructive ? "destructive" : "default"}
              >
                {actionLabel ?? `Run ${name} with these inputs`}
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
              {hasErrorSummary && (
                <span className="text-xs text-destructive">{errorSummary(errorCount)}</span>
              )}
            </div>
          </form>
        </>
      )}
      <LiveStatus message={hasErrorSummary ? errorSummary(errorCount) : ""} />
    </section>
  );
}

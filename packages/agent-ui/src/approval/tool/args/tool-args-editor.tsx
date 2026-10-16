import { Button, cn } from "@locusgraph/components";
import { useId, useMemo, useState } from "react";
import type { RiskLevel } from "../../../types";
import { ApprovalPanel, LiveStatus } from "../../shared/panel";
import { RiskBadge, riskRing } from "../../shared/risk-badge";
import type { ArgField, ArgValues } from "../../types";
import { ArgsField } from "./args-field";
import { draftsFrom, validateDrafts, valuesFromDrafts } from "./args-validation";

export type ToolArgsEditorProps = {
  toolName: string;
  fields: ArgField[];
  initialValues?: ArgValues;
  risk?: RiskLevel;
  actionLabel?: string;
  onApprove: (editedInput: ArgValues) => void;
  onCancel: () => void;
  className?: string;
};

function errorSummary(count: number) {
  return count === 1 ? "1 field needs a fix." : `${count} fields need a fix.`;
}

export function ToolArgsEditor({
  toolName,
  fields,
  initialValues = {},
  risk = "write",
  actionLabel,
  onApprove,
  onCancel,
  className,
}: ToolArgsEditorProps) {
  const baseId = useId();
  const [drafts, setDrafts] = useState(() => draftsFrom(fields, initialValues));
  const [showErrors, setShowErrors] = useState(false);
  const errors = useMemo(() => validateDrafts(fields, drafts), [fields, drafts]);
  const errorCount = Object.keys(errors).length;
  const visibleErrors = showErrors ? errors : {};
  return (
    <ApprovalPanel
      data-slot="tool-args-editor"
      data-risk={risk}
      aria-label={`Edit ${toolName} inputs`}
      className={cn(riskRing[risk], className)}
    >
      <header className="flex flex-wrap items-center justify-between gap-2">
        <span className="flex flex-col gap-0.5">
          <span className="font-mono text-sm font-medium">{toolName}</span>
          <span className="text-sm text-muted-foreground">Edit the inputs, then approve.</span>
        </span>
        <RiskBadge risk={risk} />
      </header>
      <form
        noValidate
        className="flex flex-col gap-4"
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
        <div className="flex flex-wrap gap-2">
          <Button
            type="submit"
            size="sm"
            variant={risk === "destructive" ? "destructive" : "default"}
          >
            {actionLabel ?? `Run ${toolName} with these inputs`}
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
      <LiveStatus message={showErrors && errorCount > 0 ? errorSummary(errorCount) : ""} />
    </ApprovalPanel>
  );
}

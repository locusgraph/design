import { Button, cn } from "@locusgraph/components";
import { SquarePenIcon } from "lucide-react";
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
import { riskLabels, riskRing, riskTone } from "../../shared/risk-badge";
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
  const destructive = risk === "destructive";
  return (
    <ApprovalPanel
      data-slot="tool-args-editor"
      data-risk={risk}
      aria-label={`Edit ${toolName} inputs`}
      className={cn(riskRing[risk], className)}
    >
      <PanelHeader
        icon={<SquarePenIcon aria-hidden />}
        eyebrow="Edit before approving"
        status={riskLabels[risk]}
        tone={riskTone[risk]}
      />
      <PanelTitle className="truncate font-mono">{toolName}</PanelTitle>
      <p className="px-5 pt-1 text-sm text-muted-foreground">
        Correct the inputs, then approve. The tool runs with what you send.
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
        <PanelBody className="gap-5">
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
            <Button type="submit" size="sm" variant={destructive ? "destructive" : "default"}>
              {actionLabel ?? `Run ${toolName} with these inputs`}
            </Button>
          </span>
        </PanelFooter>
      </form>
      <LiveStatus message={showErrors && errorCount > 0 ? errorSummary(errorCount) : ""} />
    </ApprovalPanel>
  );
}

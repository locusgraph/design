import { ChevronDown as ChevronDownIcon } from "@carbon/icons-react";
import { Checkbox, cn } from "@locusgraph/components";
import type { ArgField } from "../../types";
import type { ArgDraft } from "./args-validation";

type ArgsFieldProps = {
  id: string;
  field: ArgField;
  draft: ArgDraft | undefined;
  error?: string;
  onChange: (draft: ArgDraft) => void;
};

const fieldBoxClass =
  "flex h-9 w-full min-w-0 items-center gap-3 border border-input px-3 text-sm transition-[color,box-shadow] focus-within:border-ring focus-within:ring-1 focus-within:ring-ring has-[[aria-invalid=true]]:border-destructive dark:bg-input/30";

const bareControlClass =
  "h-full min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-faint";

function describedBy(id: string, field: ArgField, error?: string) {
  const ids = [field.description && `${id}-hint`, error && `${id}-error`].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

function FieldControl({ id, field, draft, error, onChange }: ArgsFieldProps) {
  const shared = {
    id,
    name: field.name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy(id, field, error),
    "aria-required": field.required || undefined,
  };
  if (field.type === "boolean") {
    return (
      <Checkbox
        {...shared}
        className="ml-auto"
        checked={draft === true}
        onCheckedChange={(checked) => onChange(checked === true)}
      />
    );
  }
  const text = typeof draft === "string" ? draft : "";
  if (field.type === "select") {
    return (
      <>
        <select
          {...shared}
          value={text}
          className={cn(
            bareControlClass,
            "appearance-none has-[option[value='']:checked]:text-faint"
          )}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">Choose…</option>
          {(field.options ?? []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon aria-hidden className="pointer-events-none size-3.5 shrink-0 text-faint" />
      </>
    );
  }
  return (
    <input
      {...shared}
      type={field.type === "number" ? "number" : "text"}
      inputMode={field.type === "number" ? "decimal" : undefined}
      min={field.min}
      max={field.max}
      value={text}
      className={bareControlClass}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function ArgsField(props: ArgsFieldProps) {
  const { id, field, error } = props;
  return (
    <div data-slot="args-field" data-type={field.type} className="flex flex-col gap-1">
      <div className={fieldBoxClass}>
        <label htmlFor={id} className="w-32 shrink-0 cursor-pointer truncate text-muted-foreground">
          {field.label}
          {field.required && (
            <span className="text-faint">
              <span aria-hidden> *</span>
              <span className="sr-only"> (required)</span>
            </span>
          )}
        </label>
        <FieldControl {...props} />
      </div>
      {field.description && (
        <p id={`${id}-hint`} className="text-xs text-faint">
          {field.description}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

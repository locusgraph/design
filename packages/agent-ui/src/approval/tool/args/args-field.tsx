import { Checkbox, Input, Label, NativeSelect, NativeSelectOption } from "@locusgraph/components";
import type { ArgField } from "../../types";
import type { ArgDraft } from "./args-validation";

type ArgsFieldProps = {
  id: string;
  field: ArgField;
  draft: ArgDraft | undefined;
  error?: string;
  onChange: (draft: ArgDraft) => void;
};

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
        checked={draft === true}
        onCheckedChange={(checked) => onChange(checked === true)}
      />
    );
  }
  const text = typeof draft === "string" ? draft : "";
  if (field.type === "select") {
    return (
      <NativeSelect {...shared} value={text} onChange={(event) => onChange(event.target.value)}>
        <NativeSelectOption value="">Choose…</NativeSelectOption>
        {(field.options ?? []).map((option) => (
          <NativeSelectOption key={option.value} value={option.value}>
            {option.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    );
  }
  return (
    <Input
      {...shared}
      type={field.type === "number" ? "number" : "text"}
      inputMode={field.type === "number" ? "decimal" : undefined}
      min={field.min}
      max={field.max}
      value={text}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function ArgsField(props: ArgsFieldProps) {
  const { id, field, error } = props;
  const inline = field.type === "boolean";
  return (
    <div data-slot="args-field" data-type={field.type} className="flex flex-col gap-1.5">
      <div className={inline ? "flex flex-row-reverse items-center justify-end gap-2" : "contents"}>
        <Label htmlFor={id}>
          {field.label}
          {field.required && <span className="text-muted-foreground"> (required)</span>}
        </Label>
        <FieldControl {...props} />
      </div>
      {field.description && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
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

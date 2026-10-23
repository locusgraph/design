import { Checkbox, cn } from "@locusgraph/components";
import { CaretDown as ChevronDownIcon } from "@phosphor-icons/react/ssr";
import type { ArgField } from "../../types";
import type { ArgDraft } from "./args-validation";

type ArgsFieldProps = {
  id: string;
  field: ArgField;
  draft: ArgDraft | undefined;
  error?: string;
  onChange: (draft: ArgDraft) => void;
};

const valueWellClass =
  "flex h-control min-w-0 flex-1 items-center gap-2 bg-muted px-3 transition-shadow focus-within:ring-1 focus-within:ring-ring has-[[aria-invalid=true]]:ring-1 has-[[aria-invalid=true]]:ring-destructive motion-reduce:transition-none";

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
        <ChevronDownIcon
          weight="bold"
          aria-hidden
          className="pointer-events-none size-3.5 shrink-0 text-faint"
        />
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

function FieldValue(props: ArgsFieldProps) {
  if (props.field.type === "boolean") {
    return (
      <div className="flex h-control flex-1 items-center px-3">
        <FieldControl {...props} />
      </div>
    );
  }
  return (
    <div className={valueWellClass}>
      <FieldControl {...props} />
    </div>
  );
}

export function ArgsField(props: ArgsFieldProps) {
  const { id, field, error } = props;
  const optional = !field.required && field.type !== "boolean";
  return (
    <div data-slot="args-field" data-type={field.type} className="flex flex-col gap-1">
      <div className="flex min-w-0 items-center gap-4 text-sm">
        <label
          htmlFor={id}
          className="flex w-32 shrink-0 cursor-pointer flex-col text-muted-foreground"
        >
          <span className="truncate">{field.label}</span>
          {optional && <span className="text-xs text-faint">Optional</span>}
          {field.required && <span className="sr-only"> (required)</span>}
        </label>
        <FieldValue {...props} />
      </div>
      {field.description && (
        <p id={`${id}-hint`} className="pl-39 text-xs text-faint">
          {field.description}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="pl-39 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

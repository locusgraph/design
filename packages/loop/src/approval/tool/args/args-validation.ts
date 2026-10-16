import type { ArgField, ArgValue, ArgValues } from "../../types";

export type ArgDraft = string | boolean;
export type ArgDrafts = Record<string, ArgDraft>;
export type ArgErrors = Record<string, string>;

export function draftsFrom(fields: ArgField[], initialValues: ArgValues): ArgDrafts {
  return Object.fromEntries(
    fields.map((field) => {
      const initial = initialValues[field.name];
      if (field.type === "boolean") return [field.name, initial === true];
      return [field.name, initial === undefined ? "" : String(initial)];
    })
  );
}

function numberError(field: ArgField, draft: string): string | undefined {
  const value = Number(draft);
  if (!Number.isFinite(value)) return `${field.label} must be a number.`;
  if (field.min !== undefined && value < field.min) {
    return `${field.label} must be at least ${field.min}.`;
  }
  if (field.max !== undefined && value > field.max) {
    return `${field.label} must be at most ${field.max}.`;
  }
  return undefined;
}

export function fieldError(field: ArgField, draft: ArgDraft | undefined): string | undefined {
  if (field.type === "boolean") return undefined;
  const text = typeof draft === "string" ? draft.trim() : "";
  if (text === "") return field.required ? `${field.label} is required.` : undefined;
  if (field.type === "number") return numberError(field, text);
  if (field.type === "select" && !field.options?.some((option) => option.value === text)) {
    return `Choose one of the listed ${field.label.toLowerCase()} options.`;
  }
  return undefined;
}

export function validateDrafts(fields: ArgField[], drafts: ArgDrafts): ArgErrors {
  const errors: ArgErrors = {};
  for (const field of fields) {
    const error = fieldError(field, drafts[field.name]);
    if (error) errors[field.name] = error;
  }
  return errors;
}

function valueFromDraft(field: ArgField, draft: ArgDraft | undefined): ArgValue | undefined {
  if (field.type === "boolean") return draft === true;
  const text = typeof draft === "string" ? draft.trim() : "";
  if (text === "") return undefined;
  return field.type === "number" ? Number(text) : text;
}

export function valuesFromDrafts(fields: ArgField[], drafts: ArgDrafts): ArgValues {
  const values: ArgValues = {};
  for (const field of fields) {
    const value = valueFromDraft(field, drafts[field.name]);
    if (value !== undefined) values[field.name] = value;
  }
  return values;
}

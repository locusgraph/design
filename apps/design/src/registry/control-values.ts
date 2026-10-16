import type { Control, Controls, ControlValue } from "./define-demo";

function parseControlValue(control: Control, raw: string | null): ControlValue {
  if (raw === null) {
    return control.initial;
  }
  if (control.kind === "toggle") {
    return raw === "true";
  }
  if (control.kind === "select" && !control.options.includes(raw)) {
    return control.initial;
  }
  return raw;
}

export function readControlValues(controls: Controls, params: URLSearchParams) {
  const values: Record<string, ControlValue> = {};
  for (const [name, control] of Object.entries(controls)) {
    values[name] = parseControlValue(control, params.get(name));
  }
  return values;
}

export function formatProp(name: string, value: ControlValue, initial: ControlValue) {
  if (value === initial) {
    return "";
  }
  if (typeof value === "boolean") {
    return value ? ` ${name}` : ` ${name}={false}`;
  }
  return ` ${name}="${value}"`;
}

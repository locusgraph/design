import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@locusgraph/components";
import type { Control, Controls, ControlValue } from "../../registry/define-demo";

type ControlsRowProps = {
  controls: Controls;
  values: Record<string, ControlValue>;
  onChange: (name: string, value: ControlValue) => void;
};

type ControlInputProps = {
  name: string;
  control: Control;
  value: ControlValue;
  onChange: (value: ControlValue) => void;
};

function ControlInput({ name, control, value, onChange }: ControlInputProps) {
  if (control.kind === "toggle") {
    return <Switch id={name} checked={value === true} onCheckedChange={onChange} />;
  }
  if (control.kind === "select") {
    return (
      <Select value={String(value)} onValueChange={onChange}>
        <SelectTrigger id={name} size="sm" className="min-w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {control.options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
  return (
    <Input
      id={name}
      value={String(value)}
      onChange={(event) => onChange(event.target.value)}
      className="h-8 w-36"
    />
  );
}

export function ControlsRow({ controls, values, onChange }: ControlsRowProps) {
  const entries = Object.entries(controls);
  if (entries.length === 0) {
    return null;
  }
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
      {entries.map(([name, control]) => (
        <div key={name} className="flex items-center justify-between gap-2 sm:justify-start">
          <Label htmlFor={name} className="font-normal text-muted-foreground">
            {name}
          </Label>
          <ControlInput
            name={name}
            control={control}
            value={values[name] ?? control.initial}
            onChange={(value) => onChange(name, value)}
          />
        </div>
      ))}
    </div>
  );
}

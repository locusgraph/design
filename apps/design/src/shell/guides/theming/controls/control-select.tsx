import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@locusgraph/components";
import type * as React from "react";

export type ControlOption = { value: string; label: string; swatch?: string };

type ControlSelectProps = {
  label: string;
  value: string;
  options: ControlOption[];
  onValueChange: (value: string) => void;
};

function Swatch({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      className="size-3 shrink-0 rounded-full ring-1 ring-border"
      style={{ background: color } as React.CSSProperties}
    />
  );
}

export function ControlSelect({ label, value, options, onValueChange }: ControlSelectProps) {
  const selected = options.find((option) => option.value === value);
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        aria-label={label}
        className="h-auto! w-full rounded-none border-0 bg-transparent px-4 py-3 shadow-none hover:bg-muted/50 dark:bg-transparent"
      >
        <span className="flex min-w-0 flex-col items-start gap-1.5">
          <span className="eyebrow">{label}</span>
          <SelectValue>
            <span className="flex items-center gap-2 font-medium text-foreground">
              {selected?.swatch && <Swatch color={selected.swatch} />}
              {selected?.label}
            </span>
          </SelectValue>
        </span>
      </SelectTrigger>
      <SelectContent position="popper" side="right" align="start">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.swatch && <Swatch color={option.swatch} />}
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

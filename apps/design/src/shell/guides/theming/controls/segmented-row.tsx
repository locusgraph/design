import { ToggleGroup, ToggleGroupItem } from "@locusgraph/components";

type SegmentedRowProps<Value extends string> = {
  label: string;
  value: Value;
  options: { value: Value; label: string }[];
  onValueChange: (value: Value) => void;
};

export function SegmentedRow<Value extends string>({
  label,
  value,
  options,
  onValueChange,
}: SegmentedRowProps<Value>) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <span className="eyebrow">{label}</span>
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        value={value}
        onValueChange={(next) => next && onValueChange(next as Value)}
        aria-label={label}
      >
        {options.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value} className="px-3">
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

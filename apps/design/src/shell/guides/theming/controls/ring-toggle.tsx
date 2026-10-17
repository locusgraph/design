import { ToggleGroup, ToggleGroupItem } from "@locusgraph/components";
import type { RingMode } from "../theme-presets";

const ringOptions: { value: RingMode; label: string }[] = [
  { value: "blue", label: "Blue" },
  { value: "brand", label: "Brand" },
];

export function RingToggle({
  value,
  onValueChange,
}: {
  value: RingMode;
  onValueChange: (ring: RingMode) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <span className="eyebrow">Focus ring</span>
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        value={value}
        onValueChange={(next) => next && onValueChange(next as RingMode)}
        aria-label="Focus ring"
      >
        {ringOptions.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value} className="px-3">
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

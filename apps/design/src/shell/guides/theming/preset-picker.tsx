import { ToggleGroup, ToggleGroupItem } from "@locusgraph/components";
import type { ThemePreset } from "./theme-presets";

type PresetPickerProps = {
  presets: ThemePreset[];
  value: string;
  mode: "light" | "dark";
  onValueChange: (id: string) => void;
};

export function PresetPicker({ presets, value, mode, onValueChange }: PresetPickerProps) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      spacing={2}
      value={value}
      onValueChange={(next) => next && onValueChange(next)}
      className="flex-wrap"
      aria-label="Theme preset"
    >
      {presets.map((preset) => (
        <ToggleGroupItem key={preset.id} value={preset.id} className="px-3">
          <span
            aria-hidden="true"
            className="size-3 rounded-full ring-1 ring-border"
            style={{ background: preset[mode].primary }}
          />
          {preset.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

import { Shuffle as ShuffleIcon } from "@carbon/icons-react";
import { Button } from "@locusgraph/components";
import type { RingMode, ThemeMode } from "../theme-presets";
import { themePresets } from "../theme-presets";
import { ControlSelect } from "./control-select";

const ringOptions = [
  { value: "blue", label: "Blue" },
  { value: "brand", label: "Brand color" },
];

type ThemeControlsProps = {
  mode: ThemeMode;
  presetId: string;
  ring: RingMode;
  onPresetChange: (id: string) => void;
  onRingChange: (ring: RingMode) => void;
  onShuffle: () => void;
};

export function ThemeControls({
  mode,
  presetId,
  ring,
  onPresetChange,
  onRingChange,
  onShuffle,
}: ThemeControlsProps) {
  const presetOptions = themePresets.map((preset) => ({
    value: preset.id,
    label: preset.name,
    swatch: preset[mode].primary,
  }));
  return (
    <div className="flex flex-col bg-surface ring-1 ring-border">
      <div className="border-b bg-muted/35 px-4 py-3">
        <h1 className="text-sm font-semibold">Theming</h1>
        <p className="text-xs text-muted-foreground">Monochrome until you pick a brand.</p>
      </div>
      <div className="divide-y">
        <ControlSelect
          label="Brand"
          value={presetId}
          options={presetOptions}
          onValueChange={onPresetChange}
        />
        <ControlSelect
          label="Focus ring"
          value={ring}
          options={ringOptions}
          onValueChange={(value) => onRingChange(value as RingMode)}
        />
      </div>
      <div className="border-t bg-muted/70 p-3">
        <Button variant="outline" className="w-full" onClick={onShuffle}>
          <ShuffleIcon />
          Shuffle
        </Button>
      </div>
    </div>
  );
}

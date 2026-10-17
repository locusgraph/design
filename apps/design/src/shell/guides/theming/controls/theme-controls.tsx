import { Shuffle as ShuffleIcon } from "@carbon/icons-react";
import { Button } from "@locusgraph/components";
import {
  neutralPreset,
  type ResolvedTheme,
  type RingMode,
  type ThemeMode,
  themePresets,
} from "../theme-presets";
import { ControlSelect } from "./control-select";
import { TokenValues } from "./token-values";

const ringOptions = [
  { value: "blue", label: "Blue" },
  { value: "brand", label: "Brand color" },
];

type ThemeControlsProps = {
  mode: ThemeMode;
  presetId: string;
  ring: RingMode;
  theme: ResolvedTheme;
  onPresetChange: (id: string) => void;
  onRingChange: (ring: RingMode) => void;
  onShuffle: () => void;
};

export function ThemeControls({
  mode,
  presetId,
  ring,
  theme,
  onPresetChange,
  onRingChange,
  onShuffle,
}: ThemeControlsProps) {
  const presetOptions = themePresets.map((preset) => ({
    value: preset.id,
    label: preset.name,
    swatch: preset[mode].primary,
  }));
  const isNeutral = presetId === neutralPreset.id && ring === "blue";
  return (
    <div className="flex flex-col bg-surface ring-1 ring-border">
      <div className="flex flex-col gap-1 border-b bg-muted/35 px-4 py-3">
        <h1 className="text-sm font-semibold">Theming</h1>
        <p className="text-xs text-muted-foreground">
          One brand color. Everything else stays grey.
        </p>
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
        <TokenValues theme={theme} />
      </div>
      <div className="flex gap-2 border-t bg-muted/70 p-3">
        <Button variant="outline" className="flex-1" onClick={onShuffle}>
          <ShuffleIcon />
          Shuffle
        </Button>
        <Button
          variant="ghost"
          disabled={isNeutral}
          onClick={() => {
            onPresetChange(neutralPreset.id);
            onRingChange("blue");
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

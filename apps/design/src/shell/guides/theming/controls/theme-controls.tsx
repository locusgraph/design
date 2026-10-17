import { Shuffle as ShuffleIcon } from "@carbon/icons-react";
import { Button } from "@locusgraph/components";
import { neutralPreset, type ResolvedTheme, type RingMode, type ThemeMode } from "../theme-presets";
import { BrandGrid } from "./brand-grid";
import { RingToggle } from "./ring-toggle";
import { TokenValues } from "./token-values";

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
        <BrandGrid mode={mode} value={presetId} onValueChange={onPresetChange} />
        <RingToggle value={ring} onValueChange={onRingChange} />
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

import { Button } from "@locusgraph/components";
import { Shuffle as ShuffleIcon } from "@phosphor-icons/react/ssr";
import {
  type ContrastMode,
  neutralPreset,
  type ResolvedTheme,
  type RingMode,
  type ThemeMode,
} from "../theme-presets";
import { BrandGrid } from "./brand-grid";
import { SegmentedRow } from "./segmented-row";
import { TokenValues } from "./token-values";

const ringOptions: { value: RingMode; label: string }[] = [
  { value: "blue", label: "Blue" },
  { value: "brand", label: "Brand" },
];

const contrastOptions: { value: ContrastMode; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "high", label: "High" },
];

export type ThemeSettings = { presetId: string; ring: RingMode; contrast: ContrastMode };

export const defaultThemeSettings: ThemeSettings = {
  presetId: neutralPreset.id,
  ring: "blue",
  contrast: "standard",
};

type ThemeControlsProps = {
  mode: ThemeMode;
  settings: ThemeSettings;
  theme: ResolvedTheme;
  onChange: (settings: ThemeSettings) => void;
  onShuffle: () => void;
};

function isDefault(settings: ThemeSettings) {
  return (
    settings.presetId === defaultThemeSettings.presetId &&
    settings.ring === defaultThemeSettings.ring &&
    settings.contrast === defaultThemeSettings.contrast
  );
}

export function ThemeControls({ mode, settings, theme, onChange, onShuffle }: ThemeControlsProps) {
  return (
    <div className="flex flex-col bg-surface ring-1 ring-border">
      <div className="flex flex-col gap-1 border-b bg-muted/35 px-4 py-3">
        <h1 className="text-sm font-semibold">Theming</h1>
        <p className="text-xs text-muted-foreground">
          One brand color. Everything else stays grey.
        </p>
      </div>
      <div className="divide-y">
        <BrandGrid
          mode={mode}
          value={settings.presetId}
          onValueChange={(presetId) => onChange({ ...settings, presetId })}
        />
        <SegmentedRow
          label="Focus ring"
          value={settings.ring}
          options={ringOptions}
          onValueChange={(ring) => onChange({ ...settings, ring })}
        />
        <SegmentedRow
          label="Contrast"
          value={settings.contrast}
          options={contrastOptions}
          onValueChange={(contrast) => onChange({ ...settings, contrast })}
        />
        <TokenValues theme={theme} />
      </div>
      <div className="flex gap-2 border-t bg-muted/70 p-3">
        <Button variant="outline" className="flex-1" onClick={onShuffle}>
          <ShuffleIcon weight="bold" aria-hidden />
          Shuffle
        </Button>
        <Button
          variant="ghost"
          disabled={isDefault(settings)}
          onClick={() => onChange(defaultThemeSettings)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

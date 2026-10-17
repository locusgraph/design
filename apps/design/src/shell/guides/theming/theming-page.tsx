import { useState } from "react";
import { ThemeCanvas } from "./canvas/theme-canvas";
import { ThemeControls } from "./controls/theme-controls";
import { ThemeDocsPanel } from "./docs/theme-docs-panel";
import { themePrompt } from "./docs/theme-prompt";
import {
  findThemePreset,
  pickOtherPreset,
  type RingMode,
  resolveTheme,
  type ThemeMode,
  themeCss,
  themeStyle,
} from "./theme-presets";

export function ThemingPage({ mode }: { mode: ThemeMode }) {
  const [presetId, setPresetId] = useState("neutral");
  const [ring, setRing] = useState<RingMode>("blue");
  const preset = findThemePreset(presetId);
  const prompt = themePrompt(
    resolveTheme(preset, "light", ring),
    resolveTheme(preset, "dark", ring),
    preset.name
  );
  return (
    <div className="flex flex-col gap-4 lg:grid lg:-mb-12 lg:h-[calc(100svh-var(--docs-header-height)-3.5rem)] lg:grid-cols-[15rem_minmax(0,1fr)_20rem] lg:items-stretch">
      <div className="lg:min-h-0">
        <ThemeControls
          mode={mode}
          presetId={preset.id}
          ring={ring}
          onPresetChange={setPresetId}
          onRingChange={setRing}
          onShuffle={() => setPresetId(pickOtherPreset(preset.id).id)}
        />
      </div>
      <ThemeCanvas style={themeStyle(resolveTheme(preset, mode, ring))} />
      <div className="lg:min-h-0">
        <ThemeDocsPanel css={themeCss(preset, ring)} prompt={prompt} />
      </div>
    </div>
  );
}

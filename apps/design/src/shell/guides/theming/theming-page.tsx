import "./theme-lab.css";
import { useState } from "react";
import { ThemeCanvas } from "./canvas/theme-canvas";
import { defaultThemeSettings, ThemeControls, type ThemeSettings } from "./controls/theme-controls";
import { dtcgTokens } from "./docs/dtcg-tokens";
import { ThemeDocsPanel } from "./docs/theme-docs-panel";
import { themePrompt } from "./docs/theme-prompt";
import {
  findThemePreset,
  pickOtherPreset,
  resolveTheme,
  type ThemeMode,
  themeCss,
  themeStyle,
} from "./theme-presets";

export function ThemingPage({ mode }: { mode: ThemeMode }) {
  const [settings, setSettings] = useState<ThemeSettings>(defaultThemeSettings);
  const preset = findThemePreset(settings.presetId);
  const light = resolveTheme(preset, "light", settings.ring);
  const dark = resolveTheme(preset, "dark", settings.ring);
  const current = mode === "dark" ? dark : light;
  return (
    <div className="flex flex-col gap-4 lg:-mb-12 lg:grid lg:h-[calc(100svh-var(--docs-header-height)-3.5rem)] lg:grid-cols-[16rem_minmax(0,1fr)_21rem] lg:items-stretch">
      <div className="lg:min-h-0 lg:overflow-y-auto">
        <ThemeControls
          mode={mode}
          settings={settings}
          theme={current}
          onChange={setSettings}
          onShuffle={() =>
            setSettings({ ...settings, presetId: pickOtherPreset(settings.presetId).id })
          }
        />
      </div>
      <ThemeCanvas style={themeStyle(current)} contrast={settings.contrast} />
      <div className="lg:min-h-0">
        <ThemeDocsPanel
          css={themeCss(preset, settings.ring, settings.contrast)}
          tokensJson={dtcgTokens(current)}
          mode={mode}
          prompt={themePrompt(light, dark, preset.name)}
          light={light}
          dark={dark}
        />
      </div>
    </div>
  );
}

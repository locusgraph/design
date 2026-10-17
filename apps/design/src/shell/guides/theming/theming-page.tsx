import type { PageSection } from "@locusgraph/components";
import type * as React from "react";
import { useState } from "react";
import { CodeBlock } from "../../preview/code-block";
import { PresetPicker } from "./preset-picker";
import { findThemePreset, themePresetCss, themePresetStyle, themePresets } from "./theme-presets";
import { ThemePreview } from "./theme-preview";

export const themingSections: PageSection[] = [
  { id: "three-tokens", title: "Three tokens" },
  { id: "presets", title: "Presets" },
  { id: "use-a-preset", title: "Use a preset" },
  { id: "what-stays-grey", title: "What stays grey" },
];

const tokenRows = [
  { token: "--btn", role: "Primary action, checked controls, progress" },
  { token: "--btn-ink", role: "Text and icons on the primary color" },
  { token: "--s1", role: "Focus ring and the first chart series" },
];

function Step({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="typeset typeset-docs">{children}</div>;
}

function TokenTable() {
  return (
    <div className="divide-y bg-surface ring-1 ring-border">
      {tokenRows.map((row) => (
        <div key={row.token} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:gap-6">
          <code className="w-24 shrink-0 font-mono text-sm">{row.token}</code>
          <span className="text-sm text-muted-foreground">{row.role}</span>
        </div>
      ))}
    </div>
  );
}

export function ThemingPage({ mode }: { mode: "light" | "dark" }) {
  const [presetId, setPresetId] = useState("neutral");
  const preset = findThemePreset(presetId);
  return (
    <article className="mx-auto flex w-full max-w-160 min-w-0 flex-col gap-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Theming</h1>
        <p className="text-balance text-muted-foreground md:max-w-[80%]">
          The theme is monochrome by default. One brand color replaces black on the primary action
          and the focus ring; everything else stays grey.
        </p>
      </header>
      <Step id="three-tokens" title="Three tokens">
        <Prose>
          <p>
            Components use semantic classes such as bg-primary and ring-ring, never raw colors.
            Override three variables and every component follows, in light and dark.
          </p>
        </Prose>
        <TokenTable />
      </Step>
      <Step id="presets" title="Presets">
        <PresetPicker
          presets={themePresets}
          value={preset.id}
          mode={mode}
          onValueChange={setPresetId}
        />
        <ThemePreview style={themePresetStyle(preset, mode)} />
      </Step>
      <Step id="use-a-preset" title="Use a preset">
        <Prose>
          <p>Set the variables after the theme import, once for light and once for dark.</p>
        </Prose>
        <CodeBlock
          code={themePresetCss(preset)}
          language="css"
          className="not-typeset border bg-surface"
        />
      </Step>
      <Step id="what-stays-grey" title="What stays grey">
        <Prose>
          <ul>
            <li>Hover and selected states use --ghost, a neutral tint, not the brand color.</li>
            <li>Surfaces, borders, text and the sidebar keep the grey palette.</li>
            <li>Status colors (good, warn, bad, info) never change with the brand.</li>
            <li>One primary action per view, so the brand color appears once.</li>
          </ul>
        </Prose>
      </Step>
    </article>
  );
}

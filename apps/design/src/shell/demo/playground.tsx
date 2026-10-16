import { cn } from "@locusgraph/components";
import { useMemo } from "react";
import type { ControlValue } from "../../registry/define-demo";
import type { DemoEntry } from "../../registry/load-demos";
import { clearParams, type ShellSettings, setParam } from "../../url-state";
import { CodeBlock } from "../preview/code-block";
import type { FrameRenderMessage } from "../preview/frame-messages";
import { PreviewFrame } from "../preview/preview-frame";
import { PreviewToolbar, previewBackgroundClass } from "../preview/preview-toolbar";
import { ControlsRow } from "./controls-row";

type PlaygroundProps = {
  entry: DemoEntry;
  values: Record<string, ControlValue>;
  settings: ShellSettings;
};

function storeControlValue(entry: DemoEntry, name: string, value: ControlValue) {
  const initial = entry.demo.controls[name]?.initial;
  setParam(name, value === initial ? null : String(value));
}

function hasChangedControls(entry: DemoEntry, values: Record<string, ControlValue>) {
  return Object.entries(entry.demo.controls).some(
    ([name, control]) => values[name] !== control.initial
  );
}

export function Playground({ entry, values, settings }: PlaygroundProps) {
  const valuesKey = JSON.stringify(values);
  const message = useMemo<FrameRenderMessage>(
    () => ({
      type: "render",
      path: entry.path,
      values: JSON.parse(valuesKey),
      theme: settings.theme,
      background: settings.background,
    }),
    [entry.path, valuesKey, settings.theme, settings.background]
  );

  return (
    <section className="overflow-hidden border">
      <div
        className={cn(
          "relative",
          settings.viewport === "mobile"
            ? previewBackgroundClass.checker
            : previewBackgroundClass[settings.background]
        )}
      >
        <PreviewToolbar
          background={settings.background}
          canReset={hasChangedControls(entry, values)}
          onReset={() => clearParams(Object.keys(entry.demo.controls))}
        />
        <PreviewFrame
          message={message}
          viewport={settings.viewport}
          height={entry.demo.previewHeight ?? "auto"}
        />
      </div>
      <ControlsRow
        controls={entry.demo.controls}
        values={values}
        onChange={(name, value) => storeControlValue(entry, name, value)}
      />
      <CodeBlock code={entry.demo.code(values as never)} className="border-t bg-surface" />
    </section>
  );
}

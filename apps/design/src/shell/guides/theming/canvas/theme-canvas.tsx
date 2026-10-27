import { ToggleGroup, ToggleGroupItem } from "@locusgraph/components";
import type * as React from "react";
import { useState } from "react";
import { findThemeSample, themeSamples } from "./theme-samples";

function SampleSwitch({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (id: string) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      size="sm"
      spacing={1}
      value={value}
      onValueChange={(next) => next && onValueChange(next)}
      aria-label="Sample"
    >
      {themeSamples.map((sample) => (
        <ToggleGroupItem key={sample.id} value={sample.id} className="px-3">
          {sample.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function ThemeCanvas({ style, contrast }: { style: React.CSSProperties; contrast: string }) {
  const [sampleId, setSampleId] = useState(themeSamples[0]?.id ?? "components");
  const sample = findThemeSample(sampleId);
  return (
    <div className="flex min-h-[70svh] min-w-0 flex-col bg-background ring-1 ring-border lg:h-full lg:min-h-0">
      <div className="flex min-h-14 items-center justify-between gap-3 border-b bg-muted/35 px-4">
        <span className="locus-eyebrow">Preview</span>
        <div className="max-w-full overflow-x-auto">
          <SampleSwitch value={sampleId} onValueChange={setSampleId} />
        </div>
      </div>
      <div
        data-theme-lab=""
        data-contrast={contrast}
        style={style}
        className="flex flex-1 flex-col overflow-auto p-4 md:p-10"
      >
        {sample?.render()}
      </div>
    </div>
  );
}

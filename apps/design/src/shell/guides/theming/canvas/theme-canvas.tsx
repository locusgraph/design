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
      className="bg-popover p-1 shadow-overlay ring-1 ring-border"
    >
      {themeSamples.map((sample) => (
        <ToggleGroupItem key={sample.id} value={sample.id} className="px-3">
          {sample.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function ThemeCanvas({ style }: { style: React.CSSProperties }) {
  const [sampleId, setSampleId] = useState(themeSamples[0]?.id ?? "components");
  const sample = findThemeSample(sampleId);
  return (
    <div className="relative flex min-h-[70svh] min-w-0 flex-col bg-background ring-1 ring-border lg:h-full lg:min-h-0">
      <div style={style} className="flex flex-1 flex-col overflow-auto p-4 pb-20 md:p-10 md:pb-24">
        {sample?.render()}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-4">
        <div className="pointer-events-auto max-w-full overflow-x-auto">
          <SampleSwitch value={sampleId} onValueChange={setSampleId} />
        </div>
      </div>
    </div>
  );
}

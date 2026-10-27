import type * as React from "react";
import { SegmentedRow } from "../../theming/controls/segmented-row";
import type { WriteGate } from "../session/use-generative-session";
import { PromptBox } from "./prompt-box";
import { StateFields } from "./state-fields";
import { StreamStatus } from "./stream-status";

type GenerativeControlsProps = {
  promptBox: React.ComponentProps<typeof PromptBox>;
  stream: React.ComponentProps<typeof StreamStatus>;
  store: React.ComponentProps<typeof StateFields>["store"];
  writeGate: WriteGate;
  onWriteGateChange: (gate: WriteGate) => void;
};

const writeGateOptions: { value: WriteGate; label: string }[] = [
  { value: "ask", label: "Ask" },
  { value: "auto", label: "Auto" },
];

export function GenerativeControls({
  promptBox,
  stream,
  store,
  writeGate,
  onWriteGateChange,
}: GenerativeControlsProps) {
  return (
    <div className="flex flex-col bg-surface">
      <div className="flex flex-col gap-1 border-b bg-muted/35 px-4 py-3">
        <h1 className="text-lg font-semibold">Generative UI</h1>
        <p className="text-sm text-muted-foreground">
          A model writes a JSON spec. The kit draws it, and every action asks first.
        </p>
      </div>
      <div className="divide-y">
        <PromptBox {...promptBox} />
        <StreamStatus {...stream} />
        <div className="flex flex-col py-1">
          <SegmentedRow
            label="Writes"
            value={writeGate}
            options={writeGateOptions}
            onValueChange={onWriteGateChange}
          />
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="locus-eyebrow">Destructive</span>
            <span className="text-sm text-muted-foreground">Always asks</span>
          </div>
        </div>
        <StateFields store={store} />
      </div>
    </div>
  );
}

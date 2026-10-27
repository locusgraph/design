import type { Spec } from "@json-render/core";
import { JSONUIProvider, Renderer } from "@json-render/react";
import { ToggleGroup, ToggleGroupItem } from "@locusgraph/components";
import { ApprovalGate, DecisionLog, Pulse } from "@locusgraph/loop";
import { useEffect, useRef } from "react";
import { generativeSamples } from "../session/samples";
import type { GenerativeSession } from "../session/use-generative-session";

type GenerativeCanvasProps = {
  sampleId: string;
  onSampleChange: (id: string) => void;
  spec: Spec;
  drawing?: string;
  session: GenerativeSession;
};

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
      {generativeSamples.map((sample) => (
        <ToggleGroupItem key={sample.id} value={sample.id} className="px-3">
          {sample.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function GenerativeCanvas({
  sampleId,
  onSampleChange,
  spec,
  drawing,
  session,
}: GenerativeCanvasProps) {
  const gateRef = useRef<HTMLDivElement>(null);
  const openApproval = session.gate.open;
  useEffect(() => {
    if (openApproval) gateRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [openApproval]);
  return (
    <div className="flex min-h-[70svh] min-w-0 flex-col bg-background ring-1 ring-border lg:h-full lg:min-h-0">
      <div className="flex min-h-14 items-center justify-between gap-3 border-b bg-muted/35 px-4">
        <span className="locus-eyebrow">Preview</span>
        <div className="max-w-full overflow-x-auto">
          <SampleSwitch value={sampleId} onValueChange={onSampleChange} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-8 overflow-auto p-4 md:p-10">
        <JSONUIProvider
          registry={session.registry}
          store={session.store}
          handlers={session.actionHandlers}
        >
          <Renderer spec={spec} registry={session.registry} />
        </JSONUIProvider>
        {drawing && <Pulse variant="shimmer" showLabel label={`Drawing ${drawing}…`} />}
        <div ref={gateRef}>
          <ApprovalGate gate={session.gate} />
        </div>
      </div>
      <div className="flex max-h-60 flex-col gap-3 overflow-y-auto border-t bg-surface px-4 py-4 md:px-10">
        <span className="locus-eyebrow">Decision log</span>
        {session.log.length === 0 ? (
          <p className="text-sm text-faint">Press an action in the preview to see who decided.</p>
        ) : (
          <DecisionLog entries={session.log} />
        )}
      </div>
    </div>
  );
}

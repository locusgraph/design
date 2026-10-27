import type { Spec } from "@json-render/core";
import { useState } from "react";
import { catalogPrompt, parseSpec } from "../../../demos/blocks/generative-ui/spec-playground";
import { GenerativeCanvas } from "./canvas/generative-canvas";
import { GenerativeControls } from "./controls/generative-controls";
import { GenerativeDocsPanel } from "./docs/generative-docs-panel";
import { findGenerativeSample, generativeSamples, sampleForPrompt } from "./session/samples";
import { elementOrder, gatedActionCount, partialSpec, useSpecStream } from "./session/spec-stream";
import { useGenerativeSession, type WriteGate } from "./session/use-generative-session";

const firstSample = generativeSamples[0] ?? findGenerativeSample("over-quota");

function nextElementType(spec: Spec, shownCount: number) {
  const id = elementOrder(spec)[shownCount];
  return id ? spec.elements[id]?.type : undefined;
}

function formatSpec(spec: Spec) {
  return JSON.stringify(spec, null, 2);
}

export function GenerativeUiPage() {
  const [sampleId, setSampleId] = useState(firstSample.id);
  const [prompt, setPrompt] = useState(firstSample.prompt);
  const [source, setSource] = useState(() => formatSpec(firstSample.spec));
  const [lastGood, setLastGood] = useState(firstSample.spec);
  const [runId, setRunId] = useState(0);
  const [writeGate, setWriteGate] = useState<WriteGate>("ask");
  const session = useGenerativeSession(writeGate);
  const stream = useSpecStream(lastGood, runId);
  const parsed = parseSpec(source);

  const showSample = (id: string, replay: boolean) => {
    const sample = findGenerativeSample(id);
    setSampleId(sample.id);
    setSource(formatSpec(sample.spec));
    setLastGood(sample.spec);
    if (replay) setRunId((current) => current + 1);
  };
  const editSource = (next: string) => {
    setSource(next);
    const { spec } = parseSpec(next);
    if (spec) setLastGood(spec);
  };

  return (
    <div className="flex flex-col gap-px p-px lg:-mb-12 lg:grid lg:h-[calc(100svh-var(--locus-docs-header-height)-3.5rem)] lg:grid-cols-[17rem_minmax(0,1fr)_22rem] lg:items-stretch">
      <div className="bg-surface ring-1 ring-border lg:min-h-0 lg:overflow-y-auto">
        <GenerativeControls
          promptBox={{
            prompt,
            streaming: stream.streaming,
            onPromptChange: setPrompt,
            onGenerate: (text) => showSample(sampleForPrompt(text).id, true),
          }}
          stream={{
            bytes: source.length,
            shownCount: stream.shownCount,
            total: stream.total,
            gatedActions: gatedActionCount(lastGood),
            streaming: stream.streaming,
          }}
          store={session.store}
          writeGate={writeGate}
          onWriteGateChange={setWriteGate}
        />
      </div>
      <GenerativeCanvas
        sampleId={sampleId}
        onSampleChange={(id) => showSample(id, true)}
        spec={partialSpec(lastGood, stream.shownCount)}
        drawing={stream.streaming ? nextElementType(lastGood, stream.shownCount) : undefined}
        session={session}
      />
      <div className="lg:min-h-0">
        <GenerativeDocsPanel
          editor={{
            source,
            error: parsed.error,
            elementCount: elementOrder(lastGood).length,
            onSourceChange: editSource,
          }}
          prompt={catalogPrompt}
        />
      </div>
    </div>
  );
}

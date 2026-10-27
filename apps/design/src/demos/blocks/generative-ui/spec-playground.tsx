import { createStateStore, type Spec } from "@json-render/core";
import { JSONUIProvider, Renderer, type SetState } from "@json-render/react";
import { Alert, AlertDescription, AlertTitle, Textarea } from "@locusgraph/components";
import { ApprovalGate, DecisionLog, useApprovalGate } from "@locusgraph/loop";
import { useEffect, useRef, useState } from "react";
import { type AskApproval, catalog, createGatedRegistry } from "./catalog";
import { sampleState } from "./presets";

type Store = ReturnType<typeof createStateStore>;

function storeSetState(store: Store): SetState {
  return (updater) => {
    const next = updater(store.getSnapshot());
    store.update(
      Object.fromEntries(Object.entries(next).map(([key, value]) => [`/${key}`, value]))
    );
  };
}

function parseSpec(source: string): { spec?: Spec; error?: string } {
  try {
    const spec = JSON.parse(source) as Spec;
    if (typeof spec.root !== "string" || typeof spec.elements !== "object") {
      return { error: "A spec needs a root id and an elements object." };
    }
    return { spec };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export const catalogPrompt = catalog.prompt();

export function SpecPlayground({ initialSpec }: { initialSpec: Spec }) {
  const [source, setSource] = useState(() => JSON.stringify(initialSpec, null, 2));
  const [lastGood, setLastGood] = useState(initialSpec);
  const parsed = parseSpec(source);
  const gate = useApprovalGate();
  const askRef = useRef<AskApproval>(gate.ask);
  useEffect(() => {
    askRef.current = gate.ask;
  });
  const [store] = useState(() => createStateStore(structuredClone(sampleState)));
  const [{ registry, handlers }] = useState(() =>
    createGatedRegistry((request) => askRef.current(request))
  );
  const [actionHandlers] = useState(() =>
    handlers(
      () => storeSetState(store),
      () => store.getSnapshot()
    )
  );
  const edit = (next: string) => {
    setSource(next);
    const { spec } = parseSpec(next);
    if (spec) setLastGood(spec);
  };
  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        <Textarea
          aria-label="Spec JSON"
          value={source}
          onChange={(event) => edit(event.target.value)}
          spellCheck={false}
          className="min-h-96 font-mono text-2xs"
        />
        {parsed.error && (
          <Alert variant="destructive">
            <AlertTitle>Showing the last spec that parsed</AlertTitle>
            <AlertDescription>{parsed.error}</AlertDescription>
          </Alert>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <JSONUIProvider registry={registry} store={store} handlers={actionHandlers}>
          <Renderer spec={lastGood} registry={registry} />
        </JSONUIProvider>
        <ApprovalGate gate={gate} />
        <DecisionLog entries={gate.log} />
      </div>
    </div>
  );
}

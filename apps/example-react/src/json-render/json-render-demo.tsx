import { createStateStore } from "@json-render/core";
import { JSONUIProvider, Renderer, type SetState } from "@json-render/react";
import { RuleGrid, RuleGridCell, RuleGridLabel } from "@locusgraph/components";
import { ApprovalGate, DecisionLog, useApprovalGate } from "@locusgraph/loop";
import { useEffect, useRef, useState } from "react";
import { grants, keys, packs, plans, quotas, wallet } from "../sample-data";
import { billingSpec } from "./billing-spec";
import { catalog } from "./catalog";
import { type AskApproval, createBillingRegistry } from "./registry";

function createBillingStore() {
  return createStateStore({
    quotas: quotas.map((quota) => ({ ...quota, label: quota.label ?? null })),
    overQuota: quotas.some((quota) => quota.used > quota.included),
    wallet,
    grants,
    packs,
    plans: plans.map(({ name, price, points, current }) => ({ name, price, points, current })),
    keys,
    selectedPackId: null,
    picked: null,
    lastAction: null,
  });
}

function storeSetState(store: ReturnType<typeof createStateStore>): SetState {
  return (updater) => {
    const next = updater(store.getSnapshot());
    store.update(
      Object.fromEntries(Object.entries(next).map(([key, value]) => [`/${key}`, value]))
    );
  };
}

export function JsonRenderDemo() {
  const gate = useApprovalGate();
  const askRef = useRef<AskApproval>(gate.ask);
  useEffect(() => {
    askRef.current = gate.ask;
  });
  const [store] = useState(createBillingStore);
  const [{ registry, handlers }] = useState(() =>
    createBillingRegistry((request) => askRef.current(request))
  );
  const [actionHandlers] = useState(() =>
    handlers(
      () => storeSetState(store),
      () => store.getSnapshot()
    )
  );
  const prompt = catalog.prompt();
  return (
    <div className="flex flex-col gap-8">
      <JSONUIProvider registry={registry} store={store} handlers={actionHandlers}>
        <Renderer spec={billingSpec} registry={registry} />
      </JSONUIProvider>
      <ApprovalGate gate={gate} />
      <RuleGrid columns={1}>
        <RuleGridCell className="gap-3">
          <RuleGridLabel>Decision log</RuleGridLabel>
          <DecisionLog entries={gate.log} />
        </RuleGridCell>
      </RuleGrid>
      <RuleGrid columns={2}>
        <RuleGridCell className="gap-3">
          <RuleGridLabel>Spec, what a model returns</RuleGridLabel>
          <pre className="max-h-96 overflow-auto font-mono text-2xs text-muted-foreground">
            {JSON.stringify(billingSpec, null, 2)}
          </pre>
        </RuleGridCell>
        <RuleGridCell className="gap-3">
          <RuleGridLabel>catalog.prompt(), {prompt.length} characters</RuleGridLabel>
          <pre className="max-h-96 overflow-auto font-mono text-2xs whitespace-pre-wrap text-muted-foreground">
            {prompt}
          </pre>
        </RuleGridCell>
      </RuleGrid>
    </div>
  );
}

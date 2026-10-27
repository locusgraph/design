import { createStateStore } from "@json-render/core";
import type { ApprovalDecision, ApprovalRequest, DecisionLogEntry } from "@locusgraph/loop";
import { useApprovalGate } from "@locusgraph/loop";
import { useEffect, useRef, useState } from "react";
import {
  type AskApproval,
  createGatedRegistry,
} from "../../../../demos/blocks/generative-ui/catalog";
import { sampleState } from "../../../../demos/blocks/generative-ui/presets";
import { storeSetState } from "../../../../demos/blocks/generative-ui/spec-playground";

export type WriteGate = "ask" | "auto";

function decidedAtMs(entry: DecisionLogEntry) {
  return new Date(entry.decision.at).getTime();
}

function autoEntry(request: ApprovalRequest, decision: ApprovalDecision, id: number) {
  return {
    id: `auto_${id}`,
    title: request.title ?? request.toolName,
    kind: "rule" as const,
    decision,
    detail: "Writes run without asking on this page",
  };
}

export function useGenerativeSession(writeGate: WriteGate) {
  const gate = useApprovalGate();
  const [autoLog, setAutoLog] = useState<DecisionLogEntry[]>([]);
  const autoCount = useRef(0);
  const askRef = useRef<AskApproval>(gate.ask);
  useEffect(() => {
    askRef.current = (request) => {
      const runsWithoutAsking = writeGate === "auto" && request.risk === "write";
      if (!runsWithoutAsking) return gate.ask(request);
      const decision = { approved: true, by: "Auto", at: Date.now() };
      autoCount.current += 1;
      const entry = autoEntry(request, decision, autoCount.current);
      setAutoLog((current) => [...current, entry]);
      return Promise.resolve(decision);
    };
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
  const log = [...gate.log, ...autoLog].sort(
    (first, second) => decidedAtMs(first) - decidedAtMs(second)
  );
  const startTurn = () => store.update({ "/picked": null, "/pending": null, "/settled": null });
  return { gate, store, registry, actionHandlers, log, startTurn };
}

export type GenerativeSession = ReturnType<typeof useGenerativeSession>;

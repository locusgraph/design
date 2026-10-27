import { Button } from "@locusgraph/components";
import { DecisionLog, type DecisionLogEntry, SpendGate } from "@locusgraph/loop";
import { formatMicroUsd } from "@locusgraph/utils";
import { useState } from "react";
import {
  type CapRun,
  freshRun,
  prepaidBalanceMicroUsd,
  reconciliationSteps,
  runUntilGate,
} from "./spend-cap";

export function SpendCapRun() {
  const [run, setRun] = useState<CapRun>(freshRun);
  const [log, setLog] = useState<DecisionLogEntry[]>([]);
  const step = reconciliationSteps[run.next];
  const record = (approved: boolean, detail: string) => {
    const title = `${step?.name ?? "Step"}, ${formatMicroUsd(step?.estimateMicroUsd ?? 0)}`;
    const decision = { approved, by: "You", at: Date.now() };
    setLog((current) => [
      ...current,
      { id: `spend_${current.length + 1}`, title, kind: "spend", decision, detail },
    ]);
  };
  return (
    <div className="flex flex-col gap-4">
      <Button
        size="sm"
        className="self-start"
        onClick={() => {
          setLog([]);
          setRun(runUntilGate(freshRun));
        }}
      >
        Start run
      </Button>
      <p className="font-mono text-2xs text-muted-foreground">
        {formatMicroUsd(run.spentMicroUsd)} spent of a {formatMicroUsd(run.capMicroUsd)} cap ·{" "}
        {run.next} of {reconciliationSteps.length} steps · {run.status}
      </p>
      {run.status === "paused" && step && (
        <SpendGate
          key={`${run.next}-${run.capMicroUsd}`}
          runName="Q4 vendor reconciliation"
          spentMicroUsd={run.spentMicroUsd}
          estimateMicroUsd={step.estimateMicroUsd}
          capMicroUsd={run.capMicroUsd}
          balanceMicroUsd={prepaidBalanceMicroUsd - run.spentMicroUsd}
          autoFocus={false}
          onAllowOnce={() => {
            record(true, "Allowed this step once");
            setRun(runUntilGate(run, true));
          }}
          onRaiseCap={(capMicroUsd) => {
            record(true, `Cap raised to ${formatMicroUsd(capMicroUsd)}`);
            setRun(runUntilGate({ ...run, capMicroUsd }));
          }}
          onStop={() => {
            record(false, "Run stopped before this step");
            setRun({ ...run, status: "stopped" });
          }}
        />
      )}
      <DecisionLog entries={log} />
    </div>
  );
}

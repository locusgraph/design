export type RunStep = { name: string; estimateMicroUsd: number };

export type CapRunStatus = "idle" | "paused" | "stopped" | "done";

export type CapRun = {
  spentMicroUsd: number;
  capMicroUsd: number;
  next: number;
  status: CapRunStatus;
};

export const prepaidBalanceMicroUsd = 18_400_000;

export const reconciliationSteps: RunStep[] = [
  { name: "Read invoices", estimateMicroUsd: 400_000 },
  { name: "Match vendors", estimateMicroUsd: 1_100_000 },
  { name: "Draft report", estimateMicroUsd: 1_350_000 },
  { name: "Email finance", estimateMicroUsd: 300_000 },
];

export const freshRun: CapRun = {
  spentMicroUsd: 0,
  capMicroUsd: 2_000_000,
  next: 0,
  status: "idle",
};

export function needsSpendGate(run: CapRun, step: RunStep) {
  const total = run.spentMicroUsd + step.estimateMicroUsd;
  return (
    total > run.capMicroUsd || step.estimateMicroUsd > prepaidBalanceMicroUsd - run.spentMicroUsd
  );
}

export function runUntilGate(from: CapRun, allowNextOnce = false): CapRun {
  let run = from;
  let allowOnce = allowNextOnce;
  for (const step of reconciliationSteps.slice(from.next)) {
    if (!allowOnce && needsSpendGate(run, step)) return { ...run, status: "paused" };
    allowOnce = false;
    run = { ...run, spentMicroUsd: run.spentMicroUsd + step.estimateMicroUsd, next: run.next + 1 };
  }
  return { ...run, status: "done" };
}

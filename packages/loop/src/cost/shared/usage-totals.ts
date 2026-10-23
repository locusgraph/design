import type { RunUsage } from "../../types";

export type UsageTotals = {
  inputTokens: number;
  outputTokens: number;
  costMicroUsd: number;
  wastedMicroUsd: number;
  failedAttempts: number;
};

export function sumUsage(attempts: RunUsage[]): UsageTotals {
  return attempts.reduce<UsageTotals>(
    (totals, attempt) => ({
      inputTokens: totals.inputTokens + attempt.inputTokens,
      outputTokens: totals.outputTokens + attempt.outputTokens,
      costMicroUsd: totals.costMicroUsd + attempt.costMicroUsd,
      wastedMicroUsd: totals.wastedMicroUsd + (attempt.failed ? attempt.costMicroUsd : 0),
      failedAttempts: totals.failedAttempts + (attempt.failed ? 1 : 0),
    }),
    { inputTokens: 0, outputTokens: 0, costMicroUsd: 0, wastedMicroUsd: 0, failedAttempts: 0 }
  );
}

const compactCount = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatTokensShort(tokens: number): string {
  return compactCount.format(tokens).replace("K", "k");
}

export function formatDuration(durationMs: number): string {
  if (durationMs < 1000) return `${Math.round(durationMs)}ms`;
  const seconds = durationMs / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.round(seconds % 60);
  return `${minutes}m ${String(remainder).padStart(2, "0")}s`;
}

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

export function wholePercentsOf(parts: number[], whole: number): number[] {
  if (whole <= 0) return parts.map(() => 0);
  const exact = parts.map((part) => (part / whole) * 100);
  const sum = parts.reduce((total, part) => total + part, 0);
  if (sum !== whole) return exact.map((percent) => Math.round(percent));
  const floors = exact.map((percent) => Math.floor(percent));
  const missing = 100 - floors.reduce((total, percent) => total + percent, 0);
  const byLargestRemainder = exact
    .map((percent, index) => ({ index, remainder: percent - Math.floor(percent) }))
    .sort((first, second) => second.remainder - first.remainder);
  for (const { index } of byLargestRemainder.slice(0, missing)) {
    floors[index] = (floors[index] ?? 0) + 1;
  }
  return floors;
}

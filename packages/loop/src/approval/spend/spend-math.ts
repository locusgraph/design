const microUsdPerDollar = 1_000_000;
const microUsdPerCent = 10_000;

export type SpendSituation = "over-cap" | "out-of-credits";

export function spendSituation(balanceMicroUsd: number, estimateMicroUsd: number): SpendSituation {
  return balanceMicroUsd <= 0 || balanceMicroUsd < estimateMicroUsd ? "out-of-credits" : "over-cap";
}

export function minimumCapMicroUsd(projectedMicroUsd: number, capMicroUsd: number): number {
  return Math.max(projectedMicroUsd, capMicroUsd + microUsdPerCent);
}

export function suggestedCapMicroUsd(projectedMicroUsd: number, capMicroUsd: number): number {
  const minimum = minimumCapMicroUsd(projectedMicroUsd, capMicroUsd);
  return Math.ceil(minimum / microUsdPerDollar) * microUsdPerDollar;
}

export function dollarsToMicroUsd(dollars: string): number | null {
  const value = Number(dollars.trim());
  if (dollars.trim() === "" || !Number.isFinite(value)) return null;
  return Math.round(value * microUsdPerDollar);
}

export function microUsdToDollarsInput(microUsd: number): string {
  return (microUsd / microUsdPerDollar).toFixed(2);
}

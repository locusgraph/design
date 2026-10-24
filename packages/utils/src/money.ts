const microUsdPerDollar = 1_000_000;
const microUsdPerCent = 10_000;

const usd = (fractionDigits: { min: number; max: number }) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits.min,
    maximumFractionDigits: fractionDigits.max,
  });

const wholeCentsFormat = usd({ min: 2, max: 2 });
const subCentFormat = usd({ min: 2, max: 4 });

function withoutNegativeZero(amount: number): number {
  return amount === 0 ? 0 : amount;
}

export function formatCents(cents: number): string {
  return wholeCentsFormat.format(withoutNegativeZero(cents) / 100);
}

const smallestShownMicroUsd = 100;

export function formatMicroUsd(microUsd: number): string {
  if (microUsd > 0 && microUsd < smallestShownMicroUsd) {
    return `<${subCentFormat.format(smallestShownMicroUsd / microUsdPerDollar)}`;
  }
  const format = microUsd % microUsdPerCent === 0 ? wholeCentsFormat : subCentFormat;
  return format.format(withoutNegativeZero(microUsd) / microUsdPerDollar);
}

export function centsToMicroUsd(cents: number): number {
  return cents * microUsdPerCent;
}

export type BalanceLevel = "fine" | "low" | "empty";

export const lowBalanceMicroUsd = 2_000_000;

export function balanceLevel(
  balanceMicroUsd: number,
  lowAtMicroUsd = lowBalanceMicroUsd
): BalanceLevel {
  if (balanceMicroUsd <= 0) return "empty";
  return balanceMicroUsd < lowAtMicroUsd ? "low" : "fine";
}

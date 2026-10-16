export type QuotaStatus = "ok" | "near" | "over";

export type QuotaAmounts = { used: number; included: number };

export const nearLimitPercent = 80;

export function quotaPercent({ used, included }: QuotaAmounts): number {
  if (included <= 0) {
    return used > 0 ? 100 : 0;
  }
  return Math.min(Math.round((used / included) * 100), 100);
}

export function quotaStatus(quota: QuotaAmounts): QuotaStatus {
  if (quota.used > quota.included) {
    return "over";
  }
  return quotaPercent(quota) >= nearLimitPercent ? "near" : "ok";
}

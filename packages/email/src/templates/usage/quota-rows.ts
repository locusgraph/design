import { formatCount } from "@locusgraph/utils";

export type OverQuota = {
  key: string;
  label?: string;
  used: number;
  included: number;
  periodLabel: string;
};

export function quotaRows(quotas: OverQuota[]): [string, string][] {
  return quotas.map((quota) => [
    quota.label ?? quota.key,
    `${formatCount(quota.used)} of ${formatCount(quota.included)} ${quota.periodLabel}`,
  ]);
}

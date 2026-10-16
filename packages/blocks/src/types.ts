export type { LinkComponent } from "@locusgraph/components";

export type QuotaPeriod = "month" | "lifetime";

export type Quota = {
  key: string;
  period: QuotaPeriod;
  used: number;
  included: number;
};

export type CreditPack = { id: string; priceCents: number; amountMicroUsd: number };

export type WalletGrant = { label: string; remainingMicroUsd: number; expiresAt: string | null };

export type PlanOffer = {
  name: string;
  price: string;
  points: string[];
  current: boolean;
};

export type ApiKeyRow = {
  id: string;
  name: string | null;
  maskedKey: string;
  productLabel: string;
  createdBy: string;
  createdAt: string | null;
  expiresAt: string | null;
};

export function periodLabel(period: QuotaPeriod): string {
  return period === "month" ? "this month" : "lifetime";
}

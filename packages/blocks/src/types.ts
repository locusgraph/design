export type { LinkComponent } from "@locusgraph/components";

export type BlockActionVariant = "default" | "outline" | "ghost" | "destructive";

export type BlockAction = {
  id: string;
  label: string;
  variant?: BlockActionVariant;
  disabled?: boolean;
};

export type QuotaPeriod = "month" | "lifetime";

export type QuotaData = {
  key: string;
  period: QuotaPeriod;
  used: number;
  included: number;
  label?: string;
};

export type CreditPack = { id: string; priceCents: number; amountMicroUsd: number };

export type WalletGrant = { label: string; remainingMicroUsd: number; expiresAt: string | null };

export type PlanInterval = "month" | "year";

export type PlanOffer = {
  name: string;
  price: string;
  amountCents?: number;
  interval?: PlanInterval;
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

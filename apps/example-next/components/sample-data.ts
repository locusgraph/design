import type { ApiKeyRow, CreditPack, PlanOffer, Quota, WalletGrant } from "@locusgraph/blocks";

export const organization = { name: "Acme Inc", plan: "Free" };

export const quotas: Quota[] = [
  { key: "locusgraph.graphs", period: "lifetime", used: 0, included: 1 },
  { key: "spendgraph.events", period: "month", used: 10450, included: 10000 },
];

export const wallet = { balanceMicroUsd: 1_000_000, debtMicroUsd: 0 };

export const grants: WalletGrant[] = [
  { label: "Free start", remainingMicroUsd: 1_000_000, expiresAt: null },
];

export const packs: CreditPack[] = [
  { id: "credits_10", priceCents: 1000, amountMicroUsd: 10_000_000 },
  { id: "credits_50", priceCents: 5000, amountMicroUsd: 50_000_000 },
  { id: "credits_200", priceCents: 19000, amountMicroUsd: 200_000_000 },
];

export const plans: PlanOffer[] = [
  { name: "Free", price: "$0", points: ["LocusGraph Free", "SpendGraph Free"], current: true },
  {
    name: "Pro",
    price: "$40.00 per month",
    points: ["Every product on one plan", "Higher monthly quotas", "$20 of LLM usage each month"],
    current: false,
  },
];

export const keys: ApiKeyRow[] = [
  {
    id: "key_1",
    name: "production worker",
    maskedKey: "lg_live_…a1b2",
    productLabel: "LocusGraph",
    createdBy: "You",
    createdAt: "2026-10-01T00:00:00.000Z",
    expiresAt: null,
  },
];

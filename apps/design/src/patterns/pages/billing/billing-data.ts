import type { CreditPack, PlanOffer, QuotaData, WalletGrant } from "@locusgraph/blocks";

export type InvoiceStatus = "paid" | "past-due";

export type Invoice = {
  id: string;
  issuedAt: string;
  amountCents: number;
  status: InvoiceStatus;
};

export type BillingWallet = {
  balanceMicroUsd: number;
  debtMicroUsd?: number;
  grants: WalletGrant[];
};

export const sampleQuotas: QuotaData[] = [
  {
    key: "locusgraph.graphs",
    label: "LocusGraph graphs",
    period: "lifetime",
    used: 1,
    included: 1,
  },
  {
    key: "spendgraph.events",
    label: "SpendGraph events",
    period: "month",
    used: 10450,
    included: 10000,
  },
];

export const sampleWallet: BillingWallet = {
  balanceMicroUsd: 1_000_000,
  grants: [{ label: "Free start", remainingMicroUsd: 1_000_000, expiresAt: null }],
};

export const samplePacks: CreditPack[] = [
  { id: "credits_10", priceCents: 1000, amountMicroUsd: 10_000_000 },
  { id: "credits_50", priceCents: 5000, amountMicroUsd: 50_000_000 },
  { id: "credits_200", priceCents: 19000, amountMicroUsd: 200_000_000 },
];

export const samplePlans: PlanOffer[] = [
  {
    name: "Free",
    price: "$0",
    amountCents: 0,
    points: ["LocusGraph Free", "SpendGraph Free"],
    current: true,
  },
  {
    name: "Pro",
    price: "$40.00 per month",
    amountCents: 4000,
    interval: "month",
    points: ["Every product on one plan", "Higher monthly quotas"],
    current: false,
  },
];

export const sampleInvoices: Invoice[] = [
  { id: "in_1042", issuedAt: "2026-10-01", amountCents: 4000, status: "past-due" },
  { id: "in_1031", issuedAt: "2026-09-01", amountCents: 4000, status: "paid" },
  { id: "in_1019", issuedAt: "2026-08-01", amountCents: 5000, status: "paid" },
  { id: "in_1004", issuedAt: "2026-07-01", amountCents: 1000, status: "paid" },
];

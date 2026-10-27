import type { Spec } from "@json-render/core";

export const sampleState = {
  quotas: [
    { key: "spendgraph.events", period: "month", used: 10_450, included: 10_000, label: null },
    { key: "locusgraph.memories", period: "month", used: 1_820, included: 5_000, label: null },
  ],
  overQuota: true,
  wallet: { balanceMicroUsd: 1_000_000 },
  grants: [{ label: "Free start", remainingMicroUsd: 1_000_000, expiresAt: null }],
  packs: [
    { id: "credits_10", priceCents: 1000, amountMicroUsd: 10_000_000 },
    { id: "credits_50", priceCents: 5000, amountMicroUsd: 50_000_000 },
  ],
  plans: [
    { name: "Free", price: "$0", points: ["Every product, free quotas"], current: true },
    { name: "Pro", price: "$40.00 per month", points: ["Higher monthly quotas"], current: false },
  ],
  keys: [
    {
      id: "key_1",
      name: "Production",
      maskedKey: "lg_live_••••4f2a",
      productLabel: "LocusGraph",
      createdBy: "Maya Chen",
      createdAt: "2026-09-02T10:00:00.000Z",
      expiresAt: null,
    },
  ],
  selectedPackId: null,
  picked: null,
  pending: null,
  settled: null,
};

const lastAction = {
  type: "Notice",
  props: { tone: "success", title: { $state: "/settled/label" }, description: null },
  visible: { $state: "/settled" },
};

export const overQuotaSpec: Spec = {
  root: "page",
  elements: {
    page: { type: "Stack", props: { gap: "md" }, children: ["notice", "usage", "plans"] },
    notice: {
      type: "Notice",
      props: { tone: "warning", title: "You're 450 events over this month", description: null },
      visible: { $state: "/overQuota" },
    },
    usage: { type: "Usage", props: { quotas: { $state: "/quotas" }, label: "This month" } },
    plans: {
      type: "Plans",
      props: {
        plans: { $state: "/plans" },
        actions: [{ id: "upgrade", label: "Upgrade", variant: null, disabled: null }],
      },
      on: { action: { action: "pickedAction" } },
    },
  },
};

export const creditsSpec: Spec = {
  root: "page",
  elements: {
    page: { type: "Stack", props: { gap: "md" }, children: ["money", "done"] },
    money: { type: "Columns", props: { count: 2 }, children: ["wallet", "top-up"] },
    wallet: {
      type: "Wallet",
      props: {
        balanceMicroUsd: { $state: "/wallet/balanceMicroUsd" },
        grants: { $state: "/grants" },
      },
    },
    "top-up": {
      type: "TopUp",
      props: { packs: { $state: "/packs" } },
      on: { buy: { action: "buyCredits" } },
    },
    done: lastAction,
  },
};

export const keysSpec: Spec = {
  root: "page",
  elements: {
    page: { type: "Stack", props: { gap: "md" }, children: ["keys"] },
    keys: {
      type: "Keys",
      props: {
        keys: { $state: "/keys" },
        actions: [
          { id: "rotate", label: "Rotate", variant: null, disabled: null },
          { id: "revoke", label: "Revoke", variant: "destructive", disabled: null },
        ],
      },
      on: { action: { action: "pickedAction" } },
    },
  },
};

export const presets = { "over-quota": overQuotaSpec, credits: creditsSpec, keys: keysSpec };

export type PresetName = keyof typeof presets;

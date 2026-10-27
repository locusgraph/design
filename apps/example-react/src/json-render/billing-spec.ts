import type { Spec } from "@json-render/core";

export const billingSpec: Spec = {
  root: "page",
  elements: {
    page: {
      type: "Stack",
      props: { gap: "lg" },
      children: ["over-quota", "usage", "money", "plans", "keys", "last-action"],
    },
    "over-quota": {
      type: "Notice",
      props: {
        tone: "warning",
        title: "SpendGraph events are over the free quota",
        description: "Events past 10,000 this month are billed from your credits.",
      },
      visible: { $state: "/overQuota" },
    },
    usage: {
      type: "Usage",
      props: { quotas: { $state: "/quotas" }, label: "This month" },
    },
    money: {
      type: "Columns",
      props: { count: 2 },
      children: ["wallet", "top-up"],
    },
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
    plans: {
      type: "Plans",
      props: {
        plans: { $state: "/plans" },
        actions: [{ id: "upgrade", label: "Upgrade", variant: null, disabled: null }],
      },
      on: { action: { action: "planAction" } },
    },
    keys: {
      type: "Keys",
      props: {
        keys: { $state: "/keys" },
        actions: [
          { id: "rotate", label: "Rotate", variant: null, disabled: null },
          { id: "revoke", label: "Revoke", variant: "destructive", disabled: null },
        ],
      },
      on: { action: { action: "keyAction" } },
    },
    "last-action": {
      type: "Notice",
      props: { tone: "success", title: { $state: "/lastAction" }, description: null },
      visible: { $state: "/lastAction" },
    },
  },
};

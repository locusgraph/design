import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { z } from "zod";

const quota = z.object({
  key: z.string(),
  period: z.enum(["month", "lifetime"]),
  used: z.number(),
  included: z.number(),
  label: z.string().nullable(),
});

const grant = z.object({
  label: z.string(),
  remainingMicroUsd: z.number(),
  expiresAt: z.string().nullable(),
});

const pack = z.object({
  id: z.string(),
  priceCents: z.number(),
  amountMicroUsd: z.number(),
});

const blockAction = z.object({
  id: z.string(),
  label: z.string(),
  variant: z.enum(["default", "outline", "ghost", "destructive"]).nullable(),
  disabled: z.boolean().nullable(),
});

const plan = z.object({
  name: z.string(),
  price: z.string(),
  points: z.array(z.string()),
  current: z.boolean(),
});

const apiKey = z.object({
  id: z.string(),
  name: z.string().nullable(),
  maskedKey: z.string(),
  productLabel: z.string(),
  createdBy: z.string(),
  createdAt: z.string().nullable(),
  expiresAt: z.string().nullable(),
});

export const catalog = defineCatalog(schema, {
  components: {
    Stack: {
      props: z.object({ gap: z.enum(["sm", "md", "lg"]).nullable() }),
      description: "Vertical stack of children",
    },
    Columns: {
      props: z.object({ count: z.union([z.literal(1), z.literal(2)]) }),
      description: "Rule grid with one or two columns of block cells, such as Wallet and TopUp",
    },
    Notice: {
      props: z.object({
        tone: z.enum(["default", "success", "warning", "destructive"]),
        title: z.string(),
        description: z.string().nullable(),
      }),
      description: "Status message for the user",
    },
    Usage: {
      props: z.object({ quotas: z.array(quota), label: z.string().nullable() }),
      description: "Quota meters. Bind quotas to /quotas",
    },
    Wallet: {
      props: z.object({ balanceMicroUsd: z.number(), grants: z.array(grant) }),
      description: "Credit balance and grants. Bind to /wallet/balanceMicroUsd and /grants",
    },
    TopUp: {
      props: z.object({ packs: z.array(pack) }),
      description: "Credit packs to buy. Bind packs to /packs. Emits buy",
    },
    Plans: {
      props: z.object({ plans: z.array(plan), actions: z.array(blockAction) }),
      description:
        "Plan cards. Bind plans to /plans. actions appear on every plan but the current one. Emits action",
    },
    Keys: {
      props: z.object({ keys: z.array(apiKey), actions: z.array(blockAction) }),
      description: "API key table. Bind keys to /keys. actions appear on every row. Emits action",
    },
  },
  actions: {
    buyCredits: { description: "Open checkout for the pack at /selectedPackId" },
    planAction: { description: "Run the plan action at /picked" },
    keyAction: { description: "Run the key action at /picked" },
  },
});

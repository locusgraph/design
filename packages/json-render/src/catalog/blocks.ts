import { z } from "zod";
import { apiKey, blockAction, grant, pack, plan, quota } from "./shapes";

export const blockComponents = {
  Usage: {
    props: z.object({ quotas: z.array(quota), label: z.string().nullable() }),
    description: "Quota meters, one per quota. Bind quotas to state, never write the numbers",
  },
  Quota: {
    props: z.object({ quota }),
    description: "One quota meter on its own, for a single limit inside other content",
  },
  UsageAlert: {
    props: z.object({
      balanceMicroUsd: z.number().nullable(),
      quotas: z.array(quota),
      paidPlan: z.boolean(),
      buyCreditsHref: z.string(),
      upgradeHref: z.string(),
    }),
    description:
      "Warning shown only when a quota is over or credits are low or empty; renders nothing otherwise. Bind every prop to state, never write the links",
  },
  Wallet: {
    props: z.object({ balanceMicroUsd: z.number(), grants: z.array(grant) }),
    description: "Prepaid credit balance and its grants. A Rule Grid cell; put it in Columns",
  },
  TopUp: {
    props: z.object({ packs: z.array(pack) }),
    description:
      "Credit packs to buy. A Rule Grid cell. Emits buy after writing the pack id to /selectedPackId",
  },
  Plans: {
    props: z.object({ plans: z.array(plan), actions: z.array(blockAction) }),
    description:
      "Plan cards. actions show on every plan but the current one. Emits action after writing { actionId, target } to /picked",
  },
  KeysEmpty: {
    props: z.object({ newKeyHref: z.string().nullable(), description: z.string().nullable() }),
    description:
      "Empty state for a person with no API keys yet. Bind newKeyHref to state; null hides the create link for read-only roles",
  },
  Keys: {
    props: z.object({ keys: z.array(apiKey), actions: z.array(blockAction) }),
    description:
      "API key table. actions show on every row. Emits action after writing { actionId, target } to /picked",
  },
};

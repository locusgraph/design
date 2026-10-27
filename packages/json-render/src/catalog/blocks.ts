import { z } from "zod";
import { apiKey, blockAction, grant, pack, plan, quota } from "./shapes";

export const blockComponents = {
  Usage: {
    props: z.object({ quotas: z.array(quota), label: z.string().nullable() }),
    description: "Quota meters, one per quota. Bind quotas to state, never write the numbers",
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
  Keys: {
    props: z.object({ keys: z.array(apiKey), actions: z.array(blockAction) }),
    description:
      "API key table. actions show on every row. Emits action after writing { actionId, target } to /picked",
  },
};

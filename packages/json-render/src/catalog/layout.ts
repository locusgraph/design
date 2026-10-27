import { z } from "zod";

export const layoutComponents = {
  Stack: {
    props: z.object({ gap: z.enum(["sm", "md", "lg"]).nullable() }),
    description: "Vertical stack of children",
  },
  Columns: {
    props: z.object({ count: z.union([z.literal(1), z.literal(2), z.literal(3)]) }),
    description: "Rule grid of block cells in one to three columns, such as Wallet next to TopUp",
  },
  Notice: {
    props: z.object({
      tone: z.enum(["default", "success", "warning", "destructive"]),
      title: z.string(),
      description: z.string().nullable(),
    }),
    description: "A status message for the person reading the screen",
  },
};

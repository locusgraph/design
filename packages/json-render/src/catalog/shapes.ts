import { z } from "zod";

export const blockAction = z.object({
  id: z.string(),
  label: z.string(),
  variant: z.enum(["default", "outline", "ghost", "destructive"]).nullable(),
  disabled: z.boolean().nullable(),
});

export const quota = z.object({
  key: z.string(),
  period: z.enum(["month", "lifetime"]),
  used: z.number(),
  included: z.number(),
  label: z.string().nullable(),
});

export const grant = z.object({
  label: z.string(),
  remainingMicroUsd: z.number(),
  expiresAt: z.string().nullable(),
});

export const pack = z.object({
  id: z.string(),
  priceCents: z.number(),
  amountMicroUsd: z.number(),
});

export const plan = z.object({
  name: z.string(),
  price: z.string(),
  points: z.array(z.string()),
  current: z.boolean(),
});

export const apiKey = z.object({
  id: z.string(),
  name: z.string().nullable(),
  maskedKey: z.string(),
  productLabel: z.string(),
  createdBy: z.string(),
  createdAt: z.string().nullable(),
  expiresAt: z.string().nullable(),
});

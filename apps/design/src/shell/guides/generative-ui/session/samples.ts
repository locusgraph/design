import type { Spec } from "@json-render/core";
import {
  creditsSpec,
  keysSpec,
  overQuotaSpec,
} from "../../../../demos/blocks/generative-ui/presets";

export type GenerativeSample = { id: string; label: string; prompt: string; spec: Spec };

export const generativeSamples: GenerativeSample[] = [
  {
    id: "over-quota",
    label: "Over quota",
    prompt: "I'm over my event quota. Show my usage and how to upgrade.",
    spec: overQuotaSpec,
  },
  {
    id: "credits",
    label: "Credits",
    prompt: "How much credit do I have left? Let me top up.",
    spec: creditsSpec,
  },
  {
    id: "keys",
    label: "Keys",
    prompt: "Show my API keys so I can rotate or revoke one.",
    spec: keysSpec,
  },
];

export function findGenerativeSample(id: string): GenerativeSample {
  return (
    generativeSamples.find((sample) => sample.id === id) ??
    (generativeSamples[0] as GenerativeSample)
  );
}

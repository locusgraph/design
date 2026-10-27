import { blockComponents } from "./blocks";
import { layoutComponents } from "./layout";

export const locusComponents = { ...layoutComponents, ...blockComponents };

export type LocusComponentName = keyof typeof locusComponents;

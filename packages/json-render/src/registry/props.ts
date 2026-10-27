import type { BaseComponentProps } from "@json-render/react";
import type { z } from "zod";
import { type LocusComponentName, locusComponents } from "../catalog/index";

export type LocusProps<K extends LocusComponentName> = z.output<
  (typeof locusComponents)[K]["props"]
>;

export type LocusRendererProps<K extends LocusComponentName> = BaseComponentProps<LocusProps<K>>;

export const locusComponentNames = Object.keys(locusComponents) as LocusComponentName[];

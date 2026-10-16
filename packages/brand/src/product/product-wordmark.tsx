import type * as React from "react";
import { LocusGraphWordmark } from "../wordmark";
import { SpendGraphWordmark } from "./spendgraph-wordmark";

export type Product = "locusgraph" | "spendgraph";

export const productNames: Record<Product, string> = {
  locusgraph: "LocusGraph",
  spendgraph: "SpendGraph",
};

type ProductWordmarkProps = React.ComponentProps<"span"> & {
  product: Product;
  withMark?: boolean;
};

export function ProductWordmark({ product, ...props }: ProductWordmarkProps) {
  return product === "spendgraph" ? (
    <SpendGraphWordmark {...props} />
  ) : (
    <LocusGraphWordmark {...props} />
  );
}

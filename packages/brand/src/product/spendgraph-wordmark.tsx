import type * as React from "react";
import { LocusGraphMark } from "../locusgraph-mark";

type SpendGraphWordmarkProps = React.ComponentProps<"span"> & {
  withMark?: boolean;
};

export function SpendGraphWordmark({
  withMark = false,
  className,
  ...props
}: SpendGraphWordmarkProps) {
  return (
    <span
      data-slot="spendgraph-wordmark"
      className={["inline-flex items-center gap-2 font-brand", className].filter(Boolean).join(" ")}
      {...props}
    >
      {withMark && <LocusGraphMark className="size-[1.1em]" />}
      <span>
        <span className="font-bold">spend</span>
        <span className="font-light">graph</span>
      </span>
    </span>
  );
}

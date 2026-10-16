import type * as React from "react";
import { LocusGraphMark } from "./locusgraph-mark";

type LocusGraphWordmarkProps = React.ComponentProps<"span"> & {
  withMark?: boolean;
};

export function LocusGraphWordmark({
  withMark = false,
  className,
  ...props
}: LocusGraphWordmarkProps) {
  return (
    <span
      data-slot="locusgraph-wordmark"
      className={["inline-flex items-center gap-2 font-brand", className].filter(Boolean).join(" ")}
      {...props}
    >
      {withMark && <LocusGraphMark className="size-[1.1em]" />}
      <span>
        <span className="font-bold">locus</span>
        <span className="font-light">graph</span>
      </span>
    </span>
  );
}

import type * as React from "react";
import { RuleGrid, RuleGridCell } from "../../rule-grid/rule-grid";
import { SkeletonBar, SkeletonLoadingLabel, skeletonRootProps } from "../skeleton-parts";

type SkeletonRuleGridProps = Omit<React.ComponentProps<typeof RuleGrid>, "children"> & {
  cells?: number;
  label?: string;
};

function SkeletonRuleGrid({ cells = 3, columns = 3, label, ...props }: SkeletonRuleGridProps) {
  const count = Math.max(1, Math.floor(cells));
  return (
    <RuleGrid data-slot="skeleton-rule-grid" columns={columns} {...skeletonRootProps} {...props}>
      {Array.from({ length: count }, (_, index) => (
        <RuleGridCell
          // biome-ignore lint/suspicious/noArrayIndexKey: placeholder cells have no identity
          key={index}
          data-slot="skeleton-rule-grid-cell"
          aria-hidden="true"
          className="gap-3"
        >
          <SkeletonBar className="h-3 w-20" />
          <SkeletonBar className="h-7 w-28" />
        </RuleGridCell>
      ))}
      <SkeletonLoadingLabel>{label}</SkeletonLoadingLabel>
    </RuleGrid>
  );
}

export { SkeletonRuleGrid };

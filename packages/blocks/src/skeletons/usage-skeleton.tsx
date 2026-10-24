import {
  RuleGrid,
  RuleGridCell,
  RuleGridLabel,
  SkeletonBar,
  SkeletonLoadingLabel,
  skeletonRootProps,
} from "@locusgraph/components";

type UsageSkeletonProps = {
  quotas?: number;
  label?: string;
};

function QuotaSkeleton() {
  return (
    <div data-slot="quota-skeleton" aria-hidden="true" className="flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <SkeletonBar className="h-4 w-28" />
        <SkeletonBar className="h-4 w-36" />
      </div>
      <SkeletonBar className="h-2 w-full rounded-full" />
    </div>
  );
}

export function UsageSkeleton({ quotas = 2, label = "Usage" }: UsageSkeletonProps) {
  const count = Math.max(1, Math.floor(quotas));
  return (
    <RuleGrid columns={1} data-slot="usage-skeleton" {...skeletonRootProps}>
      <RuleGridCell className="gap-5">
        <RuleGridLabel>{label}</RuleGridLabel>
        {Array.from({ length: count }, (_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: placeholder meters have no identity
          <QuotaSkeleton key={index} />
        ))}
        <SkeletonLoadingLabel>Loading usage…</SkeletonLoadingLabel>
      </RuleGridCell>
    </RuleGrid>
  );
}

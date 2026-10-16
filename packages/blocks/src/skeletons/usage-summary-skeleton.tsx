import {
  RuleGrid,
  RuleGridCell,
  RuleGridLabel,
  SkeletonBar,
  SkeletonLoadingLabel,
  skeletonRootProps,
} from "@locusgraph/components";

type UsageSummarySkeletonProps = {
  quotas?: number;
  label?: string;
};

function QuotaMeterSkeleton() {
  return (
    <div data-slot="quota-meter-skeleton" aria-hidden="true" className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <SkeletonBar className="h-4 w-28" />
        <SkeletonBar className="h-4 w-36" />
      </div>
      <SkeletonBar className="h-2 w-full rounded-full" />
    </div>
  );
}

export function UsageSummarySkeleton({ quotas = 2, label = "Usage" }: UsageSummarySkeletonProps) {
  const count = Math.max(1, Math.floor(quotas));
  return (
    <RuleGrid columns={1} data-slot="usage-summary-skeleton" {...skeletonRootProps}>
      <RuleGridCell className="gap-5">
        <RuleGridLabel>{label}</RuleGridLabel>
        {Array.from({ length: count }, (_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: placeholder meters have no identity
          <QuotaMeterSkeleton key={index} />
        ))}
        <SkeletonLoadingLabel>Loading usage…</SkeletonLoadingLabel>
      </RuleGridCell>
    </RuleGrid>
  );
}

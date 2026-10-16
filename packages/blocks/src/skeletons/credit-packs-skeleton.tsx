import {
  RuleGridCell,
  RuleGridLabel,
  SkeletonBar,
  SkeletonLoadingLabel,
  skeletonRootProps,
} from "@locusgraph/components";

type CreditPacksSkeletonProps = {
  packs?: number;
};

export function CreditPacksSkeleton({ packs = 3 }: CreditPacksSkeletonProps) {
  const count = Math.max(1, Math.floor(packs));
  return (
    <RuleGridCell data-slot="credit-packs-skeleton" {...skeletonRootProps} className="gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="flex min-h-6 items-center">
          <RuleGridLabel>Buy credits</RuleGridLabel>
        </span>
        <SkeletonBar className="h-4 w-full max-w-72" />
        <SkeletonBar className="h-4 w-3/4 max-w-56" />
      </div>
      <div className="flex flex-wrap gap-2" aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <SkeletonBar
            // biome-ignore lint/suspicious/noArrayIndexKey: placeholder packs have no identity
            key={index}
            data-slot="credit-pack-skeleton"
            className="h-9 w-24 rounded-full"
          />
        ))}
      </div>
      <SkeletonLoadingLabel>Loading credit packs…</SkeletonLoadingLabel>
    </RuleGridCell>
  );
}

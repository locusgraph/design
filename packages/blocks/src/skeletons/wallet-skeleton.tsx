import {
  RuleGridCell,
  RuleGridLabel,
  SkeletonBar,
  SkeletonLoadingLabel,
  skeletonRootProps,
} from "@locusgraph/components";

type WalletSkeletonProps = {
  grants?: number;
};

export function WalletSkeleton({ grants = 1 }: WalletSkeletonProps) {
  const count = Math.max(0, Math.floor(grants));
  return (
    <RuleGridCell data-slot="wallet-skeleton" {...skeletonRootProps} className="gap-4">
      <span className="flex min-h-6 items-center justify-between">
        <RuleGridLabel>Prepaid credits</RuleGridLabel>
      </span>
      <div className="flex flex-col gap-1" aria-hidden="true">
        <SkeletonBar className="h-9 w-32" />
      </div>
      <ul className="flex flex-col divide-y divide-border" aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: placeholder grants have no identity
            key={index}
            data-slot="wallet-grant-skeleton"
            className="flex justify-between gap-4 py-2"
          >
            <SkeletonBar className="h-4 w-24" />
            <SkeletonBar className="h-4 w-40" />
          </li>
        ))}
      </ul>
      <SkeletonLoadingLabel>Loading credits…</SkeletonLoadingLabel>
    </RuleGridCell>
  );
}

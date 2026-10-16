import {
  RuleGridCell,
  RuleGridLabel,
  SkeletonBar,
  SkeletonLoadingLabel,
  skeletonRootProps,
} from "@locusgraph/components";

type WalletPanelSkeletonProps = {
  grants?: number;
};

export function WalletPanelSkeleton({ grants = 1 }: WalletPanelSkeletonProps) {
  const count = Math.max(0, Math.floor(grants));
  return (
    <RuleGridCell data-slot="wallet-panel-skeleton" {...skeletonRootProps} className="gap-4">
      <span className="flex items-center justify-between">
        <RuleGridLabel>Prepaid credits</RuleGridLabel>
      </span>
      <div className="flex flex-col gap-1" aria-hidden="true">
        <SkeletonBar className="h-9 w-32" />
      </div>
      <ul className="flex flex-col divide-y divide-line" aria-hidden="true">
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

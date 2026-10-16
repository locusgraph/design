import {
  RuleGrid,
  RuleGridCell,
  SkeletonBar,
  SkeletonLoadingLabel,
  skeletonRootProps,
} from "@locusgraph/components";

type PlanOptionsSkeletonProps = {
  plans?: number;
  points?: number;
  currentIndex?: number;
};

export function PlanOptionsSkeleton({
  plans = 2,
  points = 2,
  currentIndex = 0,
}: PlanOptionsSkeletonProps) {
  const planCount = Math.max(1, Math.floor(plans));
  const pointCount = Math.max(0, Math.floor(points));
  return (
    <RuleGrid
      columns={planCount >= 3 ? 3 : 2}
      data-slot="plan-options-skeleton"
      {...skeletonRootProps}
    >
      {Array.from({ length: planCount }, (_, plan) => (
        <RuleGridCell
          // biome-ignore lint/suspicious/noArrayIndexKey: placeholder plans have no identity
          key={plan}
          data-slot="plan-option-skeleton"
          aria-hidden="true"
          className="gap-4"
        >
          <div className="flex flex-col gap-2">
            <div className="flex min-h-6 items-center">
              <SkeletonBar className="h-5 w-20" />
            </div>
            <SkeletonBar className="h-8 w-28" />
          </div>
          <div className="flex flex-col gap-1.5">
            {Array.from({ length: pointCount }, (_, point) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: placeholder points have no identity
              <SkeletonBar key={point} className="h-4 w-40" />
            ))}
          </div>
          {plan === currentIndex ? (
            <div className="mt-auto flex min-h-8 items-center">
              <SkeletonBar className="h-4 w-16" />
            </div>
          ) : (
            <SkeletonBar className="mt-auto h-8 w-28 rounded-full" />
          )}
        </RuleGridCell>
      ))}
      <SkeletonLoadingLabel>Loading plans…</SkeletonLoadingLabel>
    </RuleGrid>
  );
}

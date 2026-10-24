import { RuleGridLabel } from "@locusgraph/components";
import { Context, Cost, type RunUsage } from "@locusgraph/loop";

type ChatRailProps = {
  usage: RunUsage[];
  usedTokens: number;
  limitTokens: number;
};

export function ChatRail({ usage, usedTokens, limitTokens }: ChatRailProps) {
  return (
    <aside
      aria-label="Run details"
      className="hidden w-72 shrink-0 flex-col divide-y divide-border border-l bg-card lg:flex"
    >
      <div className="flex min-h-11 items-center px-4">
        <RuleGridLabel>Run</RuleGridLabel>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <Cost usage={usage} variant="detailed" />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <Context usedTokens={usedTokens} limitTokens={limitTokens} />
      </div>
    </aside>
  );
}

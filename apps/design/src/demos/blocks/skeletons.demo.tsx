import {
  KeysSkeleton,
  PlansSkeleton,
  TopUpSkeleton,
  UsageSkeleton,
  WalletSkeleton,
} from "@locusgraph/blocks";
import { RuleGrid, RuleGridCell } from "@locusgraph/components";
import { defineDemo, select } from "../../registry/define-demo";

const blocks = ["usage", "wallet", "plans", "keys"] as const;

type Block = (typeof blocks)[number];

function renderBlock(block: Block) {
  const skeletons = {
    usage: <UsageSkeleton quotas={2} />,
    wallet: (
      <RuleGrid columns={2}>
        <WalletSkeleton />
        <TopUpSkeleton />
      </RuleGrid>
    ),
    plans: <PlansSkeleton plans={2} />,
    keys: (
      <RuleGrid columns={1}>
        <RuleGridCell className="p-0">
          <KeysSkeleton rows={3} actions />
        </RuleGridCell>
      </RuleGrid>
    ),
  };
  return <div className="w-full max-w-3xl">{skeletons[block]}</div>;
}

const blockCode = {
  usage: "<UsageSkeleton quotas={2} />",
  wallet: "<RuleGrid columns={2}>\n  <WalletSkeleton />\n  <TopUpSkeleton />\n</RuleGrid>",
  plans: "<PlansSkeleton plans={2} />",
  keys: "<KeysSkeleton rows={3} actions />",
} as const;

function Usage() {
  return (
    <div className="w-full max-w-xl">
      <UsageSkeleton quotas={3} />
    </div>
  );
}

function Wallet() {
  return (
    <RuleGrid columns={2} className="w-full max-w-3xl">
      <WalletSkeleton grants={2} />
      <TopUpSkeleton packs={3} />
    </RuleGrid>
  );
}

function Plans() {
  return (
    <div className="w-full max-w-3xl">
      <PlansSkeleton plans={3} points={3} />
    </div>
  );
}

function Keys() {
  return (
    <div className="w-full max-w-3xl">
      <RuleGrid columns={1}>
        <RuleGridCell className="p-0">
          <KeysSkeleton rows={4} actions />
        </RuleGridCell>
      </RuleGrid>
    </div>
  );
}

export default defineDemo({
  title: "Skeletons",
  description:
    "Loading placeholders with the same outer shape and spacing as Usage, Wallet, TopUp, Plans and Keys. WalletSkeleton and TopUpSkeleton are Rule Grid cells, so they share a row. From @locusgraph/blocks.",
  controls: { block: select(blocks) },
  playground: ({ block }) => renderBlock(block),
  code: ({ block }) => blockCode[block],
  props: [
    { name: "UsageSkeleton.quotas", type: "number", defaultValue: "2" },
    { name: "WalletSkeleton.grants", type: "number", defaultValue: "1" },
    { name: "TopUpSkeleton.packs", type: "number", defaultValue: "3" },
    { name: "PlansSkeleton.plans", type: "number", defaultValue: "2" },
    { name: "PlansSkeleton.points", type: "number", defaultValue: "2" },
    { name: "KeysSkeleton.rows", type: "number", defaultValue: "3" },
    { name: "KeysSkeleton.actions", type: "boolean", defaultValue: "false" },
    { name: "PlansSkeleton.currentIndex", type: "number", defaultValue: "0" },
  ],
  examples: {
    Usage: { description: "Three quota meters while usage loads.", component: Usage },
    Wallet: {
      description: "Wallet and TopUp side by side in one Rule Grid.",
      component: Wallet,
    },
    Plans: { description: "Three plan cells use the three-column grid.", component: Plans },
    Keys: { description: "The API key table with its real headers.", component: Keys },
  },
  isNew: true,
});

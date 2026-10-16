import {
  CreditPacksSkeleton,
  KeysTableSkeleton,
  PlanOptionsSkeleton,
  UsageSummarySkeleton,
  WalletPanelSkeleton,
} from "@locusgraph/blocks";
import { RuleGrid, RuleGridCell } from "@locusgraph/components";
import { defineDemo, select } from "../../registry/define-demo";

const blocks = ["usage", "wallet", "plans", "keys"] as const;

type Block = (typeof blocks)[number];

function renderBlock(block: Block) {
  const skeletons = {
    usage: <UsageSummarySkeleton quotas={2} />,
    wallet: (
      <RuleGrid columns={2}>
        <WalletPanelSkeleton />
        <CreditPacksSkeleton />
      </RuleGrid>
    ),
    plans: <PlanOptionsSkeleton plans={2} />,
    keys: (
      <RuleGrid columns={1}>
        <RuleGridCell className="p-0">
          <KeysTableSkeleton rows={3} actions />
        </RuleGridCell>
      </RuleGrid>
    ),
  };
  return <div className="w-full max-w-3xl">{skeletons[block]}</div>;
}

const blockCode = {
  usage: "<UsageSummarySkeleton quotas={2} />",
  wallet:
    "<RuleGrid columns={2}>\n  <WalletPanelSkeleton />\n  <CreditPacksSkeleton />\n</RuleGrid>",
  plans: "<PlanOptionsSkeleton plans={2} />",
  keys: "<KeysTableSkeleton rows={3} actions />",
} as const;

function Usage() {
  return (
    <div className="w-full max-w-xl">
      <UsageSummarySkeleton quotas={3} />
    </div>
  );
}

function Wallet() {
  return (
    <RuleGrid columns={2} className="w-full max-w-3xl">
      <WalletPanelSkeleton grants={2} />
      <CreditPacksSkeleton packs={3} />
    </RuleGrid>
  );
}

function Plans() {
  return (
    <div className="w-full max-w-3xl">
      <PlanOptionsSkeleton plans={3} points={3} />
    </div>
  );
}

function Keys() {
  return (
    <div className="w-full max-w-3xl">
      <RuleGrid columns={1}>
        <RuleGridCell className="p-0">
          <KeysTableSkeleton rows={4} actions />
        </RuleGridCell>
      </RuleGrid>
    </div>
  );
}

export default defineDemo({
  title: "Block Skeletons",
  description:
    "Loading placeholders with the same outer shape and spacing as the usage, wallet, credit pack, plan and API key blocks. Wallet and packs skeletons are Rule Grid cells, so they share a row. From @locusgraph/blocks.",
  controls: { block: select(blocks) },
  playground: ({ block }) => renderBlock(block),
  code: ({ block }) => blockCode[block],
  props: [
    { name: "UsageSummarySkeleton.quotas", type: "number", defaultValue: "2" },
    { name: "WalletPanelSkeleton.grants", type: "number", defaultValue: "1" },
    { name: "CreditPacksSkeleton.packs", type: "number", defaultValue: "3" },
    { name: "PlanOptionsSkeleton.plans", type: "number", defaultValue: "2" },
    { name: "PlanOptionsSkeleton.points", type: "number", defaultValue: "2" },
    { name: "KeysTableSkeleton.rows", type: "number", defaultValue: "3" },
    { name: "KeysTableSkeleton.actions", type: "boolean", defaultValue: "false" },
    { name: "PlanOptionsSkeleton.currentIndex", type: "number", defaultValue: "0" },
  ],
  examples: {
    Usage: { description: "Three quota meters while usage loads.", component: Usage },
    Wallet: {
      description: "The wallet and credit packs side by side in one Rule Grid.",
      component: Wallet,
    },
    Plans: { description: "Three plan cells use the three-column grid.", component: Plans },
    Keys: { description: "The API key table with its real headers.", component: Keys },
  },
  isNew: true,
});

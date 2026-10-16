import {
  RuleGrid,
  RuleGridCell,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonRuleGrid,
  SkeletonTable,
  SkeletonText,
} from "@locusgraph/components";
import { defineDemo, select } from "../../../registry/define-demo";

const kinds = ["text", "avatar", "button", "table", "rule-grid"] as const;
const amounts = ["2", "3", "4"] as const;
const sizes = { 2: "sm", 3: "md", 4: "lg" } as const;
const buttonSizes = { 2: "sm", 3: "default", 4: "lg" } as const;

type Kind = (typeof kinds)[number];
type Amount = (typeof amounts)[number];

function renderLoader(kind: Kind, amount: Amount) {
  const value = Number(amount) as 2 | 3 | 4;
  const loaders = {
    text: <SkeletonText lines={value} className="w-80" />,
    avatar: <SkeletonAvatar size={sizes[value]} />,
    button: <SkeletonButton size={buttonSizes[value]} />,
    table: <SkeletonTable rows={value} columns={4} />,
    "rule-grid": <SkeletonRuleGrid cells={value} columns={value} className="w-full max-w-3xl" />,
  };
  return loaders[kind];
}

function loaderCode(kind: Kind, amount: Amount) {
  const value = Number(amount) as 2 | 3 | 4;
  const code = {
    text: `<SkeletonText lines={${value}} />`,
    avatar: `<SkeletonAvatar size="${sizes[value]}" />`,
    button: `<SkeletonButton size="${buttonSizes[value]}" />`,
    table: `<SkeletonTable rows={${value}} columns={4} />`,
    "rule-grid": `<SkeletonRuleGrid cells={${value}} columns={${value}} />`,
  };
  return code[kind];
}

function MemberRow() {
  return (
    <div className="flex w-80 items-center gap-4">
      <SkeletonAvatar size="lg" />
      <SkeletonText lines={2} label="Loading member" />
    </div>
  );
}

function PanelWithAction() {
  return (
    <RuleGrid columns={1} className="w-80">
      <RuleGridCell className="gap-4">
        <SkeletonText lines={3} />
        <SkeletonButton size="sm" />
      </RuleGridCell>
    </RuleGrid>
  );
}

function InvoiceTable() {
  return <SkeletonTable rows={3} columns={4} label="Loading invoices" />;
}

function StatGrid() {
  return <SkeletonRuleGrid cells={4} columns={4} className="w-full max-w-3xl" />;
}

export default defineDemo({
  title: "Skeleton Loaders",
  description:
    "Ready-made loading placeholders built on Skeleton: text, avatar, pill button, table and Rule Grid. Each announces loading once to screen readers and stops pulsing under reduced motion.",
  controls: { kind: select(kinds), amount: select(amounts, "3") },
  playground: ({ kind, amount }) => renderLoader(kind, amount),
  code: ({ kind, amount }) => loaderCode(kind, amount),
  props: [
    { name: "SkeletonText.lines", type: "number", defaultValue: "3" },
    { name: "SkeletonAvatar.size", type: '"sm" | "md" | "lg"', defaultValue: '"md"' },
    { name: "SkeletonButton.size", type: '"sm" | "default" | "lg"', defaultValue: '"default"' },
    { name: "SkeletonTable.rows", type: "number", defaultValue: "5" },
    { name: "SkeletonTable.columns", type: "number", defaultValue: "4" },
    { name: "SkeletonRuleGrid.cells", type: "number", defaultValue: "3" },
    { name: "SkeletonRuleGrid.columns", type: "1 | 2 | 3 | 4", defaultValue: "3" },
    { name: "label", type: "string", defaultValue: '"Loading…"' },
  ],
  examples: {
    MemberRow: {
      description: "An avatar beside two lines while a member list loads.",
      component: MemberRow,
    },
    PanelWithAction: {
      description: "Text and a pill button inside a Rule Grid cell.",
      component: PanelWithAction,
    },
    InvoiceTable: {
      description: "A table placeholder with the same header and cell spacing as Table.",
      component: InvoiceTable,
    },
    StatGrid: {
      description: "Label and value bars in each cell of a Rule Grid.",
      component: StatGrid,
    },
  },
  isNew: true,
});

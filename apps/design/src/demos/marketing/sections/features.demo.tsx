import { RuleGrid, RuleGridCell, RuleGridTitle } from "@locusgraph/components";
import { FeatureRows, Features } from "@locusgraph/marketing";
import {
  Brain as BrainIcon,
  CheckCircle as CheckCircleIcon,
  CurrencyDollar as CurrencyDollarIcon,
  Lightning as LightningIcon,
  ShieldCheck as ShieldCheckIcon,
  Timer as TimerIcon,
} from "@phosphor-icons/react/ssr";
import { defineDemo, select } from "../../../registry/define-demo";

const columnOptions = ["2", "3", "4"] as const;

const items = [
  {
    icon: <CurrencyDollarIcon weight="bold" />,
    title: "Priced before it runs",
    description: "Every agent step shows its cost before anyone approves it.",
  },
  {
    icon: <CheckCircleIcon weight="bold" />,
    title: "Approved by a person",
    description: "Risky actions wait for a human, with the reason in plain words.",
  },
  {
    icon: <BrainIcon weight="bold" />,
    title: "Remembered",
    description: "Decisions and preferences carry over to the next run.",
  },
  {
    icon: <ShieldCheckIcon weight="bold" />,
    title: "Scoped keys",
    description: "Each agent gets only the access its task needs.",
  },
  {
    icon: <TimerIcon weight="bold" />,
    title: "Budgets that stop",
    description: "Runs pause when they reach the limit you set.",
  },
  {
    icon: <LightningIcon weight="bold" />,
    title: "Fast to adopt",
    description: "Drop the components into an existing React app.",
  },
];

function Panel({ label, value }: { label: string; value: string }) {
  return (
    <RuleGrid columns={1}>
      <RuleGridCell>
        <RuleGridTitle>{label}</RuleGridTitle>
        <p className="font-mono text-2xl tabular-nums">{value}</p>
      </RuleGridCell>
    </RuleGrid>
  );
}

function AlternatingRows() {
  return (
    <FeatureRows
      rows={[
        {
          eyebrow: "Spend",
          title: "See the cost of every run",
          description: "Each step is priced as it happens, so nothing arrives as a surprise.",
          media: <Panel label="This month" value="$1,284.20" />,
          actions: [{ label: "How pricing works", href: "#pricing", variant: "outline" }],
        },
        {
          eyebrow: "Approvals",
          title: "Approve what matters",
          description: "Agents wait for a person before they spend, send or delete.",
          media: <Panel label="Waiting" value="3" />,
        },
      ]}
    />
  );
}

export default defineDemo({
  title: "Features",
  description:
    "What the product does, as a ruled grid of short items, or as rows that alternate text and media with `FeatureRows`.",
  controls: { columns: select(columnOptions, "3") },
  playground: ({ columns }) => (
    <Features
      eyebrow="Features"
      title="Agents you can trust with money"
      description="Everything a team needs to let agents act, without losing track."
      columns={Number(columns) as 2 | 3 | 4}
      items={items.slice(0, columns === "4" ? 4 : 6)}
    />
  ),
  code: ({ columns }) => `<Features
  eyebrow="Features"
  title="Agents you can trust with money"
  columns={${columns}}
  items={[
    { icon: <CurrencyDollarIcon weight="bold" />, title: "Priced before it runs", description: "…" },
  ]}
/>`,
  props: [
    { name: "Features.items", type: "{ title, description?, icon? }[]" },
    { name: "Features.columns", type: "2 | 3 | 4", defaultValue: "3" },
    { name: "FeatureRows.rows", type: "{ eyebrow?, title, description?, media, actions? }[]" },
    { name: "eyebrow, title, description", type: "ReactNode", defaultValue: "the section heading" },
    { name: "align", type: '"start" | "center"', defaultValue: '"start"' },
    { name: "id", type: "string", defaultValue: "anchor for navbar links" },
  ],
  examples: {
    AlternatingRows: {
      description: "`FeatureRows`: text beside media, switching sides every row on large screens.",
      component: AlternatingRows,
    },
  },
  previewHeight: "tall",
  isNew: true,
});

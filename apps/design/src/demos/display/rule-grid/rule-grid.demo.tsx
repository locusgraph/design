import {
  Button,
  RuleGrid,
  RuleGridCell,
  RuleGridDescription,
  RuleGridFooter,
  RuleGridHeader,
  RuleGridLabel,
  RuleGridTitle,
} from "@locusgraph/components";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const features = [
  {
    code: "01",
    title: "Identity",
    description: "Google and GitHub sign in, one account for every product.",
  },
  {
    code: "02",
    title: "Billing",
    description: "Stripe subscriptions with plans from one catalog.",
  },
  { code: "03", title: "Entitlements", description: "Each product checks what an org may use." },
  {
    code: "04",
    title: "Metering",
    description: "Usage arrives in batches and never counts twice.",
  },
  {
    code: "05",
    title: "Wallets",
    description: "Prepaid balances in micro-USD for LLM operations.",
  },
  { code: "06", title: "Organizations", description: "Members, invitations and roles per org." },
];

const columnOptions = ["1", "2", "3", "4"] as const;

function toColumns(value: (typeof columnOptions)[number]) {
  return Number(value) as 1 | 2 | 3 | 4;
}

function Stats() {
  return (
    <RuleGrid columns={4} className="w-full max-w-3xl">
      {[
        ["API calls", "128,402"],
        ["Seats", "10"],
        ["Wallet", "$42.18"],
        ["Uptime", "99.98%"],
      ].map(([label, value]) => (
        <RuleGridCell key={label}>
          <RuleGridLabel>{label}</RuleGridLabel>
          <span className="text-2xl font-semibold tracking-[-0.02em]">{value}</span>
        </RuleGridCell>
      ))}
    </RuleGrid>
  );
}

function LinkCells() {
  return (
    <RuleGrid columns={3} className="w-full max-w-3xl">
      {features.slice(0, 3).map((feature) => (
        <RuleGridCell key={feature.code} asChild interactive>
          <a href={`#${feature.title.toLowerCase()}`}>
            <RuleGridLabel>{feature.code}</RuleGridLabel>
            <RuleGridTitle>{feature.title}</RuleGridTitle>
            <RuleGridDescription>{feature.description}</RuleGridDescription>
          </a>
        </RuleGridCell>
      ))}
    </RuleGrid>
  );
}

function SpanningCell() {
  return (
    <RuleGrid columns={3} className="w-full max-w-3xl">
      <RuleGridCell className="sm:col-span-2">
        <RuleGridLabel>Featured</RuleGridLabel>
        <RuleGridTitle>One platform for LocusGraph and SpendGraph</RuleGridTitle>
        <RuleGridDescription>A cell can span columns with a col-span class.</RuleGridDescription>
      </RuleGridCell>
      <RuleGridCell>
        <RuleGridLabel>04</RuleGridLabel>
        <RuleGridTitle>Metering</RuleGridTitle>
      </RuleGridCell>
    </RuleGrid>
  );
}

function HeaderAndFooter() {
  return (
    <RuleGrid columns={2} className="w-[36rem] max-w-full">
      {["Starter", "Team"].map((plan) => (
        <RuleGridCell key={plan} className="min-h-56">
          <RuleGridHeader>
            <RuleGridLabel>{plan}</RuleGridLabel>
          </RuleGridHeader>
          <RuleGridTitle>{plan === "Team" ? "$40 per seat" : "Free"}</RuleGridTitle>
          <RuleGridDescription>
            Solid surface for content, a quiet strip for actions.
          </RuleGridDescription>
          <RuleGridFooter>
            <Button size="sm" variant={plan === "Team" ? "default" : "outline"}>
              Choose {plan}
            </Button>
          </RuleGridFooter>
        </RuleGridCell>
      ))}
    </RuleGrid>
  );
}

export default defineDemo({
  title: "Rule Grid",
  description:
    "Square cells that share one hairline, drawn with rules instead of cards. Use it for feature lists, stats and catalogs on docs and marketing pages.",
  controls: {
    columns: select(columnOptions, "3"),
    interactive: toggle(false),
    labels: toggle(true),
  },
  playground: ({ columns, interactive, labels }) => (
    <RuleGrid columns={toColumns(columns)} className="w-full max-w-3xl">
      {features.map((feature) => (
        <RuleGridCell
          key={feature.code}
          interactive={interactive}
          tabIndex={interactive ? 0 : undefined}
        >
          {labels ? <RuleGridLabel>{feature.code}</RuleGridLabel> : null}
          <RuleGridTitle>{feature.title}</RuleGridTitle>
          <RuleGridDescription>{feature.description}</RuleGridDescription>
        </RuleGridCell>
      ))}
    </RuleGrid>
  ),
  code: ({ columns, interactive, labels }) =>
    `<RuleGrid columns={${columns}}>\n  <RuleGridCell${interactive ? " interactive" : ""}>${labels ? "\n    <RuleGridLabel>01</RuleGridLabel>" : ""}\n    <RuleGridTitle>Identity</RuleGridTitle>\n    <RuleGridDescription>Google and GitHub sign in.</RuleGridDescription>\n  </RuleGridCell>\n</RuleGrid>`,
  props: [
    { name: "columns", type: "1 | 2 | 3 | 4", defaultValue: "3" },
    { name: "RuleGridCell.interactive", type: "boolean", defaultValue: "false" },
    { name: "RuleGridCell.asChild", type: "boolean", defaultValue: "false" },
    { name: "className", type: "string" },
  ],
  examples: {
    Stats: {
      description: "Four stats in one row with mono labels above the numbers.",
      component: Stats,
    },
    LinkCells: {
      description: "Cells rendered as links with asChild, with hover and keyboard focus.",
      component: LinkCells,
    },
    SpanningCell: {
      description: "A featured cell spans two columns; the hairlines stay single.",
      component: SpanningCell,
    },
    HeaderAndFooter: {
      description:
        "RuleGridHeader and RuleGridFooter run edge to edge. The header is a light tint, the footer a stronger one for actions.",
      component: HeaderAndFooter,
    },
  },
  composition: {
    name: "RuleGrid",
    children: [
      {
        name: "RuleGridCell",
        children: [
          { name: "RuleGridHeader" },
          { name: "RuleGridLabel" },
          { name: "RuleGridTitle" },
          { name: "RuleGridDescription" },
          { name: "RuleGridFooter" },
        ],
      },
    ],
  },
  isNew: true,
});

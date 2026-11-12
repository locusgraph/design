import { Badge, RuleGrid, RuleGridCell, RuleGridTitle } from "@locusgraph/components";
import { Hero } from "@locusgraph/marketing";
import { defineDemo, select } from "../../../registry/define-demo";

const layouts = ["centered", "split"] as const;

const actions = [
  { label: "Start free", href: "#start" },
  { label: "Read the docs", href: "#docs" },
];

function ProductShot() {
  return (
    <RuleGrid columns={2}>
      <RuleGridCell>
        <RuleGridTitle>Agent spend</RuleGridTitle>
        <p className="font-mono text-2xl tabular-nums">$1,284.20</p>
        <Badge variant="outline">this month</Badge>
      </RuleGridCell>
      <RuleGridCell>
        <RuleGridTitle>Approvals waiting</RuleGridTitle>
        <p className="font-mono text-2xl text-warn tabular-nums">3</p>
        <Badge variant="outline">2 over budget</Badge>
      </RuleGridCell>
    </RuleGrid>
  );
}

function WithEyebrow() {
  return (
    <Hero
      eyebrow="Now in beta"
      title="Every agent run, priced"
      description="See what each run costs before you approve it."
      actions={actions}
    />
  );
}

export default defineDemo({
  title: "Hero",
  description:
    "The opening section of a landing page: the page heading, a line of copy and up to two actions, centered or split beside a product screenshot or video.",
  controls: { layout: select(layouts, "split") },
  playground: ({ layout }) => (
    <Hero
      layout={layout}
      title="Keep the human in the loop"
      description="Agents propose, people approve. Every step is priced and remembered."
      actions={actions}
      media={<ProductShot />}
    />
  ),
  code: ({ layout }) => `<Hero
  layout="${layout}"
  title="Keep the human in the loop"
  description="Agents propose, people approve."
  actions={[
    { label: "Start free", href: "/signup" },
    { label: "Read the docs", href: "/docs" },
  ]}
  media={<Screenshot />}
/>`,
  props: [
    { name: "title", type: "ReactNode", defaultValue: "rendered as the page h1" },
    { name: "description", type: "ReactNode" },
    { name: "eyebrow", type: "ReactNode" },
    {
      name: "actions",
      type: "{ label, href, variant? }[]",
      defaultValue: "first is primary, the rest outline",
    },
    { name: "media", type: "ReactNode", defaultValue: "screenshot, video or illustration" },
    { name: "layout", type: '"centered" | "split"', defaultValue: '"centered"' },
    { name: "linkComponent", type: 'LinkComponent | "a"', defaultValue: '"a"' },
  ],
  examples: {
    WithEyebrow: {
      description: "Centered with an eyebrow and no media.",
      component: WithEyebrow,
    },
  },
  previewHeight: "tall",
  isNew: true,
});

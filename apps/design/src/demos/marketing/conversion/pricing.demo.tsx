import { Pricing, type PricingPlan } from "@locusgraph/marketing";
import { defineDemo, select } from "../../../registry/define-demo";

const periods = ["monthly", "yearly"] as const;

const plans: PricingPlan[] = [
  {
    name: "Free",
    description: "For trying agents on one project.",
    price: "$0",
    priceNote: "Free forever",
    features: ["1 graph", "10,000 events a month", "Approvals by email"],
    action: { label: "Start free", href: "#start" },
  },
  {
    name: "Team",
    description: "For teams that let agents spend.",
    price: { monthly: "$29", yearly: "$290" },
    priceNote: "Per seat. Yearly is two months free.",
    features: ["10 graphs", "1M events a month", "Budgets that stop runs", "Audit log"],
    action: { label: "Start a trial", href: "#trial" },
    highlighted: true,
    badge: "Popular",
  },
  {
    name: "Scale",
    description: "For companies with many agents.",
    price: { monthly: "$99", yearly: "$990" },
    priceNote: "Per seat, billed with usage.",
    features: ["Unlimited graphs", "Volume pricing", "SSO and SCIM", "Priority support"],
    action: { label: "Talk to us", href: "#contact" },
  },
];

function FlatPrices() {
  return (
    <Pricing
      title="One price per plan"
      plans={[
        { ...(plans[0] as PricingPlan) },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Everything in Scale", "Your own region"],
          action: { label: "Talk to us", href: "#contact" },
        },
      ]}
    />
  );
}

export default defineDemo({
  title: "Pricing",
  description:
    "Plans side by side in a ruled grid, with a monthly and yearly toggle when a plan has both prices. Both prices are rendered on the server and the toggle only switches which one shows, so the page stays a server component.",
  controls: { defaultPeriod: select(periods, "monthly") },
  playground: ({ defaultPeriod }) => (
    <Pricing
      key={defaultPeriod}
      eyebrow="Pricing"
      title="Pay for what agents do"
      description="Start free. Upgrade when your agents need more."
      defaultPeriod={defaultPeriod}
      plans={plans}
    />
  ),
  code: ({ defaultPeriod }) => `<Pricing
  title="Pay for what agents do"
  defaultPeriod="${defaultPeriod}"
  plans={[
    { name: "Free", price: "$0", features: ["1 graph"], action: { label: "Start free", href: "/signup" } },
    {
      name: "Team",
      price: { monthly: "$29", yearly: "$290" },
      features: ["10 graphs", "Audit log"],
      action: { label: "Start a trial", href: "/signup?plan=team" },
      highlighted: true,
      badge: "Popular",
    },
  ]}
/>`,
  props: [
    {
      name: "plans",
      type: "{ name, description?, price, priceNote?, features?, action, highlighted?, badge? }[]",
    },
    { name: "plans[].price", type: "string | { monthly: string; yearly: string }" },
    { name: "defaultPeriod", type: '"monthly" | "yearly"', defaultValue: '"monthly"' },
    { name: "periodLabels", type: "{ monthly, yearly }", defaultValue: '"Monthly", "Yearly"' },
    { name: "cadence", type: "{ monthly, yearly }", defaultValue: '"/month", "/year"' },
    { name: "periodLabel", type: "string", defaultValue: '"Billing period"' },
    { name: "eyebrow, title, description", type: "ReactNode", defaultValue: "centered heading" },
    { name: "linkComponent", type: 'LinkComponent | "a"', defaultValue: '"a"' },
  ],
  examples: {
    FlatPrices: {
      description: "When every price is a single string, the toggle is left out.",
      component: FlatPrices,
    },
  },
  previewHeight: "tall",
  isNew: true,
});

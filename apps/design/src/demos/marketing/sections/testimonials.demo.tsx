import { Testimonials } from "@locusgraph/marketing";
import { defineDemo, select } from "../../../registry/define-demo";

const counts = ["one", "three"] as const;

function Initials({ name }: { name: string }) {
  return (
    <span className="flex size-full items-center justify-center font-heading text-sm font-medium">
      {name
        .split(" ")
        .map((part) => part[0])
        .join("")}
    </span>
  );
}

const testimonials = [
  {
    quote: "We let agents spend for the first time because every step shows its price first.",
    name: "Ada Okafor",
    role: "CTO, Northwind",
    avatar: <Initials name="Ada Okafor" />,
  },
  {
    quote: "Approvals take seconds. The reason is right there in the request.",
    name: "Lin Park",
    role: "Head of Ops, Globex",
    avatar: <Initials name="Lin Park" />,
  },
  {
    quote: "Budgets that actually stop a run saved us from one very bad weekend.",
    name: "Sam Reyes",
    role: "Founder, Acme",
    avatar: <Initials name="Sam Reyes" />,
  },
];

export default defineDemo({
  title: "Testimonials",
  description:
    "Quotes from customers. One quote is featured large and centered; two or more sit in a ruled grid.",
  controls: { count: select(counts, "three") },
  playground: ({ count }) => (
    <Testimonials
      title={count === "three" ? "Teams that let agents act" : undefined}
      testimonials={count === "one" ? testimonials.slice(0, 1) : testimonials}
    />
  ),
  code: () => `<Testimonials
  title="Teams that let agents act"
  testimonials={[
    { quote: "…", name: "Ada Okafor", role: "CTO, Northwind", avatar: <img src="/ada.jpg" alt="" /> },
  ]}
/>`,
  props: [
    { name: "testimonials", type: "{ quote, name, role?, avatar? }[]" },
    { name: "eyebrow, title, description", type: "ReactNode", defaultValue: "the section heading" },
    { name: "id", type: "string" },
  ],
  examples: {},
  previewHeight: "tall",
  isNew: true,
});

import { Checkmark as CheckIcon } from "@carbon/icons-react";
import { Badge } from "@locusgraph/components";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select, text } from "../../registry/define-demo";

const variants = [
  "default",
  "secondary",
  "success",
  "warning",
  "destructive-soft",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const;

function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive-soft">Destructive soft</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

function PlanStatus() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success">
        <CheckIcon />
        Active
      </Badge>
      <Badge variant="outline">Trial</Badge>
      <Badge variant="destructive-soft">Past due</Badge>
    </div>
  );
}

export default defineDemo({
  title: "Badge",
  description: "A short label for a status, a role or a count.",
  controls: { variant: select(variants), label: text("Owner") },
  playground: ({ variant, label }) => <Badge variant={variant}>{label}</Badge>,
  code: ({ variant, label }) =>
    `<Badge${formatProp("variant", variant, "default")}>${label}</Badge>`,
  props: [
    { name: "variant", type: variants.join(" | "), defaultValue: "default" },
    { name: "asChild", type: "boolean", defaultValue: "false" },
    { name: "...props", type: 'ComponentProps<"span">' },
  ],
  examples: {
    Variants,
    PlanStatus: {
      description: "Subscription states as they appear on the billing page.",
      component: PlanStatus,
    },
  },
});

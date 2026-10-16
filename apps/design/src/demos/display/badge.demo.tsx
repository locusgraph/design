import { Badge } from "@locusgraph/components";
import { CheckIcon } from "lucide-react";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select, text } from "../../registry/define-demo";

const variants = ["default", "secondary", "destructive", "outline", "ghost", "link"] as const;

function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

function PlanStatus() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="secondary">
        <CheckIcon />
        Active
      </Badge>
      <Badge variant="outline">Trial</Badge>
      <Badge variant="destructive">Past due</Badge>
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

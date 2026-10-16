import { Progress } from "@locusgraph/components";
import { defineDemo, select } from "../../../registry/define-demo";

const values = ["64", "0", "25", "50", "90", "100"] as const;

function UsageMeter() {
  return (
    <div className="w-72 space-y-2">
      <div className="flex justify-between text-sm">
        <span>API calls</span>
        <span className="text-muted-foreground">640k / 1M</span>
      </div>
      <Progress value={64} aria-label="API calls used" />
    </div>
  );
}

function Seats() {
  return (
    <div className="w-72 space-y-2">
      <div className="flex justify-between text-sm">
        <span>Seats</span>
        <span className="text-muted-foreground">9 of 10</span>
      </div>
      <Progress value={90} aria-label="Seats used" className="h-1.5" />
    </div>
  );
}

function Limits() {
  return (
    <div className="w-72 space-y-4 text-sm">
      <div className="space-y-2">
        <span>Storage</span>
        <Progress value={20} aria-label="Storage used" />
      </div>
      <div className="space-y-2">
        <span>Members</span>
        <Progress value={100} aria-label="Members used" />
      </div>
    </div>
  );
}

export default defineDemo({
  title: "Progress",
  description:
    "A bar that shows how far along something is. Use it for usage against a plan limit or a running task.",
  controls: { value: select(values) },
  playground: ({ value }) => (
    <Progress value={Number(value)} aria-label="API calls used" className="w-72" />
  ),
  code: ({ value }) => `<Progress value={${value}} aria-label="API calls used" />`,
  props: [
    { name: "value", type: "number | null" },
    { name: "max", type: "number", defaultValue: "100" },
    { name: "className", type: "string" },
  ],
  examples: {
    UsageMeter: {
      description: "Usage against the monthly plan limit, with a label.",
      component: UsageMeter,
    },
    Seats: { description: "A thinner bar set with a height class.", component: Seats },
    Limits: { description: "Several limits stacked in a settings panel.", component: Limits },
  },
});

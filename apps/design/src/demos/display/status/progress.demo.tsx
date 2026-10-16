import { Progress } from "@locusgraph/components";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select } from "../../../registry/define-demo";

const values = ["64", "0", "25", "50", "90", "100"] as const;
const tones = ["default", "auto", "good", "warn", "destructive"] as const;

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
        <span className="text-muted-foreground tabular-nums">9 of 10</span>
      </div>
      <Progress value={90} tone="auto" aria-label="Seats used" className="h-1.5" />
    </div>
  );
}

const limits = [
  { name: "Storage", used: "2 of 10 GB", value: 20 },
  { name: "Members", used: "10 of 10", value: 100 },
];

function Limits() {
  return (
    <div className="w-72 space-y-4 text-sm">
      {limits.map((limit) => (
        <div key={limit.name} className="space-y-2">
          <div className="flex justify-between">
            <span>{limit.name}</span>
            <span className="text-muted-foreground tabular-nums">{limit.used}</span>
          </div>
          <Progress value={limit.value} tone="auto" aria-label={`${limit.name} used`} />
        </div>
      ))}
    </div>
  );
}

export default defineDemo({
  title: "Progress",
  description:
    "A bar that shows how far along something is. Use it for usage against a plan limit or a running task.",
  controls: { value: select(values), tone: select(tones) },
  playground: ({ value, tone }) => (
    <Progress value={Number(value)} tone={tone} aria-label="API calls used" className="w-72" />
  ),
  code: ({ value, tone }) =>
    `<Progress value={${value}}${formatProp("tone", tone, "default")} aria-label="API calls used" />`,
  props: [
    { name: "value", type: "number | null" },
    { name: "max", type: "number", defaultValue: "100" },
    { name: "tone", type: tones.join(" | "), defaultValue: "default" },
    { name: "className", type: "string" },
  ],
  examples: {
    UsageMeter: {
      description: "Usage against the monthly plan limit, with a label.",
      component: UsageMeter,
    },
    Seats: {
      description: 'A thinner bar; tone="auto" turns amber at 80% and red at 100%.',
      component: Seats,
    },
    Limits: { description: "Several limits stacked in a settings panel.", component: Limits },
  },
});

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@locusgraph/components";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const indicators = ["dot", "line", "dashed"] as const;

const usage = [
  { month: "Jan", runs: 42000, tokens: 18000 },
  { month: "Feb", runs: 51000, tokens: 23000 },
  { month: "Mar", runs: 47000, tokens: 21000 },
  { month: "Apr", runs: 63000, tokens: 29000 },
  { month: "May", runs: 72000, tokens: 34000 },
  { month: "Jun", runs: 82000, tokens: 39000 },
];

const usageConfig = {
  runs: { label: "Agent runs", color: "var(--chart-1)" },
  tokens: { label: "Tool calls", color: "var(--chart-2)" },
} satisfies ChartConfig;

const revenue = [
  { month: "Jan", amount: 12400 },
  { month: "Feb", amount: 13900 },
  { month: "Mar", amount: 13100 },
  { month: "Apr", amount: 15800 },
  { month: "May", amount: 17200 },
  { month: "Jun", amount: 19600 },
];

const revenueConfig = {
  amount: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;

function UsageBars() {
  return (
    <ChartContainer config={usageConfig} className="min-h-52 w-full max-w-lg">
      <BarChart accessibilityLayer data={usage}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="runs" fill="var(--color-runs)" radius={4} />
        <Bar dataKey="tokens" fill="var(--color-tokens)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

function RevenueLine() {
  return (
    <ChartContainer config={revenueConfig} className="min-h-52 w-full max-w-lg">
      <LineChart accessibilityLayer data={revenue} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line
          dataKey="amount"
          type="natural"
          stroke="var(--color-amount)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

function StackedArea() {
  return (
    <ChartContainer config={usageConfig} className="min-h-52 w-full max-w-lg">
      <AreaChart accessibilityLayer data={usage} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="tokens"
          type="natural"
          fill="var(--color-tokens)"
          fillOpacity={0.4}
          stroke="var(--color-tokens)"
          stackId="usage"
        />
        <Area
          dataKey="runs"
          type="natural"
          fill="var(--color-runs)"
          fillOpacity={0.4}
          stroke="var(--color-runs)"
          stackId="usage"
        />
      </AreaChart>
    </ChartContainer>
  );
}

export default defineDemo({
  title: "Chart",
  isNew: true,
  description:
    "Recharts wrapped with theme colors, a tooltip and a legend. A config object maps each data key to a label and color.",
  controls: {
    indicator: select(indicators),
    legend: toggle(true),
    grid: toggle(true),
  },
  playground: ({ indicator, legend, grid }) => (
    <ChartContainer config={usageConfig} className="min-h-60 w-full max-w-xl">
      <BarChart accessibilityLayer data={usage}>
        {grid && <CartesianGrid vertical={false} />}
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip content={<ChartTooltipContent indicator={indicator} />} />
        {legend && <ChartLegend content={<ChartLegendContent />} />}
        <Bar dataKey="runs" fill="var(--color-runs)" radius={4} />
        <Bar dataKey="tokens" fill="var(--color-tokens)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
  code: ({ indicator, legend, grid }) =>
    `const chartConfig = {\n  runs: { label: "Agent runs", color: "var(--chart-1)" },\n  tokens: { label: "Tool calls", color: "var(--chart-2)" },\n} satisfies ChartConfig;\n\n<ChartContainer config={chartConfig} className="min-h-60 w-full">\n  <BarChart accessibilityLayer data={usage}>${grid ? "\n    <CartesianGrid vertical={false} />" : ""}\n    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />\n    <ChartTooltip content={<ChartTooltipContent${indicator === "dot" ? "" : ` indicator="${indicator}"`} />} />${legend ? "\n    <ChartLegend content={<ChartLegendContent />} />" : ""}\n    <Bar dataKey="runs" fill="var(--color-runs)" radius={4} />\n    <Bar dataKey="tokens" fill="var(--color-tokens)" radius={4} />\n  </BarChart>\n</ChartContainer>`,
  props: [
    { name: "ChartContainer.config", type: "ChartConfig" },
    {
      name: "ChartContainer.initialDimension",
      type: "{ width: number; height: number }",
      defaultValue: "{ width: 320, height: 200 }",
    },
    { name: "ChartTooltipContent.indicator", type: indicators.join(" | "), defaultValue: "dot" },
    { name: "ChartTooltipContent.hideLabel", type: "boolean", defaultValue: "false" },
    { name: "ChartLegendContent.hideIcon", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    UsageBars: {
      description: "Monthly agent runs and tool calls as grouped bars.",
      component: UsageBars,
    },
    RevenueLine: {
      description: "A smooth line for monthly revenue with a compact tooltip.",
      component: RevenueLine,
    },
    StackedArea: {
      description: "Stacked areas show how usage adds up each month.",
      component: StackedArea,
    },
  },
  composition: {
    name: "ChartContainer",
    children: [
      {
        name: "BarChart",
        children: [
          { name: "ChartTooltip", children: [{ name: "ChartTooltipContent" }] },
          { name: "ChartLegend", children: [{ name: "ChartLegendContent" }] },
        ],
      },
    ],
  },
});

import { Badge } from "@locusgraph/components";
import { defineDemo, select } from "../../../registry/define-demo";
import { colorGroups, paletteColors } from "./colors/palette";
import { SwatchHeader, SwatchRow } from "./colors/swatch-row";
import { ThemeScope } from "./colors/theme-scope";

const chartSeries = paletteColors.chart.map((color) => color.name);

function StatusInUse() {
  return (
    <div className="flex w-[30rem] max-w-full flex-col divide-y ring-1 ring-border">
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <span>Monthly memory writes</span>
        <span className="font-mono text-good">42% used</span>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <span>Wallet balance</span>
        <span className="font-mono text-warn">$2.40 left</span>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <span>Last payment</span>
        <span className="font-mono text-destructive">Declined</span>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <span>Plan</span>
        <Badge variant="outline" className="text-interactive">
          Changes on Nov 1
        </Badge>
      </div>
    </div>
  );
}

function ChartSeries() {
  return (
    <div className="flex w-[30rem] max-w-full flex-col gap-3">
      <div className="flex h-8 ring-1 ring-border">
        {chartSeries.map((series) => (
          <span key={series} className="flex-1" style={{ background: `var(--${series})` }} />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Use series in order, s1 first. Each one has a light and a dark value tuned for contrast on
        its surface.
      </p>
    </div>
  );
}

function BothThemes() {
  return (
    <div className="grid w-[30rem] max-w-full grid-cols-2 ring-1 ring-border">
      <ThemeScope theme="light" className="flex flex-col gap-2 p-4">
        <span className="eyebrow">Light</span>
        <span className="text-sm">Foreground on surface</span>
        <span className="text-sm text-muted-foreground">Muted on surface</span>
        <span className="text-sm text-good">Good</span>
      </ThemeScope>
      <ThemeScope theme="dark" className="flex flex-col gap-2 p-4">
        <span className="eyebrow">Dark</span>
        <span className="text-sm">Foreground on surface</span>
        <span className="text-sm text-muted-foreground">Muted on surface</span>
        <span className="text-sm text-good">Good</span>
      </ThemeScope>
    </div>
  );
}

export default defineDemo({
  title: "Colors",
  description:
    "Every color in the LocusGraph palette, with its token and its light and dark value. Use the token, never the hex: the token switches with the theme. From `@locusgraph/tokens`.",
  controls: { group: select(colorGroups, "base") },
  playground: ({ group }) => (
    <div className="w-full max-w-4xl divide-y ring-1 ring-border">
      <SwatchHeader />
      {paletteColors[group].map((color) => (
        <SwatchRow key={color.name} color={color} />
      ))}
    </div>
  ),
  code: ({ group }) =>
    paletteColors[group]
      .map((color) =>
        color.token.startsWith("var(")
          ? `<div style={{ background: "${color.token}" }} />`
          : `<div className="${color.token}" />`
      )
      .join("\n"),
  props: [
    { name: "lightColors", type: "Palette", defaultValue: "@locusgraph/tokens" },
    { name: "darkColors", type: "Palette", defaultValue: "@locusgraph/tokens" },
    { name: "hairline(palette)", type: "(palette: Palette) => string" },
  ],
  examples: {
    StatusInUse: {
      description: "Status colors carry meaning, so they go on values, never on decoration.",
      component: StatusInUse,
    },
    ChartSeries: {
      description: "The eight chart series, s1 to s8, in the order charts use them.",
      component: ChartSeries,
    },
    BothThemes: {
      description: "The same tokens resolve to the light and dark palettes.",
      component: BothThemes,
    },
  },
  isNew: true,
});

import { Pulse } from "@locusgraph/loop";
import { defineDemo, select, text, toggle } from "../../../registry/define-demo";
import { ThemeScope } from "../foundations/colors/theme-scope";

const pulseSizes = ["16", "24", "40", "64"] as const;

const sizeClasses: Record<(typeof pulseSizes)[number], string> = {
  "16": "text-[16px]",
  "24": "text-[24px]",
  "40": "text-[40px]",
  "64": "text-[64px]",
};

const sizeUse: Record<(typeof pulseSizes)[number], string> = {
  "16": "Inline, next to text",
  "24": "Buttons and rows",
  "40": "Panels and cards",
  "64": "Full page loading",
};

function Sizes() {
  return (
    <div className="grid w-[36rem] max-w-full grid-cols-2 divide-x divide-y ring-1 ring-border sm:grid-cols-4 sm:divide-y-0">
      {pulseSizes.map((size) => (
        <div key={size} className="flex flex-col items-center justify-end gap-3 px-3 py-5">
          <Pulse variant="locus" showLabel={false} className={sizeClasses[size]} />
          <span className="eyebrow">{size}px</span>
          <span className="text-center text-xs text-muted-foreground">{sizeUse[size]}</span>
        </div>
      ))}
    </div>
  );
}

function WithLabel() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Pulse variant="locus" label="Walking the graph…" />
      <Pulse variant="locus" label="Walking the graph…" showLabel={false} />
    </div>
  );
}

function OnDarkAndLight() {
  return (
    <div className="grid w-[36rem] max-w-full grid-cols-2 ring-1 ring-border">
      <ThemeScope theme="light" className="flex h-40 items-center justify-center">
        <Pulse variant="locus" label="Loading…" className="text-[24px]" />
      </ThemeScope>
      <ThemeScope theme="dark" className="flex h-40 items-center justify-center">
        <Pulse variant="locus" label="Loading…" className="text-[24px]" />
      </ThemeScope>
    </div>
  );
}

function PageLoading() {
  return (
    <div className="brand-grid-quiet flex h-80 w-[44rem] max-w-full flex-col items-center justify-center gap-4 overflow-hidden ring-1 ring-border">
      <Pulse variant="locus" showLabel={false} className="text-[64px]" />
      <span className="text-sm text-muted-foreground">Loading acme-customers…</span>
    </div>
  );
}

export default defineDemo({
  title: "Loader",
  description:
    'The LocusGraph burst loader: the mark\'s rays light up in a sweep. It sizes with font size, is a status region, and holds still under reduced motion. Pulse variant="locus" from @locusgraph/loop.',
  controls: {
    size: select(pulseSizes, "40"),
    showLabel: toggle(false),
    label: text("Walking the graph…"),
  },
  playground: ({ size, showLabel, label }) => (
    <Pulse variant="locus" label={label} showLabel={showLabel} className={sizeClasses[size]} />
  ),
  code: ({ size, showLabel, label }) =>
    `<Pulse\n  variant="locus"\n  label="${label}"${showLabel ? "" : "\n  showLabel={false}"}\n  className="${sizeClasses[size]}"\n/>`,
  props: [
    { name: "variant", type: '"locus"', defaultValue: '"dots"' },
    { name: "label", type: "string", defaultValue: '"Thinking…"' },
    { name: "showLabel", type: "boolean", defaultValue: "true for locus" },
    { name: "className", type: "string", defaultValue: "set text-[Npx] to size the burst" },
  ],
  examples: {
    Sizes: {
      description: "16, 24, 40 and 64px, set with font size; the burst is 1.35em tall.",
      component: Sizes,
    },
    WithLabel: {
      description:
        "With a label it shimmers the text. Without one the label is still read to screen readers.",
      component: WithLabel,
    },
    OnDarkAndLight: {
      description: "The burst takes the foreground color, so it works on either theme.",
      component: OnDarkAndLight,
    },
    PageLoading: {
      description:
        "For a page that is loading: the 64px burst centered, with one line that names what is loading.",
      component: PageLoading,
    },
  },
  isNew: true,
});

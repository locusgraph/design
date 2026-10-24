import { defineDemo, text } from "../../../registry/define-demo";
import { typeFamilies, typeScale, typeWeights } from "./type/type-scale";

const defaultSample = "Agents remember what they learn.";

function Scale() {
  return (
    <div className="w-[36rem] max-w-full divide-y ring-1 ring-border">
      {typeScale.map((step) => (
        <div key={step.name} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 px-4 py-3">
          <span className="font-mono text-xs whitespace-nowrap text-muted-foreground">
            {step.name} · {step.size}
          </span>
          <span className={step.className}>{step.use}</span>
        </div>
      ))}
    </div>
  );
}

function Weights() {
  return (
    <div className="w-[36rem] max-w-full divide-y ring-1 ring-border">
      {typeWeights.map((weight) => (
        <div
          key={weight.value}
          className="grid grid-cols-[5rem_1fr_auto] items-baseline gap-4 px-4 py-3"
        >
          <span className="font-mono text-xs text-muted-foreground">{weight.value}</span>
          <span className={`text-lg ${weight.className}`}>Memory for agents</span>
          <span className="text-xs text-muted-foreground">{weight.use}</span>
        </div>
      ))}
    </div>
  );
}

function Eyebrow() {
  return (
    <div className="flex w-[30rem] max-w-full flex-col gap-1.5 p-6 ring-1 ring-border">
      <span className="eyebrow">Usage this month</span>
      <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em]">18,204 nodes</h3>
      <p className="text-sm text-muted-foreground">Across 3 graphs in acme-customers.</p>
    </div>
  );
}

export default defineDemo({
  title: "Type",
  description:
    "Three families: Archivo for headings and the wordmark, Inter for everything you read, Fira Code for code and ids. One short size scale, three weights, and the eyebrow label. From `@locusgraph/tokens`.",
  controls: { sample: text(defaultSample) },
  playground: ({ sample }) => (
    <div className="w-full max-w-3xl divide-y ring-1 ring-border">
      {typeFamilies.map((family) => (
        <div key={family.name} className="flex flex-col gap-2 px-5 py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="eyebrow">
              {family.name} · {family.role}
            </span>
            <code className="font-mono text-xs text-muted-foreground">{family.className}</code>
          </div>
          <p
            className={`${family.className} text-2xl font-semibold`}
            style={{ letterSpacing: family.tracking }}
          >
            {sample}
          </p>
          <p className={`${family.className} text-sm text-muted-foreground`}>
            ABCDEFGHIJKLM nopqrstuvwxyz 0123456789 $1.40 · 18,204
          </p>
        </div>
      ))}
    </div>
  ),
  code: () =>
    [
      '<h1 className="font-heading text-2xl font-semibold tracking-[-0.02em]">…</h1>',
      '<p className="font-sans text-sm">…</p>',
      '<code className="font-mono text-xs">org_8f2k…</code>',
      '<span className="eyebrow">Usage this month</span>',
    ].join("\n"),
  props: [
    { name: "fonts", type: "{ sans, heading, mono, emailSafeSans, emailSafeMono }" },
    { name: "headingTracking", type: "string", defaultValue: '"-0.02em"' },
    { name: "eyebrow", type: "utility", defaultValue: "Fira Code 12px, uppercase, 0.05em" },
  ],
  examples: {
    Scale: {
      description: "The sizes in use at the 17px root, from the 12px eyebrow to 2xl.",
      component: Scale,
    },
    Weights: {
      description: "400 for reading, 500 for controls, 600 for headings.",
      component: Weights,
    },
    Eyebrow: {
      description: "The eyebrow labels a block; the value under it carries the weight.",
      component: Eyebrow,
    },
  },
  isNew: true,
});

import { RuleGrid, RuleGridCell } from "@locusgraph/components";

const steps = [
  { label: "Install", code: "pnpm add @locusgraph/components" },
  { label: "Import the theme", code: '@import "@locusgraph/components/theme.css";' },
  { label: "Use it", code: 'import { Button } from "@locusgraph/components";' },
];

export function InstallSteps() {
  return (
    <section aria-labelledby="install-title" className="flex flex-col gap-4 px-6 sm:px-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="install-title" className="eyebrow">
          Install
        </h2>
        <a
          href="/DESIGN.md"
          className="font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          For AI agents: /DESIGN.md
        </a>
      </div>
      <RuleGrid columns={3}>
        {steps.map((step, index) => (
          <RuleGridCell key={step.label} className="gap-3">
            <span className="flex items-center gap-2.5 text-sm font-medium">
              <span className="flex size-5 items-center justify-center font-mono text-[11px] text-muted-foreground ring-1 ring-border">
                {index + 1}
              </span>
              {step.label}
            </span>
            <code className="overflow-x-auto bg-muted/40 px-3 py-2 font-mono text-xs whitespace-nowrap">
              {step.code}
            </code>
          </RuleGridCell>
        ))}
      </RuleGrid>
    </section>
  );
}

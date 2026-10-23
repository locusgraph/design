import { CopyCommand } from "./actions/copy-command";

const steps = [
  { label: "Install", code: "pnpm add @locusgraph/components" },
  { label: "Import the theme", code: '@import "@locusgraph/components/theme.css";' },
  { label: "Use it", code: 'import { Button } from "@locusgraph/components";' },
];

export function InstallSteps() {
  return (
    <section aria-labelledby="install-title" className="flex flex-col gap-4 px-6 sm:px-10">
      <h2 id="install-title" className="eyebrow">
        Install
      </h2>
      <ol className="flex flex-col divide-y ring-1 ring-border">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className="flex flex-col gap-3 bg-card px-5 py-4 sm:flex-row sm:items-center sm:gap-6"
          >
            <span className="flex w-44 shrink-0 items-center gap-2.5 text-sm font-medium">
              <span className="flex size-5 items-center justify-center font-mono text-2xs text-muted-foreground ring-1 ring-border">
                {index + 1}
              </span>
              {step.label}
            </span>
            <div className="min-w-0 flex-1">
              <CopyCommand command={step.code} prompt={index === 0} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

const greySteps = [
  { token: "--grey-a1", step: "a1", use: "hover" },
  { token: "--grey-a2", step: "a2", use: "selected" },
  { token: "--grey-a3", step: "a3", use: "border" },
  { token: "--grey-a4", step: "a4", use: "strong" },
];

const greyGrid = "grid grid-cols-[3.5rem_repeat(4,minmax(0,1fr))] items-center gap-2 px-2";

function GreyStrip({ surface, label }: { surface: string; label: string }) {
  return (
    <div className={`${greyGrid} py-2`} style={{ background: surface }}>
      <span className="text-xs text-muted-foreground">{label}</span>
      {greySteps.map((step) => (
        <span
          key={step.token}
          className="h-8"
          style={{ background: `var(${step.token})` }}
          title={step.token}
        />
      ))}
    </div>
  );
}

export function GreySample() {
  return (
    <div className="flex w-full max-w-96 flex-col gap-1">
      <div className={greyGrid}>
        <span />
        {greySteps.map((step) => (
          <span key={step.token} className="text-center font-mono text-xs text-muted-foreground">
            {step.step}
          </span>
        ))}
      </div>
      <div className="ring-1 ring-border">
        <GreyStrip surface="var(--locus-background)" label="Page" />
        <GreyStrip surface="var(--locus-surface)" label="Card" />
        <GreyStrip surface="var(--btn-subtle)" label="Tinted" />
      </div>
      <p className="text-xs text-pretty text-muted-foreground">
        {greySteps.map((step) => `${step.step} ${step.use}`).join(" · ")}. The same step reads the
        same on every surface.
      </p>
    </div>
  );
}

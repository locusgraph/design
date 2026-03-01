import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import { Stepper } from "@locus/components";

const SHOWCASE_STEPS = [
  { id: 1, label: "Create graph" },
  { id: 2, label: "Ingest skill (optional)", optional: true },
  { id: 3, label: "Connect MCP" },
];

export function StepperShowcase() {
  const [current, setCurrent] = useState(1);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Stepper</h2>

      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use for multi-step flows (e.g. create graph, onboarding).</p>
          <p>
            • Pass <code>steps</code> and <code>currentStep</code> (1-based index or step id).
          </p>
          <p>
            • Steps can be marked <code>optional</code>; labels can include “(optional)”.
          </p>
          <p>
            • Track: dots and connecting lines sit on one horizontal centerline; labels sit below.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Default</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Stepper steps={SHOWCASE_STEPS} currentStep={current} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive (click to change step)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Stepper steps={SHOWCASE_STEPS} currentStep={current} />
          <div className="flex flex-wrap gap-2 pt-2">
            {SHOWCASE_STEPS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrent(s.id as number)}
                className="rounded-md border border-border bg-muted/50 px-3 py-1.5 text-sm hover:bg-muted"
              >
                Step {s.id}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>By step id (string)</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper
            steps={[
              { id: "a", label: "Account" },
              { id: "b", label: "Details" },
              { id: "c", label: "Confirm" },
            ]}
            currentStep="b"
          />
        </CardContent>
      </Card>
    </section>
  );
}

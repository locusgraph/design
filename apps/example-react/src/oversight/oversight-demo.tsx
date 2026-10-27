import { RuleGrid, RuleGridCell, RuleGridLabel } from "@locusgraph/components";
import { SpendCapRun } from "./spend-cap-run";
import { SpendGraphPause } from "./spendgraph-pause";

export function OversightDemo() {
  return (
    <RuleGrid columns={2}>
      <RuleGridCell className="gap-3">
        <RuleGridLabel>beforeTool wait, shown as Approval, then loop.resume</RuleGridLabel>
        <p className="text-xs text-muted-foreground">
          A simulated run in the shape of SpendGraph's harness loop: beforeTool returns a wait for
          risky tools, the app asks a person, and the answer resumes the run.
        </p>
        <SpendGraphPause />
      </RuleGridCell>
      <RuleGridCell className="gap-3">
        <RuleGridLabel>Cost cap checked in app code, shown as SpendGate</RuleGridLabel>
        <p className="text-xs text-muted-foreground">
          SpendGraph budgets alert and its ceilings end a run. Pausing at a cap is the app's own
          check, before each step: spent plus the next estimate against the cap and the balance.
        </p>
        <SpendCapRun />
      </RuleGridCell>
    </RuleGrid>
  );
}

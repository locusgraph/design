import { RunBar } from "@locusgraph/loop";
import { defineDemo, select } from "../../../registry/define-demo";

const statusOptions = ["running", "paused", "stopped", "done"] as const;

function WithoutStepping() {
  return (
    <div className="w-full max-w-2xl">
      <RunBar
        status="running"
        runName="Graph cleanup"
        elapsedMs={4_380_000}
        onPause={() => {}}
        onResume={() => {}}
        onStop={() => {}}
      />
    </div>
  );
}

export default defineDemo({
  title: "Run Bar",
  description:
    "A slim status bar for a running agent: a status word that shimmers while running, elapsed time, and pause, resume, step once or stop. Only the actions that make sense for the current status are enabled, and the status is announced.",
  controls: { status: select(statusOptions, "running") },
  playground: ({ status }) => (
    <div className="w-full max-w-2xl">
      <RunBar
        status={status}
        runName="Nightly SpendGraph reconcile"
        elapsedMs={252_000}
        onPause={() => {}}
        onResume={() => {}}
        onStop={() => {}}
        onStep={() => {}}
      />
    </div>
  ),
  code: ({ status }) =>
    `<RunBar\n  status="${status}"\n  runName={run.name}\n  elapsedMs={run.elapsedMs}\n  onPause={pause}\n  onResume={resume}\n  onStop={stop}\n  onStep={stepOnce}\n/>`,
  props: [
    { name: "status", type: '"running" | "paused" | "stopped" | "done"' },
    { name: "runName", type: "string" },
    { name: "elapsedMs", type: "number" },
    { name: "onPause", type: "() => void" },
    { name: "onResume", type: "() => void" },
    { name: "onStop", type: "() => void" },
    { name: "onStep", type: "() => void" },
    { name: "pending", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    WithoutStepping: {
      description: "Leave out onStep when the runtime cannot run one step at a time.",
      component: WithoutStepping,
    },
  },
  isNew: true,
});

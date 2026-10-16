import { RunControls } from "@locusgraph/agent-ui";
import { defineDemo, select } from "../../../registry/define-demo";

const statusOptions = ["running", "paused", "stopped", "done"] as const;

function WithoutStepping() {
  return (
    <div className="w-full max-w-xl">
      <RunControls
        status="running"
        runName="Graph cleanup"
        onPause={() => {}}
        onResume={() => {}}
        onStop={() => {}}
      />
    </div>
  );
}

export default defineDemo({
  title: "Run Controls",
  description:
    "Pause, resume, step once or stop a running agent. Only the buttons that make sense for the current status are enabled, and the status is announced.",
  controls: { status: select(statusOptions, "running") },
  playground: ({ status }) => (
    <div className="w-full max-w-xl">
      <RunControls
        status={status}
        runName="Nightly SpendGraph reconcile"
        onPause={() => {}}
        onResume={() => {}}
        onStop={() => {}}
        onStep={() => {}}
      />
    </div>
  ),
  code: ({ status }) =>
    `<RunControls\n  status="${status}"\n  runName={run.name}\n  onPause={pause}\n  onResume={resume}\n  onStop={stop}\n  onStep={stepOnce}\n/>`,
  props: [
    { name: "status", type: '"running" | "paused" | "stopped" | "done"' },
    { name: "runName", type: "string" },
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

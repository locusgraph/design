import { Button } from "@locusgraph/components";
import { ApprovalGate, DecisionLog, useApprovalGate } from "@locusgraph/loop";
import { useState } from "react";
import { defineDemo, toggle } from "../../../registry/define-demo";

function GatedButtons({ allowForRun }: { allowForRun: boolean }) {
  const gate = useApprovalGate();
  const [result, setResult] = useState("Click an action");
  const run = async (toolName: string, label: string, risk: "write" | "destructive") => {
    const decision = await gate.ask({
      toolName,
      risk,
      title: label,
      actionLabel: label,
      input: { key: "lg_live_…a1b2" },
    });
    setResult(decision.approved ? `${label}: runs` : `${label}: did not run`);
  };
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => run("rotate_key", "Rotate key", "write")}
        >
          Rotate key
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => run("revoke_key", "Revoke key", "destructive")}
        >
          Revoke key
        </Button>
      </div>
      <ApprovalGate gate={gate} allowForRun={allowForRun} />
      <p className="font-mono text-2xs text-muted-foreground">{result}</p>
      <DecisionLog entries={gate.log} />
    </div>
  );
}

export default defineDemo({
  title: "Approval Gate",
  description:
    "`useApprovalGate` puts an approval in front of any action, including one a model generated. `ask` returns a promise that settles when a person decides, and every decision lands in `gate.log`.",
  controls: { allowForRun: toggle(true) },
  playground: ({ allowForRun }) => <GatedButtons allowForRun={allowForRun} />,
  code: () =>
    `const gate = useApprovalGate();\n\nconst decision = await gate.ask({\n  toolName: "revoke_key",\n  risk: "destructive",\n  input: { key },\n});\nif (decision.approved) revoke(key);\n\n<ApprovalGate gate={gate} />\n<DecisionLog entries={gate.log} />`,
  props: [
    { name: "useApprovalGate.by", type: "string", defaultValue: '"You"' },
    { name: "gate.ask", type: "(request: ApprovalRequest) => Promise<ApprovalDecision>" },
    { name: "gate.log", type: "DecisionLogEntry[]" },
    { name: "gate.resetRun", type: "() => void", defaultValue: "forgets allow for this run" },
    { name: "ApprovalGate.allowForRun", type: "boolean", defaultValue: "true" },
  ],
  examples: {},
  isNew: true,
});

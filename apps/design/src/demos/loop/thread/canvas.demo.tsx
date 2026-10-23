import { Button } from "@locusgraph/components";
import { Canvas, type CanvasVersion, Code } from "@locusgraph/loop";
import { DownloadSimple as DownloadIcon } from "@phosphor-icons/react/ssr";
import { useState } from "react";
import { defineDemo, select } from "../../../registry/define-demo";

const kinds = ["document", "code"] as const;

const versions: CanvasVersion[] = [
  { id: "ver_1", label: "v1", createdAt: "2026-10-14T10:12:00.000Z" },
  { id: "ver_2", label: "v2", createdAt: "2026-10-15T15:40:00.000Z" },
  { id: "ver_3", label: "v3", createdAt: "2026-10-16T09:05:00.000Z" },
];

const reportTotals: Record<string, string> = {
  ver_1: "$1,190.00",
  ver_2: "$1,262.75",
  ver_3: "$1,284.20",
};

const budgetCode = `export const budgets = {
  "support-agent": { monthlyUsd: 600, alertAt: 0.8 },
  "graph-indexer": { monthlyUsd: 250, alertAt: 0.9 },
};`;

function Report({ versionId }: { versionId: string }) {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <p>
        September LLM spend was <strong>{reportTotals[versionId]}</strong>, up 18% on August.
      </p>
      <p className="text-muted-foreground">
        The support agent accounts for 61% of the increase after its prompts grew from 1.2k to 1.8k
        input tokens. Switching its triage step to a smaller model would save about $140 a month.
      </p>
    </div>
  );
}

function Playground({ kind }: { kind: (typeof kinds)[number] }) {
  const [versionId, setVersionId] = useState("ver_3");
  const [open, setOpen] = useState(true);
  if (!open) {
    return (
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open artifact
      </Button>
    );
  }
  return (
    <div className="h-72 w-full max-w-lg">
      <Canvas
        title={kind === "code" ? "budgets.ts" : "September spend report"}
        kind={kind === "code" ? "Code" : "Document"}
        versions={versions}
        versionId={versionId}
        onVersionChange={setVersionId}
        onClose={() => setOpen(false)}
        actions={
          <Button variant="ghost" size="icon-sm" aria-label="Download">
            <DownloadIcon weight="bold" aria-hidden />
          </Button>
        }
      >
        {kind === "code" ? (
          <Code language="ts" code={budgetCode} />
        ) : (
          <Report versionId={versionId} />
        )}
      </Canvas>
    </div>
  );
}

function SingleVersion() {
  return (
    <div className="h-56 w-full max-w-lg">
      <Canvas title="Acme account summary" kind="Document" versions={versions.slice(0, 1)}>
        <p className="text-sm">Acme renews in March on the Pro plan, owned by Dana Lee.</p>
      </Canvas>
    </div>
  );
}

export default defineDemo({
  title: "Canvas",
  description:
    "A panel for a document or code the agent generated. The title leads; a faint line under it holds the kind and the version switcher, with Back to latest on older versions. A rule appears under the header only once the content scrolls.",
  controls: { kind: select(kinds) },
  playground: ({ kind }) => <Playground kind={kind} />,
  code: () =>
    `<Canvas\n  title="September spend report"\n  kind="Document"\n  versions={versions}\n  versionId={versionId}\n  onVersionChange={setVersionId}\n  actions={<DownloadButton />}\n  onClose={closePanel}\n>\n  {content}\n</Canvas>`,
  props: [
    { name: "title", type: "string" },
    { name: "kind", type: "string" },
    { name: "versions", type: "CanvasVersion[]", defaultValue: "[]" },
    { name: "versionId", type: "string", defaultValue: "the latest" },
    { name: "onVersionChange", type: "(id: string) => void" },
    { name: "actions", type: "ReactNode" },
    { name: "onClose", type: "() => void" },
    { name: "children", type: "ReactNode" },
  ],
  examples: {
    SingleVersion: {
      description: "With one version the footer shows a plain label.",
      component: SingleVersion,
    },
  },
  isNew: true,
});

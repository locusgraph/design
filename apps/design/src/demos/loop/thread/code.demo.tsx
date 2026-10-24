import { Code } from "@locusgraph/loop";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const languages = ["ts", "sql", "json"] as const;

const samples: Record<(typeof languages)[number], { code: string; filename: string }> = {
  ts: {
    filename: "track-spend.ts",
    code: `import { SpendGraph } from "@spendgraph/sdk";

const spend = new SpendGraph({ apiKey: process.env.SPENDGRAPH_KEY });

await spend.track({
  workflow: "support-agent",
  model: "claude-sonnet-5-5",
  inputTokens: 1840,
  outputTokens: 312,
});`,
  },
  sql: {
    filename: "top-workflows.sql",
    code: `select workflow, sum(cost_micro_usd) / 1e6 as usd
from spend_records
where created_at >= :month_start
group by workflow
order by usd desc
limit 5;`,
  },
  json: {
    filename: "memory.json",
    code: `{
  "id": "mem_3k9d",
  "label": "Acme renews in March",
  "kind": "fact",
  "relevance": 0.92
}`,
  },
};

function Command() {
  return (
    <div className="w-full max-w-xl">
      <Code language="bash" code="pnpm add @locusgraph/loop @locusgraph/components" />
    </div>
  );
}

export default defineDemo({
  title: "Code",
  description:
    "Code in a message or canvas, highlighted with Shiki in light and dark. Plain code renders first, so it works on the server and before Shiki loads.",
  controls: { language: select(languages), filename: toggle(true) },
  playground: ({ language, filename }) => (
    <div className="w-full max-w-xl">
      <Code
        language={language}
        code={samples[language].code}
        filename={filename ? samples[language].filename : undefined}
      />
    </div>
  ),
  code: ({ language, filename }) =>
    `<Code language="${language}"${filename ? ` filename="${samples[language].filename}"` : ""} code={code} />`,
  props: [
    { name: "code", type: "string" },
    { name: "language", type: "string", defaultValue: '"text"' },
    { name: "filename", type: "string" },
    { name: "showCopy", type: "boolean", defaultValue: "true" },
    { name: "onCopy", type: "(code: string) => void" },
  ],
  examples: {
    Command: { description: "A shell command without a filename.", component: Command },
  },
  isNew: true,
});

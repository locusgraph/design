import { defineDemo, select } from "../../registry/define-demo";
import { type PresetName, presets } from "./generative-ui/presets";
import { catalogPrompt, SpecPlayground } from "./generative-ui/spec-playground";

const presetNames = Object.keys(presets) as PresetName[];

function CatalogPrompt() {
  return (
    <pre className="max-h-96 w-full overflow-auto font-mono text-2xs whitespace-pre-wrap text-muted-foreground">
      {catalogPrompt}
    </pre>
  );
}

export default defineDemo({
  title: "Generative UI",
  description:
    "A model writes a JSON spec, json-render draws it with Locus Design blocks through @locusgraph/json-render. Edit the spec and the screen follows. Every action the spec wires up asks a person first.",
  controls: { spec: select(presetNames, "over-quota") },
  playground: ({ spec }) => <SpecPlayground key={spec} initialSpec={presets[spec]} />,
  code: () =>
    'import { defineCatalog } from "@json-render/core";\nimport { defineRegistry } from "@json-render/react";\nimport { schema } from "@json-render/react/schema";\nimport { locusComponents, locusRenderers } from "@locusgraph/json-render";\nimport { useApprovalGate } from "@locusgraph/loop";\n\nconst catalog = defineCatalog(schema, {\n  components: { ...locusComponents },\n  actions: { pickedAction: { description: "Run the action at /picked" } },\n});\n\nconst { registry, handlers } = defineRegistry(catalog, {\n  components: { ...locusRenderers },\n  actions: {\n    pickedAction: async (_params, setState, state) => {\n      const decision = await gate.ask({ toolName: state.picked.actionId, risk: "write" });\n      if (decision.approved) await run(state.picked);\n    },\n  },\n});\n\nconst systemPrompt = catalog.prompt();',
  props: [
    {
      name: "locusComponents",
      type: "catalog components: Stack, Columns, Notice, Usage, Wallet, TopUp, Plans, Keys",
    },
    { name: "locusRenderers", type: "registry components for the same names" },
    { name: "TopUp emits", type: "buy, after writing /selectedPackId" },
    { name: "Plans and Keys emit", type: "action, after writing /picked = { actionId, target }" },
  ],
  examples: {
    CatalogPrompt: {
      description: "catalog.prompt() is the system prompt that teaches a model these components.",
      component: CatalogPrompt,
    },
  },
  previewHeight: "tall",
  isNew: true,
});

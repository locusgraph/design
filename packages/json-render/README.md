# @locusgraph/json-render

[![npm](https://img.shields.io/npm/v/@locusgraph/json-render?color=111111&style=flat-square)](https://www.npmjs.com/package/@locusgraph/json-render) [![MIT license](https://img.shields.io/badge/license-MIT-111111?style=flat-square)](https://github.com/locusgraph/design/blob/master/LICENSE)

[Docs](https://design.locusgraph.com/generative-ui) · [Source](https://github.com/locusgraph/design/tree/master/packages/json-render) · [All packages](https://github.com/locusgraph/design#packages)

A [json-render](https://json-render.dev) catalog and registry for Locus Design components and blocks. A model lays out a Locus Design screen as JSON; json-render draws it with the real components, in the Locus Design look. Data comes from state through `$state` bindings, so the model picks the layout and never writes the numbers.

```bash
pnpm add @locusgraph/json-render @json-render/core @json-render/react zod @locusgraph/blocks @locusgraph/components
```

```tsx
import { defineCatalog } from "@json-render/core";
import { defineRegistry, JSONUIProvider, Renderer } from "@json-render/react";
import { schema } from "@json-render/react/schema";
import { locusComponents, locusRenderers } from "@locusgraph/json-render";

const catalog = defineCatalog(schema, {
  components: { ...locusComponents },
  actions: { planAction: { description: "Run the plan action at /picked" } },
});

const { registry, handlers } = defineRegistry(catalog, {
  components: { ...locusRenderers },
  actions: { planAction: async (_params, _setState, state) => openPlanPicker(state.picked) },
});

const systemPrompt = catalog.prompt();
```

| Component | Props | Emits |
|---|---|---|
| `Stack` | `gap` | |
| `Columns` | `count`, 1 to 3 | |
| `Notice` | `tone`, `title`, `description` | |
| `Usage` | `quotas`, `label` | |
| `Wallet` | `balanceMicroUsd`, `grants` | |
| `TopUp` | `packs` | `buy`, after writing the pack id to `/selectedPackId` |
| `Plans` | `plans`, `actions` | `action`, after writing `{ actionId, target }` to `/picked` |
| `Keys` | `keys`, `actions` | `action`, after writing `{ actionId, target }` to `/picked` |

Props are nullable rather than optional, because models write `null` more reliably than they leave a key out. Add your own components next to these by spreading both objects into your catalog and registry.

Put a person in front of a risky action with `useApprovalGate` from `@locusgraph/loop`: `await gate.ask({ toolName, risk, input })` in the action handler, before anything runs.

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

Props are nullable rather than optional, because models write `null` more reliably than they leave a key out.

## Extend the catalog

Spread both objects, then add your own entry under the same name in the catalog and the registry. `catalog.prompt()` lists it for the model.

```tsx
const catalog = defineCatalog(schema, {
  components: {
    ...locusComponents,
    StatusBadge: {
      props: z.object({ label: z.string(), tone: z.enum(["success", "warning"]).nullable() }),
      description: "A short status word next to a block",
    },
  },
  actions: {},
});

const { registry } = defineRegistry(catalog, {
  components: {
    ...locusRenderers,
    StatusBadge: ({ props }) => <Badge variant={props.tone ?? "secondary"}>{props.label}</Badge>,
  },
});
```

Replace one by reusing its key after the spread (`{ ...locusRenderers, Wallet: MyWallet }`), and remove one by destructuring it out of both objects. More at [design.locusgraph.com/generative-ui](https://design.locusgraph.com/generative-ui), in the Extend tab.

Put a person in front of a risky action with `useApprovalGate` from `@locusgraph/loop`: `await gate.ask({ toolName, risk, input })` in the action handler, before anything runs.

## One click, one run

Wrap each handler in `guardAction`. A second click while the first runs does nothing, and the blocks show the state:

```tsx
pickedAction: guardAction(async (picked) => {
  const decision = await gate.ask({ toolName: picked.actionId, risk: "write", input: picked });
  if (!decision.approved) return null;
  await run(picked);
  return `Moved to ${picked.target}`;
}),
```

| State | Written by | What the blocks do |
|---|---|---|
| `/pending` | `guardAction`, while the run is in flight | Every action is disabled; the clicked one shows a spinner |
| `/settled` | `guardAction`, with the label you return | The label replaces the buttons on the target; the rest stay disabled |
| `/locked` | You, on an older turn | Every action is disabled |

Return `null` (a denial, say) to leave the turn open. Give each turn in a chat its own state store, and set `/locked` on the older ones when a new turn arrives.

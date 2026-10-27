import type * as React from "react";
import { CodeBlock } from "../../../preview/code/code-block";

const addComponentCode = `import { defineCatalog } from "@json-render/core";
import { defineRegistry } from "@json-render/react";
import { schema } from "@json-render/react/schema";
import { Badge } from "@locusgraph/components";
import { locusComponents, locusRenderers } from "@locusgraph/json-render";
import { z } from "zod";

const catalog = defineCatalog(schema, {
  components: {
    ...locusComponents,
    StatusBadge: {
      props: z.object({
        label: z.string(),
        tone: z.enum(["success", "warning"]).nullable(),
      }),
      description: "A short status word next to a block",
    },
  },
  actions: {},
});

const { registry } = defineRegistry(catalog, {
  components: {
    ...locusRenderers,
    StatusBadge: ({ props }) => (
      <Badge variant={props.tone ?? "secondary"}>{props.label}</Badge>
    ),
  },
});`;

const replaceCode = `components: { ...locusRenderers, Wallet: MyWallet }`;

const removeCode = `const { Keys, ...catalogWithoutKeys } = locusComponents;
const { Keys: _keys, ...renderersWithoutKeys } = locusRenderers;`;

const actionCode = `actions: {
  archive: guardAction(async (picked) => {
    const decision = await gate.ask({
      toolName: "archive",
      risk: "write",
      input: picked,
    });
    if (!decision.approved) return null;
    await archive(picked.target);
    return \`Archived \${picked.target}\`;
  }),
}`;

const lockTurnCode = `store.update({ "/locked": true });`;

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="font-heading text-sm font-semibold text-foreground">{title}</h3>
      {children}
    </section>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-pretty text-muted-foreground">{children}</p>;
}

function Snippet({ code }: { code: string }) {
  return (
    <CodeBlock
      code={code}
      collapsible={false}
      className="border bg-background [&_.shiki]:text-xs"
    />
  );
}

export function ExtendGuide() {
  return (
    <>
      <Note>
        Spread <code>locusComponents</code> into your catalog and <code>locusRenderers</code> into
        your registry, then add your own entries under the same name in both.
      </Note>
      <Step title="Add a component">
        <Snippet code={addComponentCode} />
        <Note>
          <code>catalog.prompt()</code> now lists it for the model. Build renderers from{" "}
          <code>@locusgraph/components</code> so they keep the Locus Design look.
        </Note>
      </Step>
      <Step title="Replace one">
        <Snippet code={replaceCode} />
        <Note>The later key wins. Keep the props, or replace the catalog entry too.</Note>
      </Step>
      <Step title="Remove one">
        <Snippet code={removeCode} />
      </Step>
      <Step title="Add an action">
        <Snippet code={actionCode} />
        <Note>
          <code>guardAction</code> runs one click at a time. While it runs, <code>/pending</code>{" "}
          locks every button and spins the one clicked. The label you return goes to{" "}
          <code>/settled</code>: the block shows it in place of the buttons and the turn stays
          frozen. Return <code>null</code>, as on a denial, to leave the turn open.
        </Note>
      </Step>
      <Step title="Freeze older turns">
        <Snippet code={lockTurnCode} />
        <Note>
          Give each turn its own state store. When the next turn arrives, lock the older one so its
          buttons cannot fire again.
        </Note>
      </Step>
      <Step title="Keep the model reliable">
        <ul className="flex list-disc flex-col gap-1 pl-4 text-sm text-pretty text-muted-foreground">
          <li>Nullable props, not optional: models write null more reliably.</li>
          <li>Bind numbers to state with $state; the model picks the layout only.</li>
          <li>Each description says when to use the component. The model reads it.</li>
        </ul>
      </Step>
    </>
  );
}

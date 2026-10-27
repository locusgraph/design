import { defineCatalog } from "@json-render/core";
import { defineRegistry, JSONUIProvider, Renderer } from "@json-render/react";
import { schema } from "@json-render/react/schema";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { locusComponents, locusRenderers } from "../index";
import { locusComponentNames } from "../registry/props";

const catalog = defineCatalog(schema, {
  components: locusComponents,
  actions: { planAction: { description: "Run the plan action at /picked" } },
});

const { registry } = defineRegistry(catalog, {
  components: locusRenderers,
  actions: { planAction: async () => {} },
});

describe("locusComponents", () => {
  it("has a renderer for every catalog entry", () => {
    expect(Object.keys(locusRenderers).sort()).toEqual([...locusComponentNames].sort());
  });

  it("describes every component to the model", () => {
    const prompt = catalog.prompt();
    for (const name of locusComponentNames) {
      expect(prompt).toContain(name);
    }
  });

  it("renders blocks from a spec with data bound from state", () => {
    const html = renderToStaticMarkup(
      <JSONUIProvider
        registry={registry}
        initialState={{
          quotas: [
            {
              key: "spendgraph.events",
              period: "month",
              used: 10450,
              included: 10000,
              label: null,
            },
          ],
          plans: [
            { name: "Free", price: "$0", points: ["Free"], current: true },
            { name: "Pro", price: "$40.00 per month", points: ["More"], current: false },
          ],
        }}
      >
        <Renderer
          registry={registry}
          spec={{
            root: "page",
            elements: {
              page: { type: "Stack", props: { gap: "lg" }, children: ["usage", "plans"] },
              usage: { type: "Usage", props: { quotas: { $state: "/quotas" }, label: null } },
              plans: {
                type: "Plans",
                props: {
                  plans: { $state: "/plans" },
                  actions: [{ id: "upgrade", label: "Upgrade", variant: null, disabled: null }],
                },
                on: { action: { action: "planAction" } },
              },
            },
          }}
        />
      </JSONUIProvider>
    );
    expect(html).toContain("10,450");
    expect(html.match(/data-action-id="upgrade"/g)).toHaveLength(1);
  });
});

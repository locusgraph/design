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

  it("renders the alert, a single quota and the empty keys state from state", () => {
    const over = {
      key: "spendgraph.events",
      period: "month",
      used: 120,
      included: 100,
      label: null,
    };
    const html = renderToStaticMarkup(
      <JSONUIProvider
        registry={registry}
        initialState={{ quotas: [over], links: { credits: "/credits", upgrade: "/plans" } }}
      >
        <Renderer
          registry={registry}
          spec={{
            root: "page",
            elements: {
              page: { type: "Stack", props: { gap: "md" }, children: ["alert", "quota", "empty"] },
              alert: {
                type: "UsageAlert",
                props: {
                  balanceMicroUsd: null,
                  quotas: { $state: "/quotas" },
                  paidPlan: false,
                  buyCreditsHref: { $state: "/links/credits" },
                  upgradeHref: { $state: "/links/upgrade" },
                },
              },
              quota: { type: "Quota", props: { quota: { $state: "/quotas/0" } } },
              empty: { type: "KeysEmpty", props: { newKeyHref: null, description: null } },
            },
          }}
        />
      </JSONUIProvider>
    );
    expect(html).toContain("Usage is over your plan");
    expect(html).toContain('href="/plans"');
    expect(html).toContain('data-slot="quota"');
  });

  it("locks TopUp while another block's action is settled", () => {
    const html = renderToStaticMarkup(
      <JSONUIProvider
        registry={registry}
        initialState={{
          packs: [{ id: "pack_10", priceCents: 1000, amountMicroUsd: 10_000_000 }],
          plans: [{ name: "Team", price: "$99.00 per month", points: ["More"], current: false }],
          settled: { actionId: "upgrade", target: "Team", label: "Moved to Team" },
          pending: null,
          locked: false,
        }}
      >
        <Renderer
          registry={registry}
          spec={{
            root: "page",
            elements: {
              page: { type: "Stack", props: { gap: "md" }, children: ["topup"] },
              topup: { type: "TopUp", props: { packs: { $state: "/packs" } } },
            },
          }}
        />
      </JSONUIProvider>
    );
    const buttons = html.match(/<button[^>]*>/g) ?? [];
    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons.every((button) => button.includes(' disabled=""'))).toBe(true);
    expect(html).not.toContain("Moved to Team");
  });
});

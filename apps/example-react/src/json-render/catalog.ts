import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { locusComponents } from "@locusgraph/json-render";

export const catalog = defineCatalog(schema, {
  components: { ...locusComponents },
  actions: {
    buyCredits: {
      description: "Open checkout for the pack at /selectedPackId, after a person approves",
    },
    planAction: { description: "Run the plan action at /picked, after a person approves" },
    keyAction: { description: "Run the key action at /picked, after a person approves" },
  },
});

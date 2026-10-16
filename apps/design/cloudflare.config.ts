import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "locus-design",
    compatibilityDate: "2026-08-06",
    domains: ["design.locusgraph.com"],
    assets: {
      notFoundHandling: "single-page-application",
    },
  },
});

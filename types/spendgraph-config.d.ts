declare module "@spendgraph/config/vitest" {
  import type { ViteUserConfig } from "vitest/config";

  export function packageTests(overrides?: ViteUserConfig): ViteUserConfig;

  export function appTests(importMetaUrl: string, overrides?: ViteUserConfig): ViteUserConfig;
}

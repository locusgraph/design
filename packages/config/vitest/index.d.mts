import type { ViteUserConfig } from "vitest/config";

export declare function packageTests(overrides?: ViteUserConfig): ViteUserConfig;

export declare function appTests(importMetaUrl: string, overrides?: ViteUserConfig): ViteUserConfig;

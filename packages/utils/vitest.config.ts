import { packageTests } from "@locusgraph/config/vitest";
import { defineConfig } from "vitest/config";

export default defineConfig(packageTests({ test: { include: ["src/**/*.test.ts"] } }));

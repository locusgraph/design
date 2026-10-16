import { fileURLToPath } from "node:url";

const merge = (base, extra) => ({
  ...base,
  ...extra,
  test: { ...base.test, ...extra.test },
});

export function packageTests(overrides = {}) {
  return merge({ test: { include: ["src/**/*.test.ts"] } }, overrides);
}

export function appTests(importMetaUrl, overrides = {}) {
  return merge(
    {
      resolve: { alias: { "@": fileURLToPath(new URL(".", importMetaUrl)) } },
      test: { include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"] },
    },
    overrides
  );
}

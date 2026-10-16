# @locusgraph/config

The Biome, TypeScript, Vitest, Cucumber, PostCSS and shadcn configuration LocusGraph projects share. It replaces `@spendgraph/config`; the theme and typography CSS moved to `@locusgraph/tokens`.

```bash
pnpm add -D @locusgraph/config
```

| Import | What it is |
|---|---|
| `@locusgraph/config/biome/base.json` | Biome rules for every package |
| `@locusgraph/config/biome/next.json` | Biome rules for a Next.js app |
| `@locusgraph/config/typescript/base.json` | Strict ES2022, bundler resolution |
| `@locusgraph/config/typescript/library.json` | `base` plus declarations |
| `@locusgraph/config/typescript/next.json` | A Next.js or vinext app |
| `@locusgraph/config/typescript/tests.json` | Overlay for test files: no emit, vitest globals |
| `@locusgraph/config/vitest` | `packageTests()` and `appTests(import.meta.url)` |
| `@locusgraph/config/cucumber` | `cucumber()` profile |
| `@locusgraph/config/postcss` | Tailwind v4 as a PostCSS plugin |
| `@locusgraph/config/shadcn/components.json` | shadcn CLI settings |

A config here never holds a path such as `outDir` or `include`: an extended config resolves paths against itself, so they belong to the project that extends it.

## Moving from `@spendgraph/config`

Replace `@spendgraph/config` with `@locusgraph/config` in every import and `extends`. Replace `@spendgraph/config/css/theme.css` and `css/typeset.css` with `@locusgraph/tokens/theme.css` and `@locusgraph/tokens/typeset.css`.

# LocusGraph Design

The design system behind LocusGraph apps: React components on Radix, an App shell and a Docs
shell, and one theme with light and dark modes.

| Package | What it is |
|---|---|
| [`@locusgraph/components`](packages/components) | React components on Radix, Rule Grid, the App and Docs shells and the theme. Start here |
| [`@locusgraph/blocks`](packages/blocks) | Usage, wallet, credit packs, plans and API-key sections built from components |
| [`@locusgraph/tokens`](packages/tokens) | The theme as CSS (palette, square radius, hairlines, fonts, motion) and as TypeScript values |
| [`@locusgraph/brand`](packages/brand) | The LocusGraph mark and wordmark, and the Google and GitHub marks |
| [`@locusgraph/email`](packages/email) | Transactional email templates in the same style |
| [`@locusgraph/utils`](packages/utils) | Money, counts, dates and quota helpers |
| [`@locusgraph/config`](packages/config) | Biome, TypeScript and Vitest settings, replacing `@spendgraph/config` |

Examples: [Next.js App Router](apps/example-next) and [React with Vite](apps/example-react).

- **Docs** ([apps/design](apps/design)): every component with a live playground, usage and props,
  at [design.locusgraph.com](https://design.locusgraph.com).

```bash
pnpm add @locusgraph/components
```

```css
@import "tailwindcss";
@import "@locusgraph/components/theme.css";
```

## Develop

```bash
pnpm install
pnpm dev      # docs on http://localhost:5180
pnpm check    # lint, typecheck, test
```

Fix a component here, not in a copy inside an app, and release it, so every app gets the fix.

## License

[MIT](LICENSE)

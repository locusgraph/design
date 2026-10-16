# LocusGraph Design

Design that keeps humans in the loop. The design system behind LocusGraph apps: React components
on Radix, product blocks, Loop (agent UI with the human in the loop), brand assets, and one theme
with light and dark modes. Icons are IBM Carbon (`@carbon/icons-react`).

| Package | What it is |
|---|---|
| [`@locusgraph/components`](packages/components) | React components on Radix, Rule Grid, the App and Docs shells and the theme. Start here |
| [`@locusgraph/blocks`](packages/blocks) | `Usage`, `UsageAlert`, `Wallet`, `TopUp`, `Plans` and `Keys`, with matching skeletons |
| [`@locusgraph/loop`](packages/loop) | Agent UI: chat, thinking, tools, approvals, memory and cost, on Vercel AI SDK message parts |
| [`@locusgraph/tokens`](packages/tokens) | The theme as CSS (palette, square radius, hairlines, fonts, motion) and as TypeScript values |
| [`@locusgraph/brand`](packages/brand) | The LocusGraph and SpendGraph marks, app icon, social card, and the Google and GitHub marks |
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

Or copy the source into your app with the shadcn CLI. Every component, block and Loop part is in the
registry at [design.locusgraph.com/r/registry.json](https://design.locusgraph.com/r/registry.json):

```bash
pnpm dlx shadcn@latest add https://design.locusgraph.com/r/theme.json https://design.locusgraph.com/r/approval.json
```

For AI agents, [design.locusgraph.com/DESIGN.md](https://design.locusgraph.com/DESIGN.md) lists every page
with a Markdown version of each.

## Develop

```bash
pnpm install
pnpm dev             # docs on http://localhost:5180
pnpm check           # lint, typecheck, test, registry build
pnpm registry:test   # install every registry item into a fresh shadcn app and build it
```

Fix a component here, not in a copy inside an app, and release it, so every app gets the fix.

## License

[MIT](LICENSE)

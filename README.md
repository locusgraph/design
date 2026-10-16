# LocusGraph Design

The design system behind LocusGraph apps: React components on Radix, an App shell and a Docs
shell, and one theme with light and dark modes.

- **`@locusgraph/components`** ([packages/components](packages/components)): install it in any
  React 19 + Tailwind CSS 4 app. See its [README](packages/components/README.md).
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

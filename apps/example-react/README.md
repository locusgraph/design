# React example

A Vite and React app built from the LocusGraph packages without a shell: a header with the `@locusgraph/brand` wordmark, `Tabs` from `@locusgraph/components`, the `@locusgraph/blocks` sections, and `@locusgraph/email` templates rendered in the browser.

```bash
pnpm --filter @locusgraph/example-react dev   # http://localhost:3200
```

What a Vite app needs:

- `@tailwindcss/vite` in `vite.config.ts`.
- `src/globals.css` imports Tailwind, `tw-animate-css`, `@locusgraph/components/theme.css`, and the `sources.css` of `blocks` and `brand`.
- Toggle the `dark` class on `<html>` for dark mode.

The json-render tab (`src/json-render`) renders a billing page from a JSON spec with `@json-render/react`. The catalog describes Locus Design blocks to a model, the registry maps each catalog entry to the real component, and the spec binds data from state, so the model picks layout and never writes numbers.

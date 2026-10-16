# Next.js example

An App Router app built from the LocusGraph packages: `AppShell` from `@locusgraph/components` with `@locusgraph/brand` in the sidebar, an overview made of `@locusgraph/blocks`, money from `@locusgraph/utils`, and email previews from `@locusgraph/email` rendered in a client component.

```bash
pnpm --filter @locusgraph/example-next dev   # http://localhost:3100
```

What a Next.js app needs:

- `app/globals.css` imports Tailwind, `tw-animate-css`, `@locusgraph/components/theme.css`, and the `sources.css` of `blocks` and `brand` so Tailwind sees their classes.
- `postcss.config.mjs` re-exports `@locusgraph/config/postcss`.
- `next.config.ts` lists the packages in `transpilePackages`. That is only needed inside this workspace, where they point at TypeScript source; installed from npm they are already built.
- Blocks with callbacks, such as `CreditPacks`, live in a `"use client"` component. Pass Next's `Link` as `linkComponent`.
- Next does not allow `react-dom/server` in Server Components or route handlers, so render `@locusgraph/email` templates in your backend or Worker, or in a client component for previews.

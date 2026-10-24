# design

The LocusGraph design system: seven npm packages under `packages/` and the docs site in `apps/design` (design.locusgraph.com).

## Code rules

These rules apply to every source file. They are not suggestions.

### 1. A file is at most 200 lines

- Count every line, including imports and blank lines.
- When a file would pass 200 lines, split it by responsibility before adding more.
- Split along real boundaries (one route, one schema, one concern per file), not at an arbitrary line.

### 2. A folder holds at most 5 files

- When a folder would get a 6th file, group related files into a subfolder named after what they share.
- Subfolders do not count toward the 5. A folder can have 5 files plus any number of subfolders.
- Example: `routes/` with `entitlements.ts`, `usage.ts`, `billing.ts`, `orgs.ts`, `members.ts` needs a 6th route, so `orgs.ts` and `members.ts` move to `routes/orgs/`.
- Exempt: package and tool config at a package or repo root (`package.json`, `tsconfig.json`, `vitest.config.ts`, `vite.config.ts`, `biome.json`, lockfiles).

### 3. No comments in code

- Write code that explains itself: precise names for variables, functions, types and files.
- When logic is not obvious, extract it into a function whose name says what it does.
- No commented-out code, no TODO comments, no section dividers.
- Allowed only where a tool requires it: `// @ts-expect-error` with a reason, and Biome ignore directives.

### Exempt from these rules

- `dist/` and other generated output.
- Vendored third-party files in a `vendor/` folder, such as `packages/tokens/src/vendor/typeset.css` from shadcn/typeset. Keep them verbatim so updates stay a copy.

## Layout

- `packages/config`: `@locusgraph/config`, Biome, TypeScript, Vitest, Cucumber, PostCSS and shadcn settings. Replaces `@spendgraph/config`
- `packages/tokens`: `@locusgraph/tokens`, `theme.css` (palette, Tailwind mapping, base, brand effects, motion), `typeset.css`, the optional `shadcn.css` aliases, and the color and type values as TypeScript
- `packages/utils`: `@locusgraph/utils`, money in cents and micro-USD, counts, dates, quota and balance status. No dependencies
- `packages/brand`: `@locusgraph/brand`, the LocusGraph and SpendGraph marks and wordmarks, `LocusGraphIcon`, `SocialCard` (inline styles, works in Next.js `ImageResponse`) and the Google and GitHub marks, as React and SVG
- `packages/components`: `@locusgraph/components`, Radix based React components, Rule Grid, the App and Docs shells, and `theme.css` (tokens plus a Tailwind source for the components)
- `packages/blocks`: `@locusgraph/blocks`, product sections (`Usage`, `UsageAlert`, `Quota`, `Wallet`, `TopUp`, `Plans`, `Keys`, `KeysEmpty` and their skeletons) built from components. Props and callbacks only, never fetching
- `packages/loop`: `@locusgraph/loop`, agent UI (chat, thread, agent, approval, memory, cost) on Vercel AI SDK `UIMessage` parts. Never calls a model
- `packages/email`: `@locusgraph/email`, transactional email templates with inline styles from tokens

Dependencies flow one way: `config` ← every package; `tokens` ← `components`, `email`; `utils` ← `blocks`, `loop`, `email`; `brand` ← `loop`; `components` ← `blocks`, `loop`. Never import upward.

Everything the theme defines is prefixed with `locus` so it never clashes with an app's own CSS: variables are `--locus-*` (`packages/tokens/src/variables/palette.css`, light on `:root`, dark on `.dark`), and our classes, utilities and keyframes are `locus-*` (`locus-eyebrow`, `locus-shimmer`, `.locus-brand-grid`). `theme.css` never defines the unprefixed shadcn names (`--background`, `--muted`, `--primary`); `shadcn.css` (`@locusgraph/tokens/shadcn.css`, re-exported as `@locusgraph/components/shadcn.css`) maps them to ours for apps that also use shadcn components, and components must work without it. The Tailwind keys in `variables/mapping.css` keep their names (`bg-surface`, `text-faint`, `bg-primary`, `text-muted-foreground`) and point at `--locus-*`. `data-slot` attributes stay as shadcn names them.

Icons come from `@phosphor-icons/react`, imported from `@phosphor-icons/react/ssr` (no context, so it works in server components) under the local name the code uses (`import { X as XIcon } from "@phosphor-icons/react/ssr"`). Render every icon bold and hidden from screen readers: `<XIcon weight="bold" aria-hidden />`, or `weight="fill"` for a filled state. Import the `Icon` type from `@phosphor-icons/react`.
- `apps/design`: playground and docs for every component (Vite), one `src/demos/<group>/<name>.demo.tsx` per component, the landing page at `/`, the shells at `/shells`, `/DESIGN.md` and one `<path>.md` per page for agents (`src/agent-docs`, `plugins/agent-docs.ts`), deployed to design.locusgraph.com as a Cloudflare Worker (`cloudflare.config.ts`)
- `scripts/registry`: builds the shadcn registry into `apps/design/public/r` (one item per source file, a bundle per docs page without one, and the `theme` item) and `install-test/` installs every item into a fresh `shadcn init` app and builds it
- `apps/example-next` (port 3100) and `apps/example-react` (port 3200): small apps that use the packages the way a product would, in Next.js App Router and in Vite. Keep them building; they are the check that the packages work outside the docs site

`components`, `blocks` and `loop` build with `tsc` (JSX preserved), then `scripts/react-compiler.mjs` (React Compiler, target React 19), then `scripts/esm-extensions.mjs`. The compiler step fails the build when a component bails out; fix the code, or add a `"use no memo"` directive where a library is known to be incompatible (TanStack Virtual's `useVirtualizer`). `brand` is not compiled: its marks render inside Satori (`ImageResponse`), which calls components without React's hook dispatcher. `node scripts/perf/bench-loop.mjs` times Loop's long lists against the built `dist` in happy-dom.

Components that import Radix use its subpaths (`radix-ui/dialog`), never the `radix-ui` root: the root import hangs the vinext RSC build of apps that use this package.

## Commands

```bash
pnpm install
pnpm check                                   # lint, typecheck, test, registry build
pnpm dev                                     # docs site on port 5180
pnpm registry:test                           # every registry item into a fresh shadcn app, tsc and next build
pnpm --filter @locusgraph/components pack    # build and inspect the publish tarball, no upload
cd apps/design && pnpm run deploy            # registry, build and deploy to design.locusgraph.com
```

## Releases

Bump `version` in `packages/<folder>/package.json`, merge, then push the tag `<folder>-v<version>` (for example `tokens-v0.1.0`). The `publish` workflow finds the package from the tag, checks the tag matches the version, typechecks, tests, builds and publishes to npm with provenance, using the `NPM_TOKEN` repository secret. Publish a dependency before the packages that use it: `config`, `tokens`, `utils`, `brand`, then `components`, then `blocks`, `loop` and `email`. Semver: a fix is a patch, a new component or prop a minor, a removed or renamed export, prop or token a major (while 0.x, a minor).

## Commits

Enforced by `.githooks/commit-msg` (run `pnpm run prepare` once after cloning):

- One line only: `type(folder): what it does`
- `type` is one of feat, fix, chore, docs, refactor, test, build, ci, perf, style, revert
- `folder` is a package folder (`config`, `tokens`, `utils`, `brand`, `components`, `blocks`, `loop`, `email`), `design`, or `repo`
- Lowercase description, no trailing period, at most 100 characters
- No `Co-Authored-By` trailer

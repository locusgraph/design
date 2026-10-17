# @locusgraph/components

The LocusGraph design system: React components on Radix, the App and Docs shells, and the theme
(`theme.css`) every LocusGraph app uses. See every component with a live playground in
`apps/design` (`pnpm --filter @locusgraph/design dev`, port 5180).

## Use it in an app

Needs React 19 and Tailwind CSS 4.

```bash
pnpm add @locusgraph/components
```

In the app's main stylesheet, after Tailwind:

```css
@import "tailwindcss";
@import "@locusgraph/components/theme.css";
```

The theme brings the fonts, the colour tokens (light and dark), and tells Tailwind to scan this
package, so the classes the components use are generated in your app. Every variable the theme
defines is `--locus-*`, so it never clashes with an app's own. An app that also uses its own shadcn
components adds the shadcn variable names (`--background`, `--primary`, `--muted-foreground`, …)
as aliases of ours:

```css
@import "tailwindcss";
@import "@locusgraph/components/theme.css";
@import "@locusgraph/components/shadcn.css";
```

Then:

```tsx
import { Button, AppShell, AppSidebar, AppHeader } from "@locusgraph/components";
```

Moving an app from its own shadcn copies: replace `@/components/ui/<name>` imports with
`@locusgraph/components` one component at a time, and delete the local copy once nothing imports
it. Keep app-specific components in the app; move one here only when a second app needs it.

## Migrating from 0.2

Every CSS variable, class, utility and keyframe the theme defines now starts with `locus`, so it
cannot clash with an app's own names (a shadcn app's `--muted` is a background, ours was a text
color). Tailwind classes such as `bg-surface`, `text-soft`, `text-good`, `bg-btn`, `shadow-overlay`,
`bg-primary` and `text-muted-foreground` are unchanged.

| 0.2 | 0.3 |
|---|---|
| `--background`, `--surface`, `--foreground`, `--border`, `--muted`, `--faint` | `--locus-background`, `--locus-surface`, `--locus-foreground`, `--locus-border`, `--locus-muted`, `--locus-faint` |
| `--btn`, `--btn-ink`, `--ghost`, `--popover`, `--popover-foreground`, `--input` | `--locus-btn`, `--locus-btn-ink`, `--locus-ghost`, `--locus-popover`, `--locus-popover-foreground`, `--locus-input` |
| `--s1` … `--s8`, `--good`, `--bad`, `--info`, `--warn` | `--locus-s1` … `--locus-s8`, `--locus-good`, `--locus-bad`, `--locus-info`, `--locus-warn` |
| `--skeleton`, `--scrim`, `--overlay-shadow`, `--radius` | `--locus-skeleton`, `--locus-scrim`, `--locus-overlay-shadow`, `--locus-radius` |
| `--sidebar`, `--sidebar-*`, `--chart-1` … `--chart-5` | `--locus-sidebar`, `--locus-sidebar-*`, `--locus-chart-1` … `--locus-chart-5` |
| `--font-inter`, `--font-archivo`, `--font-fira-code` | `--locus-font-inter`, `--locus-font-archivo`, `--locus-font-fira-code` |
| `--brand-glow`, `--brand-loop`, `--brand-grid-image`, `--brand-grid-size` | `--locus-brand-glow`, `--locus-brand-loop`, `--locus-brand-grid-image`, `--locus-brand-grid-size` |
| `--shimmer-spread`, `--shimmer-color`, `--shimmer-duration` | `--locus-shimmer-spread`, `--locus-shimmer-color`, `--locus-shimmer-duration` |
| `--scroll-fade-size`, `--scroll-fade-reveal` | `--locus-scroll-fade-size`, `--locus-scroll-fade-reveal` |
| `--docs-header-height` (Docs shell) | `--locus-docs-header-height` |
| `eyebrow`, `rises`, `shimmer` | `locus-eyebrow`, `locus-rises`, `locus-shimmer` |
| `no-scrollbar`, `scrollbar-none`, `scrollbar-thin`, `scrollbar-gutter-stable` | `locus-no-scrollbar`, `locus-scrollbar-none`, `locus-scrollbar-thin`, `locus-scrollbar-gutter-stable` |
| `scroll-fade-b`, `scroll-fade-x` | `locus-scroll-fade-b`, `locus-scroll-fade-x` |
| `.brand-grid`, `.brand-grid-quiet`, `.ignites`, `.tracked` | `.locus-brand-grid`, `.locus-brand-grid-quiet`, `.locus-ignites`, `.locus-tracked` |
| `.enter-cascade`, `.typeset-docs` | `.locus-enter-cascade`, `.locus-typeset-docs` |
| keyframes `rise`, `sweep`, `ink`, `tip`, `tick`, `breathe`, `ignite` | `locus-rise`, `locus-sweep`, `locus-ink`, `locus-tip`, `locus-tick`, `locus-breathe`, `locus-ignite` |
| keyframes `tw-shimmer`, `enter-rise`, `enter-fade`, `brand-grid-halo`, `scroll-fade-reveal-*` | `locus-shimmer`, `locus-enter-rise`, `locus-enter-fade`, `locus-brand-grid-halo`, `locus-scroll-fade-reveal-*` |

The theme no longer defines the shadcn names (`--background`, `--primary`, `--muted-foreground`,
`--ring`, `--radius` and the rest). An app that also uses its own shadcn components, or reads those
variables, imports the aliases after the theme:

```css
@import "@locusgraph/components/shadcn.css";
```

## Change it

Fix or improve a component in this repo, never in a copy inside an app, so every app gets the change.

1. Change the component in `src/`, its demo in `apps/design/src/demos/`, and its test.
2. `pnpm --filter @locusgraph/components typecheck && pnpm --filter @locusgraph/components test`.
3. Bump `version` in this `package.json` (semver: a fix is a patch, a new component or prop a
   minor, a removed or renamed export, prop or token a major; while the version is 0.x, a
   breaking change is a minor).
4. Merge, then push the tag `components-v<version>`. The `publish-components` workflow tests,
   builds and publishes to npm.

## Update an app to a new version

```bash
pnpm up @locusgraph/components
```

A patch or minor release needs no change in the app. Read the release's commits before a major
(or a 0.x minor), and check the app's pages after updating.

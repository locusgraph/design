# @locusgraph/tokens

The LocusGraph theme for Tailwind CSS 4, and the same values as TypeScript for places CSS cannot reach, such as email.

```bash
pnpm add @locusgraph/tokens
```

```css
@import "tailwindcss";
@import "@locusgraph/tokens/theme.css";
@import "@locusgraph/tokens/typeset.css";
```

`@locusgraph/components/theme.css` already imports both; import tokens directly only in an app that does not use the components.

Everything the theme defines is prefixed with `locus`: variables are `--locus-*` (light on `:root`, dark on `.dark`) and our classes, utilities and keyframes are `locus-*`. The Tailwind keys keep their names (`bg-surface`, `text-soft`, `bg-primary`, `text-muted-foreground`), now pointing at `--locus-*`. An app that also uses shadcn components and needs the shadcn variable names (`--background`, `--primary`, `--muted-foreground`, `--radius`, …) adds the optional aliases:

```css
@import "@locusgraph/tokens/shadcn.css";
```

## What `theme.css` holds

- Palette: one white (`--locus-surface`, also `--locus-background`), text, muted, status colors and a dark set under `.dark`.
- Hairlines: `--locus-border` is 13% of the text color mixed into the surface.
- Square containers: every radius token is 0. Use `rounded-full` for pills.
- Fonts: Inter for text, Archivo for headings and the brand, Fira Code for mono labels.
- Base: 17px root size, tight balanced headings, `text-pretty` paragraphs.
- Effects: `locus-brand-grid` and `locus-brand-grid-quiet` backgrounds, `locus-enter-cascade`, `locus-rises`, `locus-shimmer`, `locus-scroll-fade-b`, `locus-scroll-fade-x`, `locus-no-scrollbar`, `locus-scrollbar-none`, `locus-scrollbar-thin`, `locus-scrollbar-gutter-stable`, the `locus-eyebrow` label, `locus-ignites` and `locus-tracked`. Motion falls back to a fade under reduced motion.

`typeset.css` styles long-form content inside `.typeset`; it is vendored from shadcn/typeset.

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

## Values

```ts
import { darkColors, fonts, hairline, lightColors, radius } from "@locusgraph/tokens";

hairline(lightColors);
```

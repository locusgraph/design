# @locusgraph/tokens

[![npm](https://img.shields.io/npm/v/@locusgraph/tokens?color=111111&style=flat-square)](https://www.npmjs.com/package/@locusgraph/tokens) [![MIT license](https://img.shields.io/badge/license-MIT-111111?style=flat-square)](https://github.com/locusgraph/design/blob/master/LICENSE)

[Docs](https://design.locusgraph.com/theming) · [Source](https://github.com/locusgraph/design/tree/master/packages/tokens) · [All packages](https://github.com/locusgraph/design#packages)

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

Everything the theme defines is prefixed with `locus`: variables are `--locus-*` (light on `:root`, dark on `.dark`) and our classes, utilities and keyframes are `locus-*`. The Tailwind keys keep their names (`bg-surface`, `text-faint`, `bg-primary`, `text-muted-foreground`), now pointing at `--locus-*`. An app that also uses shadcn components and needs the shadcn variable names (`--background`, `--primary`, `--muted-foreground`, `--radius`, …) adds the optional aliases:

```css
@import "@locusgraph/tokens/shadcn.css";
```

## What `theme.css` holds

- Palette: `--locus-background` for the page, `--locus-surface` for cards and panels, `--locus-foreground`, `--locus-muted-foreground` and `--locus-faint` for text tones, `--locus-muted` for fills, and a dark set under `.dark`. Every text tone passes WCAG AA on background, surface and muted in both themes.
- Role colors: `interactive` (clickable, on hover), `memory` (remembered), `good`, `warn` (waiting) and `destructive`. Color means state; chart series `--locus-s1` to `--locus-s8` carry no meaning.
- Fill colors: `--locus-good-fill` and `--locus-warn-fill` (`bg-good-fill`, `bg-warn-fill`) for bars and meters. They are brighter than the role colors in light and equal to them in dark; never use them for text.
- Hairlines: `--locus-border` is the text color mixed into the surface, 9% light and 10% dark.
- Square containers: every radius token is 0. Buttons, chips, badges, dots and avatars use `rounded-full`.
- Fonts: IBM Plex Sans for text, inputs and menus, Archivo for headings, `locus-eyebrow` labels, buttons and the brand, IBM Plex Mono for code and ids.
- Base: interactive elements (buttons, tabs, options, switches, `summary`, `label[for]`) get `cursor: pointer` unless disabled.
- Type scale: Tailwind's steps plus `text-2xs` (0.6875rem) for badges and counters and `text-code` (0.8125rem) for code.
- Control heights: `h-control-xs` (1.5rem), `h-control-sm` (2rem), `h-control` (2.25rem) and `h-control-lg` (2.5rem), also as `size-control-*`.
- Focus: `locus-focus-ring` draws a 2px ring outside the element; `locus-focus-ring-inset` draws it inside for rows, tabs and scroll areas.
- Base: 17px root size, tight balanced headings, `text-pretty` paragraphs.
- Effects: `locus-brand-grid` and `locus-brand-grid-quiet` backgrounds, `locus-enter-cascade`, `locus-rises`, `locus-shimmer`, `locus-scroll-fade-b`, `locus-scroll-fade-x`, `locus-no-scrollbar`, `locus-scrollbar-none`, `locus-scrollbar-thin`, `locus-scrollbar-gutter-stable`, the `locus-eyebrow` label, `locus-ignites` and `locus-tracked`. Motion falls back to a fade under reduced motion.

`typeset.css` styles long-form content inside `.typeset`, vendored from shadcn/typeset. Add `locus-typeset-chat` for agent replies: 14px, sans headings, tables without row rules.

## Migrating from 0.3

The role colors are renamed so each one names its meaning, and the gray text tones are darker so they pass WCAG AA.

| 0.3 | 0.4 |
|---|---|
| `--locus-muted` (gray text) | `--locus-muted-foreground` |
| `--locus-ghost` (fill) | `--locus-muted` |
| `--locus-bad`, `text-bad` | `--locus-destructive`, `text-destructive` |
| `--locus-info`, `text-info` | `--locus-interactive`, `text-interactive` |
| `text-soft`, `border-line`, `bg-ghost`, `bg-btn`, `bg-btn-ink` | `text-muted-foreground`, `border-border`, `bg-muted`, `bg-primary`, `text-primary-foreground` |
| `locus-focus-ring`, `locus-focus-ring-inset`, `typeset-chat` | `locus-focus-ring`, `locus-focus-ring-inset`, `locus-typeset-chat` |

New: `--locus-memory` (`text-memory`), `--locus-destructive-foreground`, `text-2xs`, `text-code` and the `h-control-*` heights.

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
| `--font-ibm-plex-sans`, `--font-archivo`, `--font-ibm-plex-mono` | `--locus-font-ibm-plex-sans`, `--locus-font-archivo`, `--locus-font-ibm-plex-mono` |
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

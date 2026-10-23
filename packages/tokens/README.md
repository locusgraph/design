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

## What `theme.css` holds

- Palette: `--background` for the page, `--surface` for cards and panels, `--foreground`, `--muted-foreground` and `--faint` for text tones, `--muted` for fills, and a dark set under `.dark`. Every text tone passes WCAG AA on background, surface and muted in both themes.
- Role colors: `interactive` (clickable, on hover), `memory` (remembered), `good`, `warn` (waiting) and `destructive`. Color means state; chart series `--s1` to `--s8` carry no meaning.
- Hairlines: `--border` is the text color mixed into the surface, 9% light and 10% dark.
- Square containers: every radius token is 0. Buttons, chips, badges, dots and avatars use `rounded-full`.
- Fonts: Inter for text, Archivo for headings and the brand, Fira Code for mono labels.
- Type scale: Tailwind's steps plus `text-2xs` (0.6875rem) for badges and counters and `text-code` (0.8125rem) for code.
- Control heights: `h-control-xs` (1.5rem), `h-control-sm` (2rem), `h-control` (2.25rem) and `h-control-lg` (2.5rem), also as `size-control-*`.
- Focus: `focus-ring` draws a 2px ring outside the element; `focus-ring-inset` draws it inside for rows, tabs and scroll areas.
- Base: 17px root size, tight balanced headings, `text-pretty` paragraphs.
- Effects: `brand-grid` and `brand-grid-quiet` backgrounds, `enter-cascade`, `rises`, `shimmer`, `scroll-fade-x`, `no-scrollbar`. Motion falls back to a fade under reduced motion.

`typeset.css` styles long-form content inside `.typeset`, vendored from shadcn/typeset. Add `typeset-chat` for agent replies: 14px, sans headings, tables without row rules.

## Values

```ts
import { darkColors, fonts, hairline, lightColors, radius } from "@locusgraph/tokens";

hairline(lightColors);
```

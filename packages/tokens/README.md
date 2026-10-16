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

- Palette: one white (`--surface`, also `--background`), text, muted, status colors and a dark set under `.dark`.
- Hairlines: `--border` is 13% of the text color mixed into the surface.
- Square containers: every radius token is 0. Use `rounded-full` for pills.
- Fonts: Inter for text, Archivo for headings and the brand, Fira Code for mono labels.
- Base: 17px root size, tight balanced headings, `text-pretty` paragraphs.
- Effects: `brand-grid` and `brand-grid-quiet` backgrounds, `enter-cascade`, `rises`, `shimmer`, `scroll-fade-x`, `no-scrollbar`. Motion falls back to a fade under reduced motion.

`typeset.css` styles long-form content inside `.typeset`; it is vendored from shadcn/typeset.

## Values

```ts
import { darkColors, fonts, hairline, lightColors, radius } from "@locusgraph/tokens";

hairline(lightColors);
```

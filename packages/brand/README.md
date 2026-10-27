# @locusgraph/brand

[![npm](https://img.shields.io/npm/v/@locusgraph/brand?color=111111&style=flat-square)](https://www.npmjs.com/package/@locusgraph/brand) [![MIT license](https://img.shields.io/badge/license-MIT-111111?style=flat-square)](https://github.com/locusgraph/design/blob/master/LICENSE)

[Docs](https://design.locusgraph.com/brand) · [Source](https://github.com/locusgraph/design/tree/master/packages/brand) · [All packages](https://github.com/locusgraph/design#packages)

The LocusGraph mark and wordmark, and the Google and GitHub marks for sign-in buttons. React components, plus SVG files for favicons and anything that is not React.

```bash
pnpm add @locusgraph/brand
```

```css
@import "@locusgraph/brand/sources.css";
```

The wordmark uses Tailwind classes, so add that line next to your theme import.

```tsx
import { GitHubMark, GoogleMark, LocusGraphMark, LocusGraphWordmark } from "@locusgraph/brand";

<LocusGraphMark className="size-5" />
<LocusGraphWordmark withMark />
```

The LocusGraph mark and the GitHub mark draw in the current text color, so they follow light and dark mode. The Google mark keeps Google's colors, as its brand rules require. Every mark is `aria-hidden`; put the name in visible text or an `aria-label` next to it.

SVG files ship at `@locusgraph/brand/svg/locusgraph-mark.svg`, `google-mark.svg`, `github-mark.svg` and `locusgraph-icon-{dark,light,brand}.svg` (512px).

## Product marks

`SpendGraphWordmark` matches `LocusGraphWordmark`. `ProductWordmark` takes `product: "locusgraph" | "spendgraph"`.

```tsx
<ProductWordmark product="spendgraph" withMark />
```

## App icon

`LocusGraphIcon` draws the mark on a square tile as one SVG, for favicons and app icons. `size` is in pixels (default 64) and `variant` is `dark`, `light` or `brand`. It renders in Next.js `ImageResponse`:

```tsx
import { LocusGraphIcon } from "@locusgraph/brand";
import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<LocusGraphIcon size={512} variant="brand" />, size);
}
```

## Social card

`SocialCard` is a 1200×630 Open Graph image built with inline styles and flexbox only, so the same component renders in the browser and in `ImageResponse`. Props: `title`, `description`, `product`, `url`, `theme` (`dark` or `light`) and `brand`, which replaces the LocusGraph mark and wordmark in the top row; `socialCardSize` and `socialCardFonts` help set up `opengraph-image.tsx`.

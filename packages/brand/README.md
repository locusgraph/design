# @locusgraph/brand

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

SVG files ship at `@locusgraph/brand/svg/locusgraph-mark.svg`, `google-mark.svg` and `github-mark.svg`.

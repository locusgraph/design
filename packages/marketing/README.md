# @locusgraph/marketing

[![npm](https://img.shields.io/npm/v/@locusgraph/marketing?color=111111&style=flat-square)](https://www.npmjs.com/package/@locusgraph/marketing) [![MIT license](https://img.shields.io/badge/license-MIT-111111?style=flat-square)](https://github.com/locusgraph/design/blob/master/LICENSE)

[Docs](https://design.locusgraph.com/marketing) · [Source](https://github.com/locusgraph/design/tree/master/packages/marketing) · [All packages](https://github.com/locusgraph/design#packages)

Landing page sections built from `@locusgraph/components`. Every block takes its content as props, so a template passes data instead of editing markup. Blocks are server components; only the interactive parts (the navbar's mobile menu) are client components, so a page stays server rendered in the Next.js App Router.

It is a separate package from `@locusgraph/blocks` so product apps never scan or ship marketing styles, and marketing releases never bump the blocks that apps and `@locusgraph/json-render` depend on.

```bash
pnpm add @locusgraph/marketing @locusgraph/components
```

```css
@import "@locusgraph/components/theme.css";
@import "@locusgraph/marketing/sources.css";
```

| Block | Props |
|---|---|
| `Navbar` | `logo`, `logoHref`, `links`, `actions`, `end` (such as a theme toggle), `menuLabel`, `sticky`, `linkComponent`. Links and actions move into a sheet below the `md` breakpoint |
| `Hero` | `title` (the page `h1`), `description`, `eyebrow`, `actions`, `media` (screenshot, video or illustration), `layout` (`centered` or `split`), `linkComponent` |
| `Footer` | `logo`, `tagline`, `columns` (`{ title, links }[]`), `legal`, `copyright`, `end`, `linkComponent` |
| `MarketingActions` | `actions`, `size`, `linkComponent`. The buttons the blocks use: the first action is primary, the rest outline, unless an action sets `variant` |

Links are `{ label, href }`; actions add an optional `variant` (`default`, `outline` or `ghost`). Pass your router's link as `linkComponent` (`next/link` in Next.js).

```tsx
import { Footer, Hero, Navbar } from "@locusgraph/marketing";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar
        logo={<Logo />}
        links={[{ label: "Pricing", href: "/pricing" }]}
        actions={[{ label: "Start free", href: "/signup" }]}
        linkComponent={Link}
      />
      <Hero
        layout="split"
        title="Every agent run, priced"
        description="See what each run costs before you approve it."
        actions={[{ label: "Start free", href: "/signup" }]}
        media={<Screenshot />}
        linkComponent={Link}
      />
      <Footer copyright="© 2026 Acme" legal={[{ label: "Privacy", href: "/privacy" }]} />
    </>
  );
}
```

Blocks use the theme's tokens only, so they follow any theme set with the shadcn variables (see `@locusgraph/tokens`).

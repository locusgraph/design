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
package, so the classes the components use are generated in your app. Then:

```tsx
import { Button, AppShell, AppSidebar, AppHeader } from "@locusgraph/components";
```

Moving an app from its own shadcn copies: replace `@/components/ui/<name>` imports with
`@locusgraph/components` one component at a time, and delete the local copy once nothing imports
it. Keep app-specific components in the app; move one here only when a second app needs it.

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

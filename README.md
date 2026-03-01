# Locusgraph Design

Monorepo for Locus design system: UI components, SVG assets, and the design/dev site.

## Structure

| Package | Description |
|--------|-------------|
| **www** | Design site (Vite + React). Showcases components and tokens. |
| **components** | `@locus/components` — React UI components (Radix, Tailwind). |
| **svgs** | `@locus/svgs` — SVG icon/asset components. |

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 9+

## Install

```bash
pnpm install
```

## Scripts

From the repo root:

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the www dev server. |
| `pnpm build` | Build the www app. |
| `pnpm typecheck` | Run TypeScript check in all packages. |

Per-package:

```bash
pnpm --filter @locus/www dev
pnpm --filter @locus/components typecheck
pnpm --filter @locus/svgs typecheck
```

## Deploy

The app is built to run at **/theme** (e.g. `https://design.locusgraph.com/theme`).

- **Vercel:** [vercel.json](vercel.json) is set up with the right rewrites so `/theme` and `/theme/*` serve the SPA and `/theme/assets/*` serve built files.
- **Other hosts (Reloda, Netlify, Cloudflare, etc.):** Configure SPA fallback so that:
  - `/theme` and `/theme/*` (except static files) serve your built `index.html`.
  - `/theme/assets/*` is served from the build’s `assets/` folder (or equivalent rewrite).

Build output is in `www/dist/`. Use that as the deployment root and apply the rewrites above.

## Release

Packages are published to [GitHub Packages](https://github.com/features/packages) (npm registry).

- **From a release:** Create a GitHub Release from a version tag (e.g. `v0.0.2`). The [Release to GitHub Packages](.github/workflows/release.yml) workflow runs and publishes `@locus/components` and `@locus/svgs`.
- **Manual run:** Actions → “Release to GitHub Packages” → Run workflow, optionally set the version input.

Consumers install with:

```bash
npm install @locus/components @locus/svgs
# or
pnpm add @locus/components @locus/svgs
```

Configure `.npmrc` so the `@locus` scope uses GitHub’s registry (see root [.npmrc](.npmrc)).

## License

Private / see repository settings.

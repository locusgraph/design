# design

The LocusGraph design system: `@locusgraph/components` (published to npm) and the docs site in `apps/design` (design.locusgraph.com).

## Code rules

These rules apply to every source file. They are not suggestions.

### 1. A file is at most 200 lines

- Count every line, including imports and blank lines.
- When a file would pass 200 lines, split it by responsibility before adding more.
- Split along real boundaries (one route, one schema, one concern per file), not at an arbitrary line.

### 2. A folder holds at most 5 files

- When a folder would get a 6th file, group related files into a subfolder named after what they share.
- Subfolders do not count toward the 5. A folder can have 5 files plus any number of subfolders.
- Example: `routes/` with `entitlements.ts`, `usage.ts`, `billing.ts`, `orgs.ts`, `members.ts` needs a 6th route, so `orgs.ts` and `members.ts` move to `routes/orgs/`.
- Exempt: package and tool config at a package or repo root (`package.json`, `tsconfig.json`, `vitest.config.ts`, `vite.config.ts`, `biome.json`, lockfiles).

### 3. No comments in code

- Write code that explains itself: precise names for variables, functions, types and files.
- When logic is not obvious, extract it into a function whose name says what it does.
- No commented-out code, no TODO comments, no section dividers.
- Allowed only where a tool requires it: `// @ts-expect-error` with a reason, and Biome ignore directives.

### Exempt from these rules

- `dist/` and other generated output.

## Layout

- `packages/components`: `@locusgraph/components`, Radix based React components, the App and Docs shells, and `theme.css`. Published to public npm
- `apps/design`: playground and docs for every component (Vite), one `src/demos/<group>/<name>.demo.tsx` per component, and the shells at `/shells`

Components that import Radix use its subpaths (`radix-ui/dialog`), never the `radix-ui` root: the root import hangs the vinext RSC build of apps that use this package.

## Commands

```bash
pnpm install
pnpm check                                   # lint, typecheck, test
pnpm dev                                     # docs site on port 5180
pnpm --filter @locusgraph/components pack    # build and inspect the publish tarball, no upload
```

## Releases

Bump `version` in `packages/components/package.json`, merge, then push the tag `components-v<version>`. The `publish-components` workflow checks the tag matches the version, tests, builds and publishes to npm with provenance, using the `NPM_TOKEN` repository secret. Semver: a fix is a patch, a new component or prop a minor, a removed or renamed export, prop or token a major (while 0.x, a minor).

## Commits

Enforced by `.githooks/commit-msg` (run `pnpm run prepare` once after cloning):

- One line only: `type(folder): what it does`
- `type` is one of feat, fix, chore, docs, refactor, test, build, ci, perf, style, revert
- `folder` is `components`, `design`, or `repo`
- Lowercase description, no trailing period, at most 100 characters
- No `Co-Authored-By` trailer

import type { DemoEntry } from "../registry/load-demos";
import { libraries, libraryOfGroup } from "../shell/nav/libraries";
import type { GuideDoc } from "./guide-markdown";

export const siteOrigin = "https://design.locusgraph.com";

const intro = `# Locus Design

> Locus Design, a design system for agent products: components, product blocks (\`@locusgraph/blocks\`), an agent kit with the human in the loop (\`@locusgraph/loop\`), a json-render catalog so a model can lay out screens as JSON (\`@locusgraph/json-render\`) and brand assets. React 19, Tailwind v4, Radix. Light and dark.

Every page below has a Markdown version: add \`.md\` to its path. Fetch the ones you need instead of guessing props. The App and Docs shells (\`AppShell\`, \`AppSidebar\`, \`AppHeader\`, \`DocsShell\`) are shown at ${siteOrigin}/shells, which has no Markdown version. \`Sidebar\` and its parts, \`SkipLink\` and \`ThemeToggle\` are exported from \`@locusgraph/components\` but have no docs page yet.

## Install

\`\`\`bash
pnpm add @locusgraph/components @locusgraph/blocks @locusgraph/loop @locusgraph/brand
\`\`\`

\`\`\`css
@import "tailwindcss";
@import "@locusgraph/components/theme.css";
@import "@locusgraph/blocks/sources.css";
@import "@locusgraph/loop/sources.css";
@import "@locusgraph/brand/sources.css";
\`\`\`

For generated screens, add \`@locusgraph/json-render\`. Its catalog (\`locusComponents\`) and registry (\`locusRenderers\`) cover Stack, Columns, Notice, Usage, Quota, UsageAlert, Wallet, TopUp, Plans, KeysEmpty and Keys. It has no CSS of its own; the blocks import above covers it.

An app that also uses its own shadcn components adds \`@import "@locusgraph/components/shadcn.css";\` after the theme, so the shadcn variables (\`--background\`, \`--primary\`, \`--muted-foreground\`, \`--radius\`) point at the Locus ones.

## Copy the source with shadcn

\`\`\`bash
pnpm dlx shadcn@latest add https://design.locusgraph.com/r/theme.json https://design.locusgraph.com/r/approval.json
\`\`\`

Every item is listed at https://design.locusgraph.com/r/registry.json. Files land in \`components/locus\`; import \`styles/locus.css\` after Tailwind.

## Fonts

\`@locusgraph/components/theme.css\` imports \`@locusgraph/tokens/theme.css\`, which imports three Fontsource packages. They are dependencies of \`@locusgraph/tokens\`, so they install with the components. The repo itself ships no font files.

- IBM Plex Sans, from \`@fontsource-variable/ibm-plex-sans\`: family \`"IBM Plex Sans Variable"\`, one variable woff2 per subset covering weights 100 to 700, normal style only. Subsets: latin, latin-ext, cyrillic, cyrillic-ext, greek, vietnamese. Used for body text, inputs and menus.
- Archivo, from \`@fontsource-variable/archivo\`: family \`"Archivo Variable"\`, weights 100 to 900, normal style only. Subsets: latin, latin-ext, vietnamese. Used for \`h1\` to \`h3\`, \`locus-eyebrow\` labels, buttons and the wordmark.
- IBM Plex Mono, from \`@fontsource/ibm-plex-mono\`: family \`"IBM Plex Mono"\`, static files for weights 400, 500 and 600 only, normal style. Subsets: latin, latin-ext, cyrillic, cyrillic-ext, vietnamese. Used for code, ids and commands.
- Variables: \`--locus-font-ibm-plex-sans\`, \`--locus-font-archivo\` and \`--locus-font-ibm-plex-mono\` hold the stacks. Tailwind maps them to \`font-sans\` (Plex Sans), \`font-heading\` and \`font-brand\` (both Archivo) and \`font-mono\` (Plex Mono). \`body\` uses \`font-sans\`.
- The theme sets the root font size to 17px, so every \`rem\` size below is 17px based.
- The shadcn registry \`theme\` item adds the same three packages as dependencies.
- \`@locusgraph/brand\` ships no font files. The wordmark uses \`font-brand\`, so it needs the theme. \`socialCardFonts\` only names the families (Archivo, IBM Plex Sans, IBM Plex Mono); in \`ImageResponse\` pass the font data yourself, since Satori only has the fonts you give it.
- Emails cannot load web fonts. \`@locusgraph/tokens\` exports \`fonts.emailSafeSans\` and \`fonts.emailSafeMono\`, which name IBM Plex Sans and IBM Plex Mono first and fall back to system fonts.

## House style

- Containers, fields, menus and code are square: never add a radius class. Buttons, segmented tabs and toggle groups, chips, badges, dots, avatars and bars are pills (\`rounded-full\`). Line tabs have no shape, only an underline. Nothing in between.
- Every clickable element shows focus with \`locus-focus-ring\` (a 2px outline in the ring color at 70%, offset 2px), or \`locus-focus-ring-inset\` (the same outline, offset -2px) on full-bleed rows, tabs and scroll areas where an outer ring would clip. Text fields use \`focus-visible:border-ring\` with \`ring-1\`.
- App pages (components, blocks, shells): group with ruled lines (\`RuleGrid\`, \`ring-1 ring-border\`, \`divide-y\`), not cards or shadows.
- The chat area (\`@locusgraph/loop\`): no rules, frames or panels. Hierarchy comes from text weight and tone, spacing and color that means state. Only fields (the composer) and overlays (menus, popovers) keep a frame.
- Overlays cast no shadow either. Dialogs, alert dialogs, sheets, drawers, popovers, hover cards, menus, selects, comboboxes, chart tooltips and toasts are \`bg-popover\` with a \`border\` or \`ring-1 ring-border\`; modal ones sit on the \`bg-scrim\` backdrop. Never add \`shadow-overlay\` or another shadow to one.
- Small labels use the \`locus-eyebrow\` class (Archivo, \`text-xs\`, medium, sentence case, muted). Headings (\`h1\` to \`h3\`) are Archivo too, and buttons and toggles are Archivo medium; body text, inputs and menus are IBM Plex Sans; code and ids are IBM Plex Mono.
- Type sizes come from the scale only: \`text-2xs\` (0.6875rem, mono meta and tiny counts), \`text-xs\`, \`text-code\` (0.8125rem, mono names and commands), \`text-sm\` (UI and chat), \`text-base\` and up. No \`text-[13px]\`.
- Controls share four heights: \`h-control-xs\` (1.5rem, 25.5px), \`h-control-sm\` (2rem, 34px), \`h-control\` (2.25rem, 38.25px), \`h-control-lg\` (2.5rem, 42.5px), with matching \`size-control-*\` for icon buttons.
- One primary action per view. Color means state: \`text-interactive\` (clickable, on hover), \`text-memory\` (remembered), \`text-good\`, \`text-warn\` (waiting), \`text-destructive\`. Bars and meter fills use \`bg-good-fill\` and \`bg-warn-fill\` (brighter, not for text) on a \`bg-foreground/10\` track. Chart series use \`--locus-s1\` to \`--locus-s8\` and never carry meaning.
- Text tones: \`text-foreground\` for values, \`text-muted-foreground\` for labels, \`text-faint\` for meta and hints. All three pass WCAG AA.
- Surfaces: the page is \`bg-background\` (light gray, near-black in dark); cells and panels are a solid \`bg-card\` one step above it. Action strips are \`RuleGridFooter\` (\`border-t bg-muted/70\`), header strips \`RuleGridHeader\` (\`border-b bg-muted/35\`). One tint per strip; never tint content.
- Use tokens (\`bg-card\`, \`bg-muted\`, \`text-muted-foreground\`, \`border-input\`), never raw hex.
- In CSS the theme variables are \`--locus-*\` (\`var(--locus-surface)\`, \`var(--locus-border)\`, \`var(--locus-muted)\`) and the theme's own classes are \`locus-*\`. The shadcn names (\`--background\`, \`--muted-foreground\`) exist only when the app imports \`@locusgraph/components/shadcn.css\`.`;

function firstSentence(text: string) {
  const match = text.match(/^.*?[.!?](\s|$)/);
  return (match ? match[0] : text).trim();
}

function pageLine(entry: DemoEntry) {
  return `- [${entry.title}](${siteOrigin}/${entry.path}.md): ${firstSentence(entry.demo.description)}`;
}

function librarySection(id: string, entries: DemoEntry[]) {
  const library = libraries.find((item) => item.id === id);
  const own = entries.filter((entry) => libraryOfGroup(entry.group) === id);
  if (!library || own.length === 0) return "";
  const lines = own.sort((first, second) => first.path.localeCompare(second.path)).map(pageLine);
  return [`## ${library.title} (\`${library.packageName}\`)`, ...lines].join("\n");
}

function guidesSection(guides: GuideDoc[]) {
  if (guides.length === 0) return "";
  const lines = guides.map(
    (guide) =>
      `- [${guide.title}](${siteOrigin}/${guide.path}.md): ${firstSentence(guide.description)}`
  );
  return ["## Guides", ...lines].join("\n");
}

export function designIndex(entries: DemoEntry[], guides: GuideDoc[] = []) {
  const sections = libraries.map((library) => librarySection(library.id, entries));
  return [intro, guidesSection(guides), ...sections.filter(Boolean)]
    .filter(Boolean)
    .join("\n\n")
    .concat("\n");
}

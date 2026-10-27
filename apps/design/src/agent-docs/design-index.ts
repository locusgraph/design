import type { DemoEntry } from "../registry/load-demos";
import { libraries, libraryOfGroup } from "../shell/nav/libraries";

export const siteOrigin = "https://design.locusgraph.com";

const intro = `# Locus Design

> The interface kit for LocusGraph: components, product blocks (\`@locusgraph/blocks\`), an agent kit with the human in the loop (\`@locusgraph/loop\`) and brand assets. React 19, Tailwind v4, Radix. Light and dark.

Every page below has a Markdown version: add \`.md\` to its path. Fetch the ones you need instead of guessing props.

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

An app that also uses its own shadcn components adds \`@import "@locusgraph/components/shadcn.css";\` after the theme, so the shadcn variables (\`--background\`, \`--primary\`, \`--muted-foreground\`, \`--radius\`) point at the Locus ones.

## Copy the source with shadcn

\`\`\`bash
pnpm dlx shadcn@latest add https://design.locusgraph.com/r/theme.json https://design.locusgraph.com/r/approval.json
\`\`\`

Every item is listed at https://design.locusgraph.com/r/registry.json. Files land in \`components/locus\`; import \`styles/locus.css\` after Tailwind.

## House style

- Containers, fields, menus and code are square: never add a radius class. Buttons, chips, badges, dots, avatars and bars are pills (\`rounded-full\`). Nothing in between.
- Every clickable element shows focus with \`locus-focus-ring\` (a 2px ring, offset 2px), or \`locus-focus-ring-inset\` on full-bleed rows, tabs and scroll areas where an outer ring would clip. Text fields use \`focus-visible:border-ring\` with \`ring-1\`.
- App pages (components, blocks, shells): group with ruled lines (\`RuleGrid\`, \`ring-1 ring-border\`, \`divide-y\`), not cards or shadows.
- The chat area (\`@locusgraph/loop\`): no rules, frames or panels. Hierarchy comes from text weight and tone, spacing and color that means state. Only fields (the composer) and overlays (menus, popovers) keep a frame.
- Small labels use the \`locus-eyebrow\` class (Archivo, \`text-xs\`, medium, sentence case, muted). Buttons and toggles are Archivo medium too; body text, inputs and menus are IBM Plex Sans; code and ids are IBM Plex Mono.
- Type sizes come from the scale only: \`text-2xs\` (0.6875rem, mono meta and tiny counts), \`text-xs\`, \`text-code\` (0.8125rem, mono names and commands), \`text-sm\` (UI and chat), \`text-base\` and up. No \`text-[13px]\`.
- Controls share four heights: \`h-control-xs\` (24px), \`h-control-sm\` (32px), \`h-control\` (36px), \`h-control-lg\` (40px), with matching \`size-control-*\` for icon buttons.
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

export function designIndex(entries: DemoEntry[]) {
  const sections = libraries.map((library) => librarySection(library.id, entries));
  return [intro, ...sections.filter(Boolean)].join("\n\n").concat("\n");
}

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

- Containers are square (radius 0). Buttons are pills (\`rounded-full\`).
- Group with ruled lines (\`RuleGrid\`, \`ring-1 ring-border\`, \`divide-y\`), not cards or shadows.
- Small labels use the \`locus-eyebrow\` class (mono, 11px, uppercase, muted).
- One primary action per view. Color only on status: \`text-good\`, \`text-warn\`, \`text-destructive\`.
- Surfaces: the page is \`bg-background\` (off-white, near-black in dark); cells and panels are a solid \`bg-card\` one step above it. Action strips are \`RuleGridFooter\` (\`border-t bg-muted/70\`), header strips \`RuleGridHeader\` (\`border-b bg-muted/35\`). One tint per strip; never tint content.
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

import { readdirSync } from "node:fs";
import { join, relative } from "node:path";

function patternPages(root) {
  const dir = join(root, "apps/design/src/demos");
  const walk = (folder) =>
    readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
      const path = join(folder, entry.name);
      if (entry.isDirectory()) return walk(path);
      return entry.name.endsWith(".demo.tsx")
        ? [relative(dir, path).replace(/\.demo\.tsx$/, "")]
        : [];
    });
  return walk(join(dir, "patterns")).sort();
}

export function skillItem(root, baseUrl) {
  const patterns = patternPages(root)
    .map((path) => `- ${path.split("/").at(-1)}: ${baseUrl}/${path}.md`)
    .join("\n");
  const content = `---
name: locus-design
description: Build UI with the LocusGraph design system (@locusgraph/components, blocks, Loop). Use when creating or changing pages, forms, settings, billing, empty or loading states, confirmations, or agent chat and approval UI in this project.
---

# Locus Design

Build every screen from the LocusGraph design system. Do not invent components, colors or spacing.

## Before you write UI

1. Read ${baseUrl}/DESIGN.md. It lists every component, block, Loop part and pattern.
2. Pick the closest pattern below and follow its code.
3. Before using a component, fetch its page with .md added (for example ${baseUrl}/loop/approval/approval.md) and use only the props it documents.
4. Add missing parts with \`pnpm dlx shadcn@latest add @locus/<name>\` or import them from the npm packages the project already uses. Check package.json first.

## Patterns

${patterns}

## House style

- Containers are square. Buttons are pills.
- Group with ruled lines (RuleGrid, ring-1 ring-border, divide-y), never cards with shadows.
- The page is bg-background; cells and panels are bg-card, one step above it.
- Action strips use RuleGridFooter (border-t bg-muted/70); header strips RuleGridHeader (border-b bg-muted/35). One tint per strip.
- Small labels use the eyebrow class. Titles are one weight up, not one size up.
- One primary action per view. Secondary actions are ghost or outline.
- Color only for status: text-good, text-warn, text-destructive. Body text stays foreground or muted.
- Name buttons by what they do ("Delete 3 nodes", not "Confirm").
- Use tokens (bg-card, bg-muted, text-muted-foreground, border-input). Never raw hex.
- Every screen works in light and dark.

## Agents and approvals

- Reads run on their own. Writes, spends and deletes pause on an Approval, Question, PlanReview or SpendGate and show exactly what will happen.
- Loop components take Vercel AI SDK UIMessage parts and never call a model.

## Don't

- Don't add rounded corners, gradients or drop shadows to containers.
- Don't nest boxes inside boxes; use spacing or a ruled row.
- Don't use lucide or another icon set; icons come from @phosphor-icons/react, imported from @phosphor-icons/react/ssr with weight="bold".
- Don't guess props. Fetch the component's .md page.
`;
  return {
    name: "skill",
    type: "registry:file",
    title: "Locus Design skill",
    description:
      "A Claude Code skill that makes agents build UI with Locus Design: house style, patterns and where to look up components.",
    files: [
      {
        path: "locus/skill/SKILL.md",
        type: "registry:file",
        target: "~/.claude/skills/locus-design/SKILL.md",
        content,
      },
    ],
    docs: "Claude Code loads .claude/skills/locus-design automatically when you work on UI.",
  };
}

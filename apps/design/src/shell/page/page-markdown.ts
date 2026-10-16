import type { PropRow } from "../../registry/define-demo";
import type { DocExample } from "../../registry/demo-docs";

type PageMarkdownInput = {
  title: string;
  description: string;
  importLine: string;
  usageCode: string;
  composition?: string;
  examples: DocExample[];
  props: PropRow[];
};

const fence = (code: string, lang = "tsx") => `\`\`\`${lang}\n${code}\n\`\`\``;

const escapeTableCell = (text: string) => text.replaceAll("|", "\\|");

function apiTable(props: PropRow[]) {
  const rows = props.map(
    (row) =>
      `| \`${escapeTableCell(row.name)}\` | \`${escapeTableCell(row.type)}\` | ${row.defaultValue ?? "—"} |`
  );
  return ["| Prop | Type | Default |", "| --- | --- | --- |", ...rows].join("\n");
}

function exampleMarkdown(example: DocExample) {
  return [`### ${example.title}`, example.description, fence(example.code)]
    .filter(Boolean)
    .join("\n\n");
}

export function buildPageMarkdown(input: PageMarkdownInput) {
  const usage = [input.importLine && fence(input.importLine), fence(input.usageCode)].filter(
    Boolean
  );
  return [
    `# ${input.title}`,
    input.description,
    "## Usage",
    ...usage,
    ...(input.composition ? ["## Composition", fence(input.composition, "text")] : []),
    ...(input.examples.length > 0 ? ["## Examples", ...input.examples.map(exampleMarkdown)] : []),
    ...(input.props.length > 0 ? ["## API", apiTable(input.props)] : []),
  ].join("\n\n");
}

import { CodeBlock } from "../../preview/code-block";

type UsageSectionProps = { importLine: string; usageCode: string };

export function UsageSection({ importLine, usageCode }: UsageSectionProps) {
  return (
    <section id="usage" className="flex scroll-mt-24 flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight">Usage</h2>
      {importLine && <CodeBlock code={importLine} className="border bg-surface" />}
      <CodeBlock code={usageCode} className="border bg-surface" />
    </section>
  );
}

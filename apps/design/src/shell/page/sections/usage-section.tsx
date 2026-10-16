import { CodeBlock } from "../../preview/code-block";
import { useRegistryItem } from "./use-registry-items";

type UsageSectionProps = { importLine: string; usageCode: string; registryName: string };

export function UsageSection({ importLine, usageCode, registryName }: UsageSectionProps) {
  const inRegistry = useRegistryItem(registryName);
  return (
    <section id="usage" className="flex scroll-mt-24 flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight">Usage</h2>
      {importLine && <CodeBlock code={importLine} className="border bg-surface" />}
      <CodeBlock code={usageCode} className="border bg-surface" />
      {inRegistry && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Or copy the source into your project with shadcn:
          </p>
          <CodeBlock
            code={`pnpm dlx shadcn@latest add https://design.locusgraph.com/r/${registryName}.json`}
            language="bash"
            className="border bg-surface"
          />
        </div>
      )}
    </section>
  );
}

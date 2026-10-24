import type { DocExample } from "../../../registry/demo-docs";
import { CodeTeaser } from "../../preview/code-teaser";
import { withInlineCode } from "../prose/inline-code";

export function ExampleCard({ example }: { example: DocExample }) {
  const Example = example.component;
  return (
    <section id={example.id} className="flex scroll-mt-24 flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium">{example.title}</h3>
        {example.description && (
          <p className="text-sm text-muted-foreground">{withInlineCode(example.description)}</p>
        )}
      </div>
      <div className="overflow-hidden border">
        <div className="flex min-h-28 flex-wrap items-center justify-center bg-background p-8">
          <Example />
        </div>
        <CodeTeaser code={example.code} />
      </div>
    </section>
  );
}

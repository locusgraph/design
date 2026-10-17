import { Copy as CopyIcon } from "@carbon/icons-react";
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@locusgraph/components";
import type * as React from "react";
import { useState } from "react";
import { CodeBlock } from "../../../preview/code-block";

type ThemeDocsPanelProps = { css: string; prompt: string };

function DocStep({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    void navigator.clipboard.writeText(prompt).then(() => setCopied(true));
    globalThis.setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Button variant="outline" size="sm" className="self-start" onClick={copy}>
      <CopyIcon />
      {copied ? "Copied" : "Copy prompt"}
    </Button>
  );
}

export function ThemeDocsPanel({ css, prompt }: ThemeDocsPanelProps) {
  return (
    <Tabs
      defaultValue="css"
      className="flex min-h-0 flex-col gap-0 bg-surface ring-1 ring-border lg:h-full"
    >
      <div className="border-b bg-muted/35 px-4 py-2">
        <TabsList>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="css" className="flex min-h-0 flex-col gap-6 overflow-y-auto p-4">
        <DocStep title="1. Set three variables">
          <p className="text-sm text-muted-foreground">
            Add them to your global CSS after the theme import.
          </p>
          <CodeBlock code={css} language="css" className="border bg-background text-xs" />
        </DocStep>
        <DocStep title="2. Use semantic classes">
          <p className="text-sm text-muted-foreground">
            Components read bg-primary and ring-ring, so they follow. Hover and selected states stay
            on the neutral --ghost tint.
          </p>
        </DocStep>
      </TabsContent>
      <TabsContent value="prompt" className="flex min-h-0 flex-col gap-4 overflow-y-auto p-4">
        <p className="text-sm text-muted-foreground">Paste this into your coding agent.</p>
        <pre className="border bg-background p-3 font-mono text-xs whitespace-pre-wrap">
          {prompt}
        </pre>
        <CopyPromptButton prompt={prompt} />
      </TabsContent>
    </Tabs>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@locusgraph/components";
import type * as React from "react";
import { CodeBlock } from "../../../preview/code-block";
import type { ResolvedTheme } from "../theme-presets";
import { ContrastCheck } from "./contrast-check";
import { PromptTab } from "./prompt-tab";

type ThemeDocsPanelProps = {
  css: string;
  prompt: string;
  light: ResolvedTheme;
  dark: ResolvedTheme;
};

function DocStep({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2.5 text-sm font-medium">
        <span className="flex size-5 items-center justify-center rounded-full bg-muted text-xs tabular-nums text-muted-foreground">
          {number}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function StepNote({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-pretty text-muted-foreground">{children}</p>;
}

export function ThemeDocsPanel({ css, prompt, light, dark }: ThemeDocsPanelProps) {
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
      <TabsContent value="css" className="flex min-h-0 flex-col gap-8 overflow-y-auto p-4">
        <DocStep number={1} title="Set three variables">
          <StepNote>Put them in your global CSS, after the theme import.</StepNote>
          <CodeBlock code={css} language="css" className="border bg-background text-xs" />
        </DocStep>
        <DocStep number={2} title="Check the contrast">
          <StepNote>Text on the brand color needs 4.5:1 to pass WCAG AA.</StepNote>
          <ContrastCheck light={light} dark={dark} />
        </DocStep>
        <DocStep number={3} title="Use semantic classes">
          <StepNote>
            Write bg-primary and ring-ring, never a raw color. Hover and selected states stay on the
            neutral ghost tint.
          </StepNote>
        </DocStep>
      </TabsContent>
      <TabsContent value="prompt" className="flex min-h-0 flex-col gap-4 overflow-y-auto p-4">
        <PromptTab prompt={prompt} />
      </TabsContent>
    </Tabs>
  );
}

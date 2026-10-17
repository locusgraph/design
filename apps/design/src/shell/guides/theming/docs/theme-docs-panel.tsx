import { Tabs, TabsContent, TabsList, TabsTrigger } from "@locusgraph/components";
import type * as React from "react";
import { CodeBlock } from "../../../preview/code-block";
import type { ResolvedTheme } from "../theme-presets";
import { ContrastCheck } from "./contrast-check";
import { PromptTab } from "./prompt-tab";

type ThemeDocsPanelProps = {
  css: string;
  tokensJson: string;
  mode: string;
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

export function ThemeDocsPanel({
  css,
  tokensJson,
  mode,
  prompt,
  light,
  dark,
}: ThemeDocsPanelProps) {
  return (
    <Tabs
      defaultValue="css"
      className="flex min-h-0 flex-col gap-0 bg-surface ring-1 ring-border lg:h-full"
    >
      <div className="border-b bg-muted/35 px-4 py-2">
        <TabsList>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="css" className="flex min-h-0 flex-col gap-8 overflow-y-auto p-4">
        <DocStep number={1} title="Set three variables">
          <StepNote>
            Put them in your global CSS, after the theme import. Hover, pressed and subtle shades
            derive from --btn, so a brand color gets its states for free.
          </StepNote>
          <CodeBlock code={css} language="css" className="border bg-background text-xs" />
        </DocStep>
        <DocStep number={2} title="Check the contrast">
          <StepNote>
            WCAG 2 AA needs 4.5:1 and is the legal bar. APCA Lc 60 is a stricter read for dark mode.
          </StepNote>
          <ContrastCheck light={light} dark={dark} />
        </DocStep>
        <DocStep number={3} title="Use semantic classes">
          <StepNote>
            Write bg-primary and ring-ring, never a raw color. Hover and selected states stay on the
            neutral ghost tint.
          </StepNote>
        </DocStep>
      </TabsContent>
      <TabsContent value="tokens" className="flex min-h-0 flex-col gap-4 overflow-y-auto p-4">
        <StepNote>
          The same values as {mode}.tokens.json in the W3C Design Tokens format (2025.10), for Figma
          and other tools.
        </StepNote>
        <CodeBlock code={tokensJson} language="json" className="border bg-background text-xs" />
      </TabsContent>
      <TabsContent value="prompt" className="flex min-h-0 flex-col gap-4 overflow-y-auto p-4">
        <PromptTab prompt={prompt} />
      </TabsContent>
    </Tabs>
  );
}

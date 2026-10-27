import type * as React from "react";
import { PlaygroundLink } from "../nav/playground-nav";
import { CodeBlock, type CodeLanguage } from "../preview/code/code-block";

export function GuideArticle({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto flex w-full max-w-160 min-w-0 flex-col gap-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-balance text-muted-foreground md:max-w-[80%]">{lead}</p>
      </header>
      {children}
    </article>
  );
}

export function GuideSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="typeset locus-typeset-docs">{children}</div>;
}

export function GuideCode({ code, language }: { code: string; language?: CodeLanguage }) {
  return <CodeBlock code={code} language={language} className="not-typeset border bg-surface" />;
}

export function DocLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <PlaygroundLink href={href}>{children}</PlaygroundLink>;
}

"use client";

import { cn } from "@locusgraph/components";
import { type ComponentProps, useEffect, useState } from "react";
import { CopyCodeButton } from "./copy-code-button";
import { highlightToHtml } from "./highlight";

type CodeBlockProps = Omit<ComponentProps<"figure">, "children"> & {
  code: string;
  language?: string;
  filename?: string;
  showCopy?: boolean;
  onCopy?: (code: string) => void;
};

const codeAreaClass = cn(
  "overflow-x-auto bg-muted/40 px-4 py-3 font-mono text-xs leading-relaxed",
  "[&_pre]:bg-transparent! [&_pre]:outline-none",
  "[&_.shiki_span]:text-(--shiki-light) dark:[&_.shiki_span]:text-(--shiki-dark)"
);

function useHighlightedHtml(code: string, language: string) {
  const [html, setHtml] = useState<string | null>(null);
  useEffect(() => {
    let current = true;
    setHtml(null);
    highlightToHtml(code, language)
      .then((highlighted) => {
        if (current) {
          setHtml(highlighted);
        }
      })
      .catch(() => {
        if (current) {
          setHtml(null);
        }
      });
    return () => {
      current = false;
    };
  }, [code, language]);
  return html;
}

export function CodeBlock({
  code,
  language = "text",
  filename,
  showCopy = true,
  onCopy,
  className,
  ...props
}: CodeBlockProps) {
  const html = useHighlightedHtml(code, language);
  return (
    <figure
      data-slot="code-block"
      data-language={language}
      className={cn("min-w-0 bg-card text-card-foreground ring-1 ring-border", className)}
      {...props}
    >
      <figcaption className="flex h-8 items-center justify-between gap-2 border-b pr-1 pl-3 font-mono text-[11px]">
        <span className="flex min-w-0 items-center gap-2">
          <span className="tracking-wide text-muted-foreground uppercase">{language}</span>
          {filename && <span className="truncate text-foreground/80">{filename}</span>}
        </span>
        {showCopy && <CopyCodeButton code={code} onCopy={onCopy} />}
      </figcaption>
      {html ? (
        <div className={codeAreaClass} dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre className={codeAreaClass}>
          <code>{code}</code>
        </pre>
      )}
    </figure>
  );
}

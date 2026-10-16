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
  "overflow-x-auto p-4 font-mono text-[13px] leading-relaxed",
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
      className={cn("min-w-0 border border-border bg-card text-card-foreground", className)}
      {...props}
    >
      <figcaption className="flex h-9 items-center justify-between gap-2 border-b border-border pr-1.5 pl-4">
        <span className="flex min-w-0 items-center gap-2 font-mono text-[11.5px]">
          {filename && <span className="truncate text-foreground">{filename}</span>}
          <span className="text-muted-foreground">{language}</span>
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

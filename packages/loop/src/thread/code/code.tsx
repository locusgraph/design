"use client";

import { cn } from "@locusgraph/components";
import { type ComponentProps, useEffect, useState } from "react";
import { CopyCodeButton } from "./copy-code-button";
import { highlightToHtml } from "./highlight";

type CodeProps = Omit<ComponentProps<"figure">, "children"> & {
  code: string;
  language?: string;
  filename?: string;
  showCopy?: boolean;
  onCopy?: (code: string) => void;
};

const codeAreaClass = cn(
  "overflow-x-auto px-4 pb-3 font-mono text-xs leading-relaxed",
  "[&_pre]:bg-transparent! [&_pre]:outline-none has-[pre:focus-visible]:outline-2 has-[pre:focus-visible]:-outline-offset-2 has-[pre:focus-visible]:outline-ring/70",
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

export function Code({
  code,
  language = "text",
  filename,
  showCopy = true,
  onCopy,
  className,
  ...props
}: CodeProps) {
  const html = useHighlightedHtml(code, language);
  return (
    <figure
      data-slot="code"
      data-language={language}
      className={cn("min-w-0 bg-muted/40 text-foreground", className)}
      {...props}
    >
      <figcaption className="flex h-control items-center justify-between gap-2 pr-1.5 pl-4 text-xs text-faint">
        {filename ? (
          <span className="min-w-0 truncate font-medium text-muted-foreground">{filename}</span>
        ) : (
          <span>{language}</span>
        )}
        <span className="flex shrink-0 items-center gap-2">
          {filename && <span>{language}</span>}
          {showCopy && <CopyCodeButton code={code} onCopy={onCopy} />}
        </span>
      </figcaption>
      {html ? (
        <div
          data-slot="code-area"
          className={codeAreaClass}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre data-slot="code-area" className={codeAreaClass}>
          <code>{code}</code>
        </pre>
      )}
    </figure>
  );
}

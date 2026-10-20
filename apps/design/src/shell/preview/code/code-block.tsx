import { Checkmark as CheckIcon, Copy as CopyIcon } from "@carbon/icons-react";
import { Button, cn } from "@locusgraph/components";
import { useState } from "react";
import { type CodeLanguage, useHighlightedHtml } from "./highlighter";

export type { CodeLanguage } from "./highlighter";

const collapsedLineCount = 20;
const collapsedHeight =
  "max-h-[calc(20lh+2rem)] overflow-y-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent)]";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Copy code"
      onClick={copy}
      className="absolute top-2 right-2 z-10 bg-surface hover:bg-accent"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}

function UnhighlightedCode({ code }: { code: string }) {
  return (
    <pre className="shiki">
      <code>{code}</code>
    </pre>
  );
}

type ExpandToggleProps = { expanded: boolean; lineCount: number; onToggle: () => void };

function ExpandToggle({ expanded, lineCount, onToggle }: ExpandToggleProps) {
  return (
    <div className="flex justify-center border-t py-2">
      <Button variant="ghost" size="xs" aria-expanded={expanded} onClick={onToggle}>
        {expanded ? "Show less" : `Show all ${lineCount} lines`}
      </Button>
    </div>
  );
}

type CodeBlockProps = {
  code: string;
  className?: string;
  showCopy?: boolean;
  language?: CodeLanguage;
  collapsible?: boolean;
};

export function CodeBlock({
  code,
  className,
  showCopy = true,
  language = "tsx",
  collapsible = true,
}: CodeBlockProps) {
  const html = useHighlightedHtml(code, language);
  const [expanded, setExpanded] = useState(false);
  const lineCount = code.split("\n").length;
  const canCollapse = collapsible && lineCount > collapsedLineCount;
  const codeClass = cn(
    "overflow-x-auto p-4 pr-12 font-mono text-sm [&_pre]:outline-none",
    canCollapse && !expanded && collapsedHeight
  );
  return (
    <div className={cn("relative", className)}>
      {showCopy && <CopyButton text={code} />}
      {html ? (
        <div className={codeClass} dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <div className={codeClass}>
          <UnhighlightedCode code={code} />
        </div>
      )}
      {canCollapse && (
        <ExpandToggle
          expanded={expanded}
          lineCount={lineCount}
          onToggle={() => setExpanded((current) => !current)}
        />
      )}
    </div>
  );
}

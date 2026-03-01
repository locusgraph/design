/**
 * Content Viewer
 * Displays content as formatted JSON or plain text
 */

import { Check, ChevronDown, ChevronRight, Copy } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "../lib/utils";

interface ContentViewerProps {
  content: string;
  className?: string;
}

function isJsonString(str: string): boolean {
  try {
    const parsed = JSON.parse(str);
    return typeof parsed === "object" && parsed !== null;
  } catch {
    return false;
  }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}

interface JsonNodeProps {
  label?: string;
  value: unknown;
  depth?: number;
}

function JsonNode({ label, value, depth = 0 }: JsonNodeProps) {
  const [isExpanded, setIsExpanded] = useState(depth < 2);

  if (value === null) {
    return (
      <div className="flex items-center gap-1">
        {label && <span className="text-primary-400">{label}: </span>}
        <span className="text-muted-foreground italic">null</span>
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <div className="flex items-center gap-1">
        {label && <span className="text-primary-400">{label}: </span>}
        <span className="text-amber-500">{value.toString()}</span>
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <div className="flex items-center gap-1">
        {label && <span className="text-primary-400">{label}: </span>}
        <span className="text-emerald-500">{value}</span>
      </div>
    );
  }

  if (typeof value === "string") {
    return (
      <div className="flex items-start gap-1">
        {label && <span className="text-primary-400 shrink-0">{label}: </span>}
        <span className="text-foreground break-all">"{value}"</span>
      </div>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <div className="flex items-center gap-1">
          {label && <span className="text-primary-400">{label}: </span>}
          <span className="text-muted-foreground">[]</span>
        </div>
      );
    }

    return (
      <div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 hover:bg-muted/50 rounded px-1 -ml-1"
        >
          {isExpanded ? (
            <ChevronDown className="size-3 text-muted-foreground" />
          ) : (
            <ChevronRight className="size-3 text-muted-foreground" />
          )}
          {label && <span className="text-primary-400">{label}: </span>}
          <span className="text-muted-foreground">
            [{value.length} item{value.length !== 1 ? "s" : ""}]
          </span>
        </button>
        {isExpanded && (
          <div className="ml-4 border-l border-border pl-3 mt-1 space-y-1">
            {value.map((item, index) => (
              <JsonNode key={index} label={`[${index}]`} value={item} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) {
      return (
        <div className="flex items-center gap-1">
          {label && <span className="text-primary-400">{label}: </span>}
          <span className="text-muted-foreground">{"{}"}</span>
        </div>
      );
    }

    return (
      <div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 hover:bg-muted/50 rounded px-1 -ml-1"
        >
          {isExpanded ? (
            <ChevronDown className="size-3 text-muted-foreground" />
          ) : (
            <ChevronRight className="size-3 text-muted-foreground" />
          )}
          {label && <span className="text-primary-400">{label}: </span>}
          <span className="text-muted-foreground">
            {"{"}
            {entries.length} field{entries.length !== 1 ? "s" : ""}
            {"}"}
          </span>
        </button>
        {isExpanded && (
          <div className="ml-4 border-l border-border pl-3 mt-1 space-y-1">
            {entries.map(([key, val]) => (
              <JsonNode key={key} label={key} value={val} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {label && <span className="text-primary-400">{label}: </span>}
      <span className="text-foreground">{String(value)}</span>
    </div>
  );
}

export function ContentViewer({ content, className }: ContentViewerProps) {
  const parsedJson = useMemo(() => {
    if (isJsonString(content)) {
      try {
        return JSON.parse(content);
      } catch {
        return null;
      }
    }
    return null;
  }, [content]);

  return (
    <div className={cn("relative rounded-md bg-muted/30 p-4", className)}>
      <CopyButton text={content} />
      {parsedJson ? (
        <div className="text-sm font-mono pr-8">
          <JsonNode value={parsedJson} />
        </div>
      ) : (
        <pre className="whitespace-pre-wrap text-sm text-foreground font-sans pr-8">{content}</pre>
      )}
    </div>
  );
}

import { cn } from "@locusgraph/components";
import { useId, useState } from "react";

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPrimitive(value: unknown) {
  return value === null || ["string", "number", "boolean"].includes(typeof value);
}

export function readableValue(value: unknown): string {
  if (value === null || value === undefined) return "None";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value) && value.every(isPrimitive)) {
    return value.length === 0 ? "None" : value.map(readableValue).join(", ");
  }
  return JSON.stringify(value);
}

const acronyms: Record<string, string> = {
  api: "API",
  csv: "CSV",
  id: "ID",
  ids: "IDs",
  json: "JSON",
  pdf: "PDF",
  sql: "SQL",
  url: "URL",
  urls: "URLs",
  usd: "USD",
};

export function humanizeKey(key: string): string {
  const words = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => acronyms[word] ?? word);
  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

function rawJson(input: unknown) {
  return JSON.stringify(input, null, 2) ?? "undefined";
}

export function ToolInputs({ input, muted = false }: { input: unknown; muted?: boolean }) {
  const [showRaw, setShowRaw] = useState(false);
  const rawId = useId();
  const entries = isPlainRecord(input) ? Object.entries(input) : null;
  return (
    <div data-slot="tool-inputs" className="flex flex-col gap-2">
      {entries && !showRaw && (
        <dl
          className={cn(
            "-mx-5 flex flex-col divide-y border-y text-sm",
            muted && "text-muted-foreground"
          )}
        >
          {entries.map(([key, value]) => (
            <div
              key={key}
              className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] items-baseline gap-3 px-5 py-2.5"
            >
              <dt className="text-xs text-muted-foreground">{humanizeKey(key)}</dt>
              <dd className="font-mono text-sm break-words">{readableValue(value)}</dd>
            </div>
          ))}
          {entries.length === 0 && (
            <div className="px-5 py-2.5 text-xs text-muted-foreground">No inputs.</div>
          )}
        </dl>
      )}
      {(showRaw || !entries) && (
        <pre id={rawId} className="overflow-x-auto bg-muted/40 p-3 font-mono text-xs">
          {rawJson(input)}
        </pre>
      )}
      {entries && (
        <button
          type="button"
          className="locus-eyebrow self-start outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/70 motion-safe:transition-colors"
          aria-expanded={showRaw}
          aria-controls={showRaw ? rawId : undefined}
          onClick={() => setShowRaw((current) => !current)}
        >
          {showRaw ? "Show fields" : "Show raw"}
        </button>
      )}
    </div>
  );
}

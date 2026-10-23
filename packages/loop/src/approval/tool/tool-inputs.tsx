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
            "grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)] gap-x-4 gap-y-1 text-sm",
            muted ? "text-muted-foreground" : "text-foreground"
          )}
        >
          {entries.map(([key, value]) => (
            <div key={key} className="contents">
              <dt className="text-faint">{humanizeKey(key)}</dt>
              <dd className="min-w-0 break-words">{readableValue(value)}</dd>
            </div>
          ))}
          {entries.length === 0 && <div className="col-span-2 text-faint">No inputs.</div>}
        </dl>
      )}
      {(showRaw || !entries) && (
        <pre id={rawId} className="overflow-x-auto font-mono text-xs text-muted-foreground">
          {rawJson(input)}
        </pre>
      )}
      {entries && (
        <button
          type="button"
          className="self-start text-xs text-faint outline-none hover:text-s1 focus-visible:ring-2 focus-visible:ring-ring/70 motion-safe:transition-colors"
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

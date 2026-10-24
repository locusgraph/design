import { cn } from "@locusgraph/components";
import { useState } from "react";

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
  const entries = isPlainRecord(input) ? Object.entries(input) : null;
  return (
    <div data-slot="tool-inputs" className="flex flex-col gap-2">
      {entries && !showRaw && (
        <dl
          className={cn(
            "grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[8rem_minmax(0,1fr)] gap-y-2 text-sm",
            muted ? "text-faint" : "text-foreground"
          )}
        >
          {entries.map(([key, value]) => (
            <div key={key} className="contents">
              <dt className="truncate text-muted-foreground">{humanizeKey(key)}</dt>
              <dd className={cn("min-w-0 break-words", !muted && "font-medium")}>
                {readableValue(value)}
              </dd>
            </div>
          ))}
          {entries.length === 0 && (
            <div className="col-span-2 text-muted-foreground">No inputs.</div>
          )}
        </dl>
      )}
      {(showRaw || !entries) && (
        <pre className="overflow-x-auto font-mono text-xs text-muted-foreground">
          {rawJson(input)}
        </pre>
      )}
      {entries && (
        <button
          type="button"
          className="ml-28 self-start text-xs sm:ml-36 text-faint focus-ring hover:text-interactive motion-safe:transition-colors"
          onClick={() => setShowRaw((current) => !current)}
        >
          {showRaw ? "Show fields" : "Show raw"}
        </button>
      )}
    </div>
  );
}

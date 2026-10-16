import { Button } from "@locusgraph/components";
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

export function humanizeKey(key: string): string {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function rawJson(input: unknown) {
  return JSON.stringify(input, null, 2) ?? "undefined";
}

export function ToolInputs({ input }: { input: unknown }) {
  const [showRaw, setShowRaw] = useState(false);
  const rawId = useId();
  const entries = isPlainRecord(input) ? Object.entries(input) : null;
  return (
    <div data-slot="tool-inputs" className="flex flex-col gap-2">
      {entries && !showRaw && (
        <dl className="flex flex-col divide-y divide-line text-sm ring-1 ring-border">
          {entries.map(([key, value]) => (
            <div key={key} className="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)]">
              <dt className="bg-muted/40 px-3 py-2 text-muted-foreground">{humanizeKey(key)}</dt>
              <dd className="px-3 py-2 font-mono text-[13px] break-words">
                {readableValue(value)}
              </dd>
            </div>
          ))}
          {entries.length === 0 && (
            <div className="px-3 py-2 text-muted-foreground">No inputs.</div>
          )}
        </dl>
      )}
      {(showRaw || !entries) && (
        <pre
          id={rawId}
          className="overflow-x-auto bg-muted/40 p-3 font-mono text-[12.5px] ring-1 ring-border"
        >
          {rawJson(input)}
        </pre>
      )}
      {entries && (
        <Button
          type="button"
          variant="link"
          size="xs"
          className="self-start px-0"
          aria-expanded={showRaw}
          aria-controls={showRaw ? rawId : undefined}
          onClick={() => setShowRaw((current) => !current)}
        >
          {showRaw ? "Show fields" : "Show raw"}
        </Button>
      )}
    </div>
  );
}

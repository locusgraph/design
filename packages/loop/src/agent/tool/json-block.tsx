export function prettyJson(value: unknown) {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2) ?? String(value);
  } catch {
    return String(value);
  }
}

export function JsonBlock({ label, value }: { label: string; value: unknown }) {
  return (
    <div data-slot="tool-json" className="flex min-w-0 flex-col gap-1">
      <span className="text-xs text-faint">{label}</span>
      <pre className="max-h-72 overflow-auto font-mono text-xs leading-relaxed text-muted-foreground">
        {prettyJson(value)}
      </pre>
    </div>
  );
}

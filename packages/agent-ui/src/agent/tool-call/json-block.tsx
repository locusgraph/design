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
    <div data-slot="tool-json" className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <pre className="max-h-72 overflow-auto bg-muted/40 px-3 py-2.5 font-mono text-xs leading-relaxed">
        <code>{prettyJson(value)}</code>
      </pre>
    </div>
  );
}

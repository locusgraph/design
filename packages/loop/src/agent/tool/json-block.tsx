import { Code } from "../../thread/code/code";

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
    <Code
      data-slot="tool-json"
      code={prettyJson(value)}
      language="json"
      filename={label}
      className="[&_[data-slot=code-area]]:max-h-72 [&_[data-slot=code-area]]:overflow-auto"
    />
  );
}

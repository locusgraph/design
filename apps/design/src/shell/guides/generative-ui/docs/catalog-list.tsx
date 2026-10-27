import { locusComponents } from "@locusgraph/json-render";

const catalogEntries = Object.entries(locusComponents).map(([name, definition]) => ({
  name,
  description: (definition as { description?: string }).description ?? "",
}));

export function CatalogList() {
  return (
    <>
      <p className="text-sm text-pretty text-muted-foreground">
        The components a model may use. Anything else in a spec is ignored.
      </p>
      <ul className="flex flex-col divide-y border-y">
        {catalogEntries.map((entry) => (
          <li key={entry.name} className="flex flex-col gap-1 py-3">
            <span className="font-mono text-code">{entry.name}</span>
            <span className="text-sm text-pretty text-muted-foreground">{entry.description}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export function PatternRules({ rules }: { rules: string[] }) {
  return (
    <ol className="w-full max-w-xl divide-y divide-border bg-card text-sm ring-1 ring-border">
      {rules.map((rule, index) => (
        <li key={rule} className="flex gap-4 px-4 py-2.5">
          <span className="eyebrow w-6 shrink-0 pt-0.5 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{rule}</span>
        </li>
      ))}
    </ol>
  );
}

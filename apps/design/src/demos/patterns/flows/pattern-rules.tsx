export function PatternRules({ rules }: { rules: string[] }) {
  return (
    <ol className="w-[36rem] max-w-full divide-y bg-card text-sm ring-1 ring-border">
      {rules.map((rule, index) => (
        <li key={rule} className="flex gap-4 px-4 py-3">
          <span className="eyebrow w-6 shrink-0 pt-0.5">{String(index + 1).padStart(2, "0")}</span>
          <span>{rule}</span>
        </li>
      ))}
    </ol>
  );
}

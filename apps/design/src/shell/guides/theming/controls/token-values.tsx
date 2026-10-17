import type { ResolvedTheme } from "../theme-presets";

function tokenRows(theme: ResolvedTheme) {
  return [
    { token: "--btn", color: theme.primary },
    { token: "--btn-ink", color: theme.primaryInk },
    { token: "--s1", color: theme.ring },
  ];
}

export function TokenValues({ theme }: { theme: ResolvedTheme }) {
  return (
    <div className="flex flex-col gap-2 px-4 py-3">
      <span className="eyebrow">Tokens</span>
      <dl className="flex flex-col gap-1.5">
        {tokenRows(theme).map((row) => (
          <div key={row.token} className="flex items-center gap-2 font-mono text-xs">
            <span
              aria-hidden="true"
              className="size-3 shrink-0 ring-1 ring-border"
              style={{ background: row.color }}
            />
            <dt className="text-muted-foreground">{row.token}</dt>
            <dd className="ml-auto text-foreground">{row.color}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

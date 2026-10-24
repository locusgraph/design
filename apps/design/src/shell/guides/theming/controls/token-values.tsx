import type { ResolvedTheme } from "../theme-presets";

function baseRows(theme: ResolvedTheme) {
  return [
    { token: "--locus-btn", color: theme.primary, value: theme.primary },
    { token: "--locus-btn-ink", color: theme.primaryInk, value: theme.primaryInk },
    { token: "--locus-interactive", color: theme.ring, value: theme.ring },
  ];
}

function derivedRows(theme: ResolvedTheme) {
  return [
    {
      token: "--btn-hover",
      color: `color-mix(in oklch, ${theme.primary} 84%, var(--locus-background))`,
      value: "84% mix",
    },
    {
      token: "--btn-active",
      color: `color-mix(in oklch, ${theme.primary} 72%, var(--locus-background))`,
      value: "72% mix",
    },
    {
      token: "--btn-subtle",
      color: `color-mix(in oklch, ${theme.primary} 12%, transparent)`,
      value: "12% alpha",
    },
  ];
}

type TokenRow = { token: string; color: string; value: string };

function TokenList({ label, rows }: { label: string; rows: TokenRow[] }) {
  return (
    <div className="flex flex-col gap-2 px-4 py-3">
      <span className="locus-eyebrow">{label}</span>
      <dl className="flex flex-col gap-1.5">
        {rows.map((row) => (
          <div key={row.token} className="flex items-center gap-2 font-mono text-xs">
            <span
              aria-hidden="true"
              className="size-3 shrink-0 ring-1 ring-border"
              style={{ background: row.color }}
            />
            <dt className="text-muted-foreground">{row.token}</dt>
            <dd className="ml-auto text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function TokenValues({ theme }: { theme: ResolvedTheme }) {
  return (
    <>
      <TokenList label="Tokens" rows={baseRows(theme)} />
      <TokenList label="Derived in CSS" rows={derivedRows(theme)} />
    </>
  );
}

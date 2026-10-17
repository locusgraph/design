import { WarningAltFilled as FailIcon, CheckmarkFilled as PassIcon } from "@carbon/icons-react";
import { contrastRatio, meetsTextContrast } from "../contrast";
import type { ResolvedTheme } from "../theme-presets";

function ContrastRow({ label, theme }: { label: string; theme: ResolvedTheme }) {
  const ratio = contrastRatio(theme.primaryInk, theme.primary);
  const passes = meetsTextContrast(ratio);
  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <span
        className="flex h-7 w-12 shrink-0 items-center justify-center rounded-full text-xs font-medium ring-1 ring-border"
        style={{ background: theme.primary, color: theme.primaryInk }}
      >
        Aa
      </span>
      <span className="text-sm">{label}</span>
      <span className="ml-auto flex items-center gap-1.5 text-sm tabular-nums">
        {ratio.toFixed(1)}:1
        {passes ? (
          <PassIcon className="size-4 text-good" aria-label="Passes AA" />
        ) : (
          <FailIcon className="size-4 text-warn" aria-label="Below AA" />
        )}
      </span>
    </div>
  );
}

export function ContrastCheck({ light, dark }: { light: ResolvedTheme; dark: ResolvedTheme }) {
  return (
    <div className="divide-y bg-background ring-1 ring-border">
      <ContrastRow label="Light" theme={light} />
      <ContrastRow label="Dark" theme={dark} />
    </div>
  );
}

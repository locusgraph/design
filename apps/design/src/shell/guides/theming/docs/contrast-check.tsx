import { Warning as FailIcon, CheckCircle as PassIcon } from "@phosphor-icons/react/ssr";
import { apcaLightness, contrastRatio, meetsApcaBodyText, meetsTextContrast } from "../contrast";
import type { ResolvedTheme } from "../theme-presets";

function Verdict({ passes, label }: { passes: boolean; label: string }) {
  return passes ? (
    <PassIcon weight="fill" className="size-4 text-good" aria-label={`${label} passes`} />
  ) : (
    <FailIcon weight="fill" className="size-4 text-warn" aria-label={`${label} below target`} />
  );
}

function ContrastRow({ label, theme }: { label: string; theme: ResolvedTheme }) {
  const ratio = contrastRatio(theme.primaryInk, theme.primary);
  const lightness = apcaLightness(theme.primaryInk, theme.primary);
  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <span
        className="flex h-7 w-12 shrink-0 items-center justify-center rounded-full text-xs font-medium ring-1 ring-border"
        style={{ background: theme.primary, color: theme.primaryInk }}
      >
        Aa
      </span>
      <span className="text-sm">{label}</span>
      <span className="ml-auto grid grid-cols-[auto_auto] items-center gap-x-1.5 gap-y-1 text-right text-xs tabular-nums">
        <span>{ratio.toFixed(1)}:1</span>
        <Verdict passes={meetsTextContrast(ratio)} label="WCAG" />
        <span>Lc {Math.abs(lightness).toFixed(0)}</span>
        <Verdict passes={meetsApcaBodyText(lightness)} label="APCA" />
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

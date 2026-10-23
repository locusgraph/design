import { Button } from "@locusgraph/components";
import { Check, Copy } from "@phosphor-icons/react/ssr";
import { useState } from "react";
import type { ColorValue, PaletteColor } from "./palette";

const copiedResetMs = 1400;

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), copiedResetMs);
    } catch {
      setCopied(false);
    }
  };
  return (
    <Button variant="ghost" size="icon-sm" aria-label={`Copy ${label}`} onClick={copy}>
      {copied ? (
        <Check weight="bold" aria-hidden className="text-good" />
      ) : (
        <Copy weight="bold" aria-hidden />
      )}
    </Button>
  );
}

function Swatch({ value, theme }: { value: ColorValue; theme: string }) {
  return (
    <span
      title={`${theme} ${value.label}`}
      className="size-8 shrink-0 ring-1 ring-border ring-inset"
      style={{ background: value.css }}
    />
  );
}

const rowColumns =
  "grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-x-4 gap-y-1 sm:grid-cols-[4rem_minmax(0,1fr)_7.5rem_7.5rem]";

function ThemeValue({ value, theme }: { value: ColorValue; theme: string }) {
  return (
    <span className="col-start-2 flex items-center gap-0.5 sm:col-start-auto">
      <span className="w-9 text-2xs text-faint sm:hidden">{theme}</span>
      <span className="font-mono text-xs">{value.label}</span>
      <CopyButton value={value.css} label={`${theme} value`} />
    </span>
  );
}

export function SwatchRow({ color }: { color: PaletteColor }) {
  return (
    <div className={`${rowColumns} px-4 py-3`}>
      <span className="flex">
        <Swatch value={color.light} theme="light" />
        <Swatch value={color.dark} theme="dark" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="flex items-baseline gap-2">
          <span className="text-sm font-medium">{color.name}</span>
          <span className="truncate text-xs text-muted-foreground">{color.usage}</span>
        </span>
        <span className="flex items-center gap-0.5">
          <code className="truncate font-mono text-xs text-muted-foreground">{color.token}</code>
          <CopyButton value={color.token} label={color.token} />
        </span>
      </span>
      <ThemeValue value={color.light} theme="light" />
      <ThemeValue value={color.dark} theme="dark" />
    </div>
  );
}

export function SwatchHeader() {
  return (
    <div className={`${rowColumns} px-4 py-2`}>
      <span className="eyebrow">Swatch</span>
      <span className="eyebrow">Name and token</span>
      <span className="eyebrow hidden sm:block">Light</span>
      <span className="eyebrow hidden sm:block">Dark</span>
    </div>
  );
}

import { cn } from "@locusgraph/components";
import { Check as CheckIcon } from "@phosphor-icons/react/ssr";
import { type ThemeMode, type ThemePreset, themePresets } from "../theme-presets";

type BrandGridProps = {
  mode: ThemeMode;
  value: string;
  onValueChange: (id: string) => void;
};

function BrandSwatch({
  preset,
  mode,
  selected,
  onSelect,
}: {
  preset: ThemePreset;
  mode: ThemeMode;
  selected: boolean;
  onSelect: () => void;
}) {
  const colors = preset[mode];
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={preset.name}
      title={preset.name}
      onClick={onSelect}
      className={cn(
        "flex aspect-square items-center justify-center outline-offset-2 ring-1 ring-border ring-inset hover:outline-2 hover:outline-foreground/25 focus-visible:outline-2 focus-visible:outline-ring",
        selected && "outline-2 outline-foreground hover:outline-foreground"
      )}
      style={{ background: colors.primary, color: colors.primaryInk }}
    >
      {selected && <CheckIcon weight="bold" className="size-4" aria-hidden="true" />}
    </button>
  );
}

export function BrandGrid({ mode, value, onValueChange }: BrandGridProps) {
  const selected = themePresets.find((preset) => preset.id === value);
  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      <div className="flex items-baseline justify-between">
        <span className="eyebrow">Brand</span>
        <span className="text-sm font-medium">{selected?.name}</span>
      </div>
      <div role="radiogroup" aria-label="Brand color" className="grid grid-cols-6 gap-2">
        {themePresets.map((preset) => (
          <BrandSwatch
            key={preset.id}
            preset={preset}
            mode={mode}
            selected={preset.id === value}
            onSelect={() => onValueChange(preset.id)}
          />
        ))}
      </div>
    </div>
  );
}

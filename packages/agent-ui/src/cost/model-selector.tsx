import {
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@locusgraph/components";
import { formatMicroUsd } from "@locusgraph/utils";
import { BrainIcon, ChevronDownIcon, GaugeIcon, ZapIcon } from "lucide-react";
import { formatTokensShort } from "./shared/usage-totals";

export type ModelSpeed = "fast" | "balanced" | "deep";

export type ModelOption = {
  id: string;
  name: string;
  provider: string;
  inputPerMillionMicroUsd?: number;
  outputPerMillionMicroUsd?: number;
  speed?: ModelSpeed;
  contextTokens?: number;
};

export type ModelSelectorProps = {
  models: ModelOption[];
  value: string;
  onChange: (id: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
};

const speedIcon = { fast: ZapIcon, balanced: GaugeIcon, deep: BrainIcon } as const;

const speedLabel = { fast: "Fast", balanced: "Balanced", deep: "Deep" } as const;

export function modelPriceLabel(model: ModelOption): string | undefined {
  const input = model.inputPerMillionMicroUsd;
  const output = model.outputPerMillionMicroUsd;
  if (input === undefined && output === undefined) return undefined;
  if (output === undefined) return `${formatMicroUsd(input ?? 0)} / 1M in`;
  if (input === undefined) return `${formatMicroUsd(output)} / 1M out`;
  return `${formatMicroUsd(input)} in · ${formatMicroUsd(output)} out / 1M`;
}

function SpeedHint({ speed }: { speed: ModelSpeed }) {
  const Icon = speedIcon[speed];
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[11.5px] text-muted-foreground">
      <Icon aria-hidden className="size-3" />
      {speedLabel[speed]}
    </span>
  );
}

function ModelItem({ model }: { model: ModelOption }) {
  const price = modelPriceLabel(model);
  return (
    <DropdownMenuRadioItem
      value={model.id}
      data-slot="model-selector-item"
      className="flex flex-col items-start gap-0.5 py-2"
    >
      <span className="flex w-full items-center gap-2">
        <span className="font-medium">{model.name}</span>
        <span className="text-xs text-muted-foreground">{model.provider}</span>
      </span>
      <span className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
        {model.speed && <SpeedHint speed={model.speed} />}
        {price && (
          <span className="font-mono text-[11.5px] text-muted-foreground tabular-nums">
            {price}
          </span>
        )}
        {model.contextTokens !== undefined && (
          <span className="font-mono text-[11.5px] text-muted-foreground tabular-nums">
            {formatTokensShort(model.contextTokens)} context
          </span>
        )}
      </span>
    </DropdownMenuRadioItem>
  );
}

export function ModelSelector({
  models,
  value,
  onChange,
  label = "Model",
  disabled = false,
  className,
}: ModelSelectorProps) {
  const selected = models.find((model) => model.id === value);
  const SelectedSpeedIcon = selected?.speed ? speedIcon[selected.speed] : undefined;
  const selectedInputPrice = selected?.inputPerMillionMicroUsd;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-slot="model-selector"
        data-value={value}
        disabled={disabled}
        aria-label={`${label}: ${selected?.name ?? "none selected"}`}
        className={cn(
          "inline-flex h-7 max-w-full items-center gap-1.5 rounded-full border border-border bg-background px-2.5 text-xs outline-none transition-colors duration-150 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",
          className
        )}
      >
        {SelectedSpeedIcon && (
          <SelectedSpeedIcon aria-hidden className="size-3 text-muted-foreground" />
        )}
        <span className="truncate font-medium">{selected?.name ?? label}</span>
        {selectedInputPrice !== undefined && (
          <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
            {formatMicroUsd(selectedInputPrice)}/M
          </span>
        )}
        <ChevronDownIcon aria-hidden className="size-3 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80 rounded-none">
        <DropdownMenuLabel className="font-mono text-[11.5px] font-normal text-muted-foreground">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {models.map((model) => (
            <ModelItem key={model.id} model={model} />
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
